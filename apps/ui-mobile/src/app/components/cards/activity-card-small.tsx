import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { ActivityIcon } from '../icons/activity-icon';
import { Text, useTheme } from '@ui-kitten/components';
import { commonStyles } from '../../assets/common/styles';
import { ActivityType } from '@fitly/shared/meta';
import { formatActivityString } from '../../common/utils';

interface Props {
	activity: ActivityType;
	subtitle?: string;
	onPress?: () => void;
}

export const ActivityCardSmall: React.FC<Props> = ({
	activity,
	onPress,
	subtitle,
}) => {
	const formattedActivity = formatActivityString(activity);
	const theme = useTheme();
	return (
		<TouchableOpacity
			style={[
				commonStyles.defaultCard,
				styles.container,
				{
					backgroundColor: theme['color-basic-300'],
				},
			]}
			onPress={onPress}
		>
			<ActivityIcon activity={activity} />
			<View>
				<Text category="h4" style={styles.text}>
					{formattedActivity}
				</Text>
				{subtitle && <Text style={styles.text}>{subtitle}</Text>}
			</View>
		</TouchableOpacity>
	);
};
const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		alignItems: 'center',
		borderRadius: 20,
		borderWidth: 0,
		padding: 0,
	},
	text: {
		paddingLeft: 12,
	},
});
