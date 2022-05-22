import React from 'react';
import { StyleSheet, View } from 'react-native';
import { ActivityIcon } from '../icons/activity-icon';
import { Text, useTheme } from '@ui-kitten/components';
import { commonStyles } from '../../assets/common/styles';
import { ActivityType } from '@fitly/shared/meta';
import { ActivityNames } from '../../assets/common/activity-names';
import DropShadowWrapper from '../gradients/drop-shadow';
import LinearGradientCard from '../gradients/linear-gradient-card';
import { Themes } from '../gradients/themes';

interface Props {
	activity: ActivityType;
	count: number;
	time: string;
	kcal: number;
	date: string;
	theme: Themes;
}

export const ActivityCardLarge: React.FC<Props> = ({
	activity,
	date,
	count,
	time,
	kcal,
	theme,
}) => {
	return (
		<DropShadowWrapper shadowColorTheme={theme}>
			<LinearGradientCard
				theme={theme}
				style={[commonStyles.defaultBorder]}
			>
				<View style={[commonStyles.defaultBorder, styles.container]}>
					<View style={styles.leftColumn}>
						<ActivityIcon activity={activity} variant={true} />
						<Text category="h4">{ActivityNames[activity]}</Text>
						<Text>Last activity</Text>
					</View>
					<View style={styles.rightColumn}>
						<View style={styles.infoRow}>
							<View style={styles.exerciseData}>
								<Text category="h5">{count}</Text>
								<Text>Count</Text>
							</View>
							<View style={styles.exerciseData}>
								<Text category="h5">{time}</Text>
								<Text>Time</Text>
							</View>
							<View style={styles.exerciseData}>
								<Text category="h5">{kcal}</Text>
								<Text>kcal</Text>
							</View>
						</View>
					</View>
					<Text
						style={[
							{ backgroundColor: '#3366FF', color: 'white' },
							styles.dateText,
						]}
					>
						{date}
					</Text>
				</View>
			</LinearGradientCard>
		</DropShadowWrapper>
	);
};

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		padding: 20,
	},
	leftColumn: {
		flex: 2,
		justifyContent: 'flex-start',
		alignItems: 'flex-start',
	},
	rightColumn: {
		flex: 3,
		justifyContent: 'flex-end',
		alignItems: 'flex-end',
	},
	dateText: {
		paddingTop: 4,
		paddingBottom: 4,
		paddingLeft: 10,
		paddingRight: 10,
		borderRadius: 8,
		fontSize: 10,

		position: 'absolute',
		right: 16,
		top: 12,
	},
	infoRow: {
		alignSelf: 'stretch',
		flexDirection: 'row-reverse',
		justifyContent: 'space-between',
	},
	exerciseData: {
		justifyContent: 'center',
		alignItems: 'center',
	},
});
