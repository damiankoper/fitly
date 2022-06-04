import { ActivityType } from '@fitly/shared/meta';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { Layout, Text as TextUi } from '@ui-kitten/components';
import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { ActivityCardSmall } from '../../components/cards/activity-card-small';
import { BottomTabParamList } from '../../interfaces/BottomTabParamList';

type NavProps = BottomTabScreenProps<BottomTabParamList, 'Exercise'>;

export const ExerciseScreen: React.FC<NavProps> = ({ navigation }) => {
	const exercises = Object.values(ActivityType).filter(
		(v) => v !== ActivityType.UNKNOWN
	);

	return (
		<Layout style={styles.layoutWrapper}>
			<Text style={styles.title}>Choose activity</Text>
			<Text style={styles.subtitle}>
				Choose activity that you wish to record.{'\n'}
				You will see Recording View in next view, after you choose{'\n'}
				type of your exercise!
			</Text>
			<View style={styles.divider} />
			<View style={styles.flexLayout}>
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
			</View>
		</Layout>
	);
};

const styles = StyleSheet.create({
	layoutWrapper: { alignItems: 'center' },
	title: {
		fontFamily: 'RobotoSlab-Bold',
		fontSize: 32,
		color: 'black',
		textAlign: 'center',
		marginBottom: 8,
	},
	subtitle: {
		textAlign: 'center',
		marginBottom: 18,
	},
	divider: {
		borderTopColor: '#eaeaea',
		borderTopWidth: 1,
		width: '75%',
		marginBottom: 18,
	},
	cardWrapper: {
		width: 180,
		height: 180,
	},
	flexLayout: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'space-around',
		flexDirection: 'row',
		flexWrap: 'wrap',
	},
});
