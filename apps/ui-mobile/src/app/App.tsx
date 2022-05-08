import React, { useEffect, useRef } from 'react';
import * as eva from '@eva-design/eva';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { Provider } from 'react-redux';
import { AppNav } from './components/navigation/app-nav';

import { TopNav } from './components/navigation/top-nav';
import store from './state/store';

import MetaWearModule from './native-modules/MetaWearModule';
import { ActivityTracker, MetaWear } from '@fitly/ui-metawear';
import BluetoothModule from './native-modules/BluetoothModule';
import { showNotification } from '@fitly/ui-utils';

export interface MetaWearProps {
  metawear: MetaWear;
  tracker: ActivityTracker;
}

const App = () => {
  const metawear = useRef(new MetaWear(MetaWearModule));
  const activityTracker = useRef(
    new ActivityTracker(
      process.env.BRIDGE_BASE_URL + 'api/data',
      process.env.BRIDGE_BASE_URL + 'api/analyze',
      10000
    )
  );
  async function restoreConnection() {
    const lastConnectedMac =
      await BluetoothModule.getSavedConnectedBluetoothDevice();
    if (lastConnectedMac) {
      metawear.current.connect(lastConnectedMac);
      showNotification('Connection with MetaWear device restored!');
    } else {
      showNotification(
        'Connection with MetaWear device could not be restored!'
      );
    }
  }

  useEffect(() => {
    const _metawear = metawear.current;
    restoreConnection();
    return () => {
      _metawear.disconnect();
    };
  }, []);

  return (
    <Provider store={store}>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider {...eva} theme={eva.light}>
        <TopNav />
        <AppNav metawear={metawear.current} tracker={activityTracker.current} />
      </ApplicationProvider>
    </Provider>
  );
};

export default App;
