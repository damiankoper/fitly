import React from 'react';
import {
	Icon,
	Layout,
	TopNavigation,
	TopNavigationAction,
} from '@ui-kitten/components';
import { ImageProps, StyleSheet } from 'react-native';
import { RenderProp } from '@ui-kitten/components/devsupport';
import { BluetoothStatus } from '../icons/bluetooth-status';

type IconProp = RenderProp<Partial<ImageProps>>;
const PersonIcon: IconProp = (props) => (
	<Icon {...props} name="person-outline" />
);

export const TopNav = () => {
	const renderRightActions = () => <TopNavigationAction icon={PersonIcon} />;
	const renderLeftActions = () => (
		<TopNavigationAction
			icon={() => <BluetoothStatus touchable iconSize="small" />}
		/>
	);

	return (
		<Layout>
			<TopNavigation
				alignment="center"
				title="Fitly"
				style={styles.topnav}
				accessoryLeft={renderLeftActions}
				accessoryRight={renderRightActions}
			/>
		</Layout>
	);
};

const styles = StyleSheet.create({
	topnav: {
		borderBottomColor: 'lightgray',
		borderBottomWidth: 1,
	},
});
