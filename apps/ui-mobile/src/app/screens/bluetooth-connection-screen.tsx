import { Button, List, ListItem } from '@ui-kitten/components';
import React, { useEffect, useState } from 'react';
import {
	ListRenderItem,
	ListRenderItemInfo,
	StyleSheet,
	Text,
} from 'react-native';
import {
	addEventListenerToBluetoothModule,
	DeviceInfo,
} from '../events/bluetooth-module.listener';
import BluetoothModule from '../native-modules/BluetoothModule';
import MetaWearModule from '../native-modules/MetaWearModule';
import { showNotification } from '../utils/notifications';

const renderItem =
	(onPress: (info: DeviceInfo) => () => void) =>
	({ item, index }: ListRenderItemInfo<DeviceInfo>) =>
		(
			<ListItem
				title={`${item.deviceName}` || ''}
				description={`${item.deviceAddress}`}
				onPress={onPress(item)}
			/>
		);

export interface BluetoothConnectionScreenProps {
	navigation: any;
}

const BluetoothConnectionScreen: React.FC<BluetoothConnectionScreenProps> = ({
	navigation,
}) => {
	const [foundDevicesList, setFoundDevicesList] =
		useState<DeviceInfo[]>(null);
	const [isSearching, setIsSearching] = useState(false);
	const [selectedDevice, setSelectedDevice] = useState<DeviceInfo>(null);

	useEffect(() => {
		addEventListenerToBluetoothModule(
			'onBluetoothFoundNewDevice',
			(newDevice) => {
				setFoundDevicesList((ps) =>
					ps ? [...ps, newDevice] : [newDevice]
				);
			}
		);
	}, []);

	const handleStartSearchForBluetoothDevices = async () => {
		setIsSearching(true);
		const result =
			await BluetoothModule.startSearchingForBluetoothDevices();
		if (!result) {
			setIsSearching(false);
			showNotification('Error while searching for devices');
		}
	};

	const handleDeviceSelect = (device: DeviceInfo) => async () => {
		setSelectedDevice(device);
		await BluetoothModule.cancelSearchingForBluetoothDevices();
		await MetaWearModule.connectToMetaWearDevice(device.deviceAddress);
		await MetaWearModule.blinkBlueLED(10 + 1);
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
			{foundDevicesList && (
				<List
					style={styles.container}
					data={foundDevicesList}
					renderItem={renderItem(handleDeviceSelect)}
				/>
			)}
		</>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	controlContainer: {
		borderRadius: 4,
		padding: 16,

		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',

		borderColor: 'lightgray',
		color: 'black',
		borderWidth: 1,
	},
	modeText: {
		fontWeight: '700',
		fontSize: 20,
	},
	buttonColumn: {
		flex: 1,
		justifyContent: 'space-between',
	},
	button: {
		marginTop: 16,
	},
});

export default BluetoothConnectionScreen;
