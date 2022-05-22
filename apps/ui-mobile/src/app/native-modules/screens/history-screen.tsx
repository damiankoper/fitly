import { ActivityType } from '@fitly/shared/meta';
import { Layout, Text } from '@ui-kitten/components';
import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { ActivityCardLarge } from '../../components/cards/activity-card-large';

export const HistoryScreen = () => {
	return (
		<Layout style={styles.container}>
			<ScrollView contentContainerStyle={styles.container}>
				<Text category="h6" style={styles.dateText}>
					Yesterday
				</Text>
				<View style={styles.cardWrapper}>
					<ActivityCardLarge
						activity={ActivityType.SQUATS}
						count={35}
						time="7:34"
						kcal={128}
						date="Yesterday"
						theme="primary"
					/>
				</View>
				<View style={styles.cardWrapper}>
					<ActivityCardLarge
						activity={ActivityType.SQUATS}
						count={35}
						time="7:34"
						kcal={128}
						date="Yesterday"
						theme="primary"
					/>
				</View>
				<Text category="h6" style={styles.dateText}>
					10 march 2022
				</Text>
				<View style={styles.cardWrapper}>
					<ActivityCardLarge
						activity={ActivityType.PUSHUPS}
						count={35}
						time="7:34"
						kcal={128}
						date="Yesterday"
						theme="primary"
					/>
				</View>
				<View style={styles.cardWrapper}>
					<ActivityCardLarge
						activity={ActivityType.SITUPS}
						count={35}
						time="12:04"
						kcal={128}
						date="Yesterday"
						theme="primary"
					/>
				</View>
				<View style={styles.cardWrapper}>
					<ActivityCardLarge
						activity={ActivityType.SQUATS}
						count={35}
						time="7:34"
						kcal={128}
						date="Yesterday"
						theme="primary"
					/>
				</View>
			</ScrollView>
		</Layout>
	);
};

const styles = StyleSheet.create({
	container: {
		padding: 8,
		paddingRight: 12,
		paddingLeft: 12,
		overflow: 'visible',
	},
	dateText: {
		marginBottom: 4,
	},
	cardWrapper: {
		marginBottom: 8,
	},
});
