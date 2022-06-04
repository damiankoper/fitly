import React from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { ActivityIcon } from '../icons/activity-icon';
import { commonStyles } from '../../assets/common/styles';
import { ActivityType } from '@fitly/shared/meta';
import { ActivityNames } from '../../assets/common/activity-names';
import DropShadowWrapper from '../gradients/drop-shadow';
import LinearGradientCard from '../gradients/linear-gradient-card';
import { Themes } from '../gradients/themes';
import { Text as TextUi } from '@ui-kitten/components';
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
						<Text style={styles.activityTypeText}>
							{ActivityNames[activity]}
						</Text>
						<Text style={styles.lastActivityText}>
							Last activity
						</Text>
					</View>
					<View style={styles.rightColumn}>
						<View style={styles.infoRow}>
							<View style={styles.exerciseData}>
								<TextUi category="h4" style={styles.valueText}>
									{count}
								</TextUi>
								<Text style={styles.labelText}>Count</Text>
							</View>
							<View style={styles.exerciseData}>
								<Text style={styles.valueText}>{time}</Text>
								<Text style={styles.labelText}>Time</Text>
							</View>
							<View style={styles.exerciseData}>
								<Text style={styles.valueText}>{kcal}</Text>
								<Text style={styles.labelText}>kcal</Text>
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
		justifyContent: 'center',
		alignItems: 'center',
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
	activityTypeText: {
		fontFamily: 'RobotoSlab-Bold',
		textAlign: 'center',
		fontSize: 28,
		letterSpacing: 1,
		color: 'black',
	},
	lastActivityText: {
		fontFamily: 'Roboto-Light',
		textAlign: 'center',
		letterSpacing: 1,
		fontSize: 14,
		color: '#a1a1a1',
	},
	infoRow: {
		alignSelf: 'stretch',
		flexDirection: 'row-reverse',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	valueText: {
		fontFamily: 'RobotoSlab-Bold',
		color: 'black',
		letterSpacing: 1,
		fontSize: 24,
	},
	labelText: {
		fontFamily: 'Roboto-Light',
		textAlign: 'center',
		fontSize: 14,
		letterSpacing: 1,
		color: '#a1a1a1',
	},
	exerciseData: {
		justifyContent: 'center',
		alignItems: 'center',
	},
});
