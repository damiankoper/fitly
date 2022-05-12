import React from 'react';
import { Layout, Text } from '@ui-kitten/components';
import { ActivityCardResults } from '../components/cards/activity-card-results';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { BottomTabParamList } from '../interfaces/BottomTabParamList';
import { StyleSheet, View } from 'react-native';

type NavProps = BottomTabScreenProps<
	BottomTabParamList,
	'ExerciseResultsScreen'
>;

export const ExerciseResultsScreen: React.FC<NavProps> = ({ route }) => {
	const { activity } = route.params;

	return (
		<Layout>
			<View style={styles.resultsWrapper}>
				<ActivityCardResults activity={activity} />
			</View>
			<Text>placeholder wykrysow</Text>
		</Layout>
	);
};

const styles = StyleSheet.create({
	resultsWrapper: {
		marginBottom: 20,
	},
});
