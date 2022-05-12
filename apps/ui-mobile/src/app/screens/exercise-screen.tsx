import { ActivityType } from '@fitly/shared/meta';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { Layout, Text } from '@ui-kitten/components';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { ActivityCardSmall } from '../components/cards/activity-card-small';
import { BottomTabParamList } from '../interfaces/BottomTabParamList';

type NavProps = BottomTabScreenProps<BottomTabParamList, 'Exercise'>;

export const ExerciseScreen: React.FC<NavProps> = ({ navigation }) => {
	const exercises = Object.values(ActivityType).filter(
		(v) => v !== ActivityType.UNKNOWN
	);

	return (
		<Layout>
			<Text category="h1" style={styles.title}>
				Choose activity
			</Text>
			{exercises.map((ex, i) => (
				<View style={styles.cardWrapper} key={i}>
					<ActivityCardSmall
						activity={ex}
						key={ex}
						onPress={() =>
							navigation.navigate('ExerciseCounterScreen', {
								activity: ex,
							})
						}
					/>
				</View>
			))}
		</Layout>
	);
};

const styles = StyleSheet.create({
	title: {
		marginBottom: 16,
	},
	cardWrapper: {
		marginBottom: 8,
	},
});
