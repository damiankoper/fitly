import { Icon, Layout, useTheme } from '@ui-kitten/components';
import React from 'react';
import { UserCard } from '../components/cards/user-card';
import { StyleSheet, View } from 'react-native';
import { DataCardLarge } from '../components/cards/data-card-large';
import { BluetoothStatus } from '../components/icons/bluetooth-status';
import { DataCardSmall } from '../components/cards/data-card-small';
import { ActivityCardLarge } from '../components/cards/activity-card-large';
import { ActivityType } from '@fitly/shared/meta';
import ActivityLineChart from '../components/charts/ActivityLineChart';

export const StepsIcon = () => {
	const theme = useTheme();

	return (
		<Icon
			name="pin-outline"
			style={styles.icon}
			fill={theme['color-primary-default']}
		/>
	);
};

export const CaloriesIcon = () => {
	const theme = useTheme();

	return (
		<Icon
			name="flash-outline"
			style={styles.icon}
			fill={theme['color-danger-default']}
		/>
	);
};

export const TimeIcon = () => {
	const theme = useTheme();

	return (
		<Icon
			name="clock-outline"
			style={styles.icon}
			fill={theme['color-basic-700']}
		/>
	);
};

export const HomeScreen: React.FC<{}> = () => {
	const theme = useTheme();
	return (
		<>
			<UserCard name="Jan Nikodem" title="Master of squats" />
			<ActivityLineChart />
			<View style={styles.cardRow}>
				<View style={[styles.cardColumn, styles.leftColumn]}>
					<DataCardLarge
						Icon={StepsIcon}
						name="Steps"
						quantity={2137}
						color={theme['color-primary-200']}
					/>
					<DataCardLarge
						Icon={CaloriesIcon}
						name="Calories"
						quantity={1690}
						color={theme['color-danger-200']}
					/>
				</View>
				<View style={[styles.cardColumn, styles.rightColumn]}>
					<View style={styles.smallCardRow}>
						<BluetoothStatus
							touchable
							touchableStyles={styles.bluetoothWrapper}
							renderOverlay
							renderSubText
							iconSize="large"
							colorConnected={theme['color-success-200']}
							colorDisconnected={theme['color-danger-200']}
						/>
						<View style={styles.separator} />
						<DataCardSmall data="45" activity="running" />
					</View>
					<DataCardLarge
						Icon={TimeIcon}
						name="Time spent"
						quantity={3723}
						color={theme['color-basic-300']}
					/>
				</View>
			</View>

			<View style={styles.bottomCard}>
				<ActivityCardLarge
					activity={ActivityType.SQUATS}
					date="Yesterday, 8 Mar"
					kcal={231}
					time="2:32"
					count={31}
				/>
			</View>
		</>
	);
};

const styles = StyleSheet.create({
	placeholder: {
		marginVertical: 16,
		height: 170,
	},
	cardColumn: {
		flex: 1,
		height: 170,
		flexDirection: 'column',
		justifyContent: 'space-between',
	},
	bluetoothWrapper: {
		flex: 1,
		padding: 0,
	},
	leftColumn: {
		marginRight: 4,
	},
	rightColumn: {
		marginLeft: 4,
	},
	cardRow: {
		flexDirection: 'row',
		flex: 1,
		height: 170,
	},
	icon: {
		height: 40,
		width: 40,
	},
	smallCardRow: {
		flexDirection: 'row',
	},
	separator: {
		width: 8,
	},
	bottomCard: {
		marginVertical: 8,
	},
});
