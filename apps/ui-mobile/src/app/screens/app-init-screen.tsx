import { MetaWear } from '@fitly/ui-metawear';
import { showNotification } from '@fitly/ui-utils';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import LoadingScreen from '../components/loading-screen/LoadingScreen';
import BluetoothModule from '../native-modules/BluetoothModule';
import {
  setConnectedDevice,
  restoreConnectionStop,
  restoreConnectionStart,
  clearConnectedDevice,
} from '../state/app/app.slice';
import { RootState } from '../state/root.reducer';

const CONNECTION_CHECKING_INTERVAL_SECONDS = 2000;

export type AppInitScreenProps = React.PropsWithChildren<{
  metawear: MetaWear;
}>;

const AppInitScreen: React.FC<AppInitScreenProps> = ({
  metawear,
  children,
}) => {
  const dispatch = useDispatch();

  const isRestoringConnection = useSelector(
    (state: RootState) => state.app.status.isRestoringConnection
  );

  async function restoreConnection() {
    const lastConnectedMac =
      await BluetoothModule.getSavedConnectedBluetoothDevice();
    if (lastConnectedMac == null) {
      showNotification('No metawear device saved');
      handleCloseLoadingScreen();
    } else {
      try {
        await metawear.connect(lastConnectedMac);
        dispatch(
          setConnectedDevice({
            deviceName: 'MetaWear',
            deviceAddress: lastConnectedMac,
          })
        );
        dispatch(restoreConnectionStop());
        showNotification('Connection with MetaWear device restored!');
        startConnectionValidationTimeout();
      } catch (error) {
        dispatch(restoreConnectionStop());
        dispatch(clearConnectedDevice());
        showNotification('Connection with MetaWear could not be restored!');
      }
    }
  }

  function startConnectionValidationTimeout() {
    setTimeout(() => {
      checkConnection();
    }, CONNECTION_CHECKING_INTERVAL_SECONDS);
  }

  async function checkConnection() {
    const isConnected =
      await BluetoothModule.checkConnectionWithMetaWearDevice();
    if (!isConnected) {
      dispatch(restoreConnectionStart());
      await restoreConnection();
    } else {
      startConnectionValidationTimeout();
    }
  }

  useEffect(() => {
    restoreConnection();
    return () => {
      metawear.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCloseLoadingScreen = () => {
    dispatch(restoreConnectionStop());
    dispatch(clearConnectedDevice());
  };

  if (isRestoringConnection) {
    return (
      <LoadingScreen
        subText="Restoring connection with device. Please wait."
        additionalButton
        buttonText="Stop searching"
        onButtonPress={handleCloseLoadingScreen}
      />
    );
  }

  // eslint-disable-next-line react/jsx-no-useless-fragment
  return <>{children}</>;
};

export default AppInitScreen;
