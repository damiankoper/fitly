import { showNotification } from '@fitly/ui-utils';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import {
  Button,
  Card,
  Divider,
  List,
  ListItem,
  Text,
  useTheme,
} from '@ui-kitten/components';
import React, { useEffect, useState } from 'react';
import { ListRenderItemInfo, StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { MetaWearProps } from '../App';

import { BottomTabParamList } from '../interfaces/BottomTabParamList';
import BluetoothModule from '../native-modules/BluetoothModule';
import { setConnectedDevice } from '../state/app/app.slice';
import { RootState } from '../state/root.reducer';
import { addEventListenerToBluetoothModule } from '../events/bluetooth-module.listener';
import { commonStyles } from '../assets/common/styles';
import DropShadowWrapper from '../components/gradients/drop-shadow';

const SEARCHING_TIME = 10 * 1000;

interface DeviceInfo {
  deviceAddress: string;
  deviceName: string;
}

const renderItem =
  (
    onPress: (info: DeviceInfo) => () => void,
    connectingWith: DeviceInfo | null,
    isConnected?: boolean
  ) =>
  ({ item }: ListRenderItemInfo<DeviceInfo>) => {
    const isConnecting = connectingWith?.deviceAddress === item.deviceAddress;

    return (
      <ListItem
        style={{
          backgroundColor: 'transparent',
          flexDirection: 'column',
          alignContent: 'flex-start',
          justifyContent: 'flex-start',
        }}
        onPress={onPress(item)}
      >
        <View style={{ width: '100%' }}>
          <Text style={styles.menuItemTitle}>
            {item.deviceName || 'Unknown'}
          </Text>
          <Text style={styles.menuItemSubtitle}>
            {isConnecting && !isConnected
              ? 'Connecting...'
              : `${item.deviceAddress}`}
          </Text>
        </View>
      </ListItem>
    );
  };

interface DeviceUniqueList {
  [key: string]: string;
}
// stupid but works
const filterDuplicates = function (array: DeviceInfo[]) {
  const obj: DeviceUniqueList = {};
  for (const device of array) {
    obj[device.deviceAddress] = device.deviceName;
  }

  const newArray: DeviceInfo[] = [];
  for (const deviceAddress of Object.keys(obj)) {
    newArray.push({ deviceName: obj[deviceAddress], deviceAddress });
  }

  return newArray;
};

export interface BluetoothConnectionScreenProps {
  navigation: any;
}

type NavProps = BottomTabScreenProps<BottomTabParamList, 'BluetoothConnection'>;
const BluetoothConnectionScreen: React.FC<NavProps & MetaWearProps> = ({
  navigation,
  metawear,
}) => {
  const dispatch = useDispatch();

  const connectedDeviceFromStore = useSelector(
    (state: RootState) => state.app.connectedDevice
  );

  const [foundDevicesList, setFoundDevicesList] = useState<DeviceInfo[]>([]);
  const [selectedDevice, setSelectedDevice] = useState<DeviceInfo | null>(
    connectedDeviceFromStore
  );
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [isConnected, setIsConnected] = useState<boolean>(
    Boolean(connectedDeviceFromStore)
  );

  useEffect(() => {
    addEventListenerToBluetoothModule(
      'onBluetoothFoundNewDevice',
      (newDevice) => {
        setFoundDevicesList((ps) => (ps ? [...ps, newDevice] : [newDevice]));
      }
    );
  }, []);

  const handleStartSearchForBluetoothDevices = async () => {
    setFoundDevicesList([]);
    setIsSearching(true);
    const result = await BluetoothModule.startSearchingForBluetoothDevices();
    if (!result) {
      setIsSearching(false);
      showNotification('Error while searching for devices');
    } else {
      setTimeout(async () => {
        if (isSearching)
          await BluetoothModule.cancelSearchingForBluetoothDevices();
        setIsSearching(false);
      }, SEARCHING_TIME);
    }
  };

  const handleDeviceSelect = (device: DeviceInfo) => async () => {
    setSelectedDevice(device);
    if (isSearching) {
      await BluetoothModule.cancelSearchingForBluetoothDevices();
    }
    const result = await metawear.connect(device.deviceAddress);
    if (result) {
      setIsConnected(true);
      dispatch(setConnectedDevice(device));
      await metawear.blinkLED(4);
      await BluetoothModule.saveConnectedBluetoothDevice(device.deviceAddress);
    } else {
      showNotification('Could not connect to device');
    }
  };
  const theme = useTheme();

  return (
    <>
      <Text style={commonStyles.title}>Bluetooth devices</Text>
      <View
        style={[
          { backgroundColor: theme['color-basic-200'] },
          styles.menuSection,
          commonStyles.defaultBorder,
        ]}
      >
        <DropShadowWrapper>
          <View
            style={[styles.connectedDeviceCard, commonStyles.defaultBorder]}
          >
            <Text style={styles.menuItemTitle}>
              {!selectedDevice
                ? 'No device selected'
                : selectedDevice?.deviceName}
            </Text>
            <Text style={styles.menuItemSubtitle}>
              {!selectedDevice
                ? 'Pick device from the list below'
                : isConnected
                ? `Connected, MAC: ${selectedDevice.deviceAddress}`
                : `Connecting..., MAC: ${selectedDevice.deviceAddress}`}
            </Text>
          </View>
        </DropShadowWrapper>
        <Button
          style={styles.button}
          onPress={handleStartSearchForBluetoothDevices}
          disabled={isSearching}
        >
          {isSearching ? 'Searching...' : 'Search for bluetooth devices'}
        </Button>
        <List
          style={styles.list}
          data={filterDuplicates(foundDevicesList)}
          ItemSeparatorComponent={Divider}
          renderItem={renderItem(
            handleDeviceSelect,
            selectedDevice,
            isConnected
          )}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  list: {
    backgroundColor: 'transparent',
    height: 300,
    marginTop: 16,
  },
  menuSection: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    marginVertical: 8,
  },
  menuItemTitle: {
    fontFamily: 'Roboto-Bold',
    lineHeight: 20,
    fontSize: 20,
    textAlign: 'left',
  },
  menuItemSubtitle: {},
  connectedDeviceCard: {
    padding: 12,
    paddingVertical: 16,
    backgroundColor: 'white',
  },
  button: {
    marginTop: 16,
    borderRadius: 999,
  },
});

export default BluetoothConnectionScreen;
