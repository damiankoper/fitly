import React from 'react';
import { ActivityType } from '@fitly/shared/meta';
import { StyleSheet, View } from 'react-native';
import { ActivityIcon } from '../icons/activity-icon';
import { Text } from '@ui-kitten/components';
import { formatActivityString } from '../../common/utils';
import { commonStyles } from '../../assets/common/styles';

interface Props {
	activity: ActivityType;
}

export const ActivityCardLargeNoDetails: React.FC<Props> = ({ activity }) => {
	const formattedActivity = formatActivityString(activity);

	return (
		<View style={[commonStyles.defaultCard, styles.container]}>
			<ActivityIcon activity={activity} large={true} />
			<Text category="h1" style={styles.text}>
				{formattedActivity}
			</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		padding: 8,
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	text: {
		marginRight: 16,
	},
});
