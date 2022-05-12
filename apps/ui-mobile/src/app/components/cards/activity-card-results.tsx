import React from 'react';
import { ActivityType } from '@fitly/shared/meta';
import { StyleSheet, View } from 'react-native';
import { ActivityIcon } from '../icons/activity-icon';
import { Text } from '@ui-kitten/components';
import { commonStyles } from '../../assets/common/styles';

interface Props {
	activity: ActivityType;
}

export const ActivityCardResults: React.FC<Props> = ({ activity }) => {
	console.log(activity);

	return (
		<View style={[commonStyles.defaultCard, styles.container]}>
			<Text category="h1">Results</Text>
			<ActivityIcon activity={activity} large={true} />
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		padding: 16,
		justifyContent: 'space-between',
		alignItems: 'center',
	},
});
