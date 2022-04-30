import { showNotification } from '@fitly/ui-utils';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { Button, Card, List, ListItem, Text } from '@ui-kitten/components';
import React, { useEffect, useState } from 'react';
import { ListRenderItemInfo, StyleSheet } from 'react-native';
import { MetaWearProps } from '../App';
import {
  addEventListenerToBluetoothModule,
  DeviceInfo,
} from '../events/bluetooth-module.listener';
import { BottomTabParamList } from '../interfaces/BottomTabParamList';
import BluetoothModule from '../native-modules/BluetoothModule';

const SEARCHING_TIME = 10 * 1000;

const renderItem =
  (
    onPress: (info: DeviceInfo) => () => void,
    connectingWith?: DeviceInfo,
    isConnected?: boolean
  ) =>
  ({ item }: ListRenderItemInfo<DeviceInfo>) => {
    const isConnecting = connectingWith?.deviceAddress === item.deviceAddress;

    return (
      <ListItem
        title={`${item.deviceName || 'Unknown'}`}
        description={
          isConnecting && !isConnected
            ? 'Connecting...'
            : `${item.deviceAddress}`
        }
        onPress={onPress(item)}
      />
    );
  };

// stupid but works
const filterDuplicates = function (array: DeviceInfo[]) {
  const obj = {};
  for (const device of array) {
    obj[device.deviceAddress] = device.deviceName;
  }

  let newArray: DeviceInfo[] = [];
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
  const [foundDevicesList, setFoundDevicesList] = useState<DeviceInfo[]>([]);
  const [selectedDevice, setSelectedDevice] = useState<DeviceInfo | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [isConnected, setIsConnected] = useState(false);

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
    await metawear.connect(device.deviceAddress);
    setIsConnected(true);
    await metawear.blinkLED(4);
    await BluetoothModule.saveConnectedBluetoothDevice(device.deviceAddress);
  };

  return (
    <>
      <Button
        style={styles.button}
        size="giant"
        appearance="outline"
        onPress={handleStartSearchForBluetoothDevices}
        disabled={isSearching}
      >
        {isSearching ? 'Searching...' : 'Search for bluetooth devices'}
      </Button>
      {isConnected && selectedDevice && (
        <Card style={styles.connectedDeviceCard}>
          <Text category="s1">{selectedDevice.deviceName || 'Unknown'}</Text>
          <Text category="c1">
            Connected, MAC: {selectedDevice.deviceAddress}
          </Text>
        </Card>
      )}
      {foundDevicesList && (
        <List
          style={styles.container}
          data={filterDuplicates(foundDevicesList)}
          renderItem={renderItem(
            handleDeviceSelect,
            selectedDevice,
            isConnected
          )}
        />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  connectedDeviceCard: {
    marginTop: 4,
    marginBottom: 4,
  },
  button: {
    marginTop: 16,
  },
});

export default BluetoothConnectionScreen;
