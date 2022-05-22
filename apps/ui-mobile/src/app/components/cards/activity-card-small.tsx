import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { ActivityIcon } from '../icons/activity-icon';
import { Text, useTheme } from '@ui-kitten/components';
import { commonStyles } from '../../assets/common/styles';
import { ActivityType } from '@fitly/shared/meta';
import { formatActivityString } from '../../common/utils';
import DropShadowWrapper from '../gradients/drop-shadow';
import LinearGradientCard from '../gradients/linear-gradient-card';
import { Themes } from '../gradients/themes';
import LinearGradient from 'react-native-linear-gradient';

interface Props {
	activity: ActivityType;
	subtitle?: string;
	onPress?: () => void;
	theme?: Themes;
}

export const ActivityCardSmall: React.FC<Props> = ({
	activity,
	onPress,
	subtitle,
	theme,
}) => {
	const formattedActivity = formatActivityString(activity);
	return (
		<DropShadowWrapper shadowColorTheme={theme}>
			<LinearGradient
				locations={[0, 1]}
				start={{ x: 0.25, y: 0.25 }}
				colors={['#9EB6FF', '#6B90FF']}
				style={[commonStyles.defaultBorder]}
			>
				<TouchableOpacity
					style={[commonStyles.defaultBorder, styles.container]}
					onPress={onPress}
				>
					<ActivityIcon activity={activity} variant />
					<View>
						<Text category="h4" style={styles.text}>
							{formattedActivity}
						</Text>
						{subtitle && (
							<Text style={styles.text}>{subtitle}</Text>
						)}
					</View>
				</TouchableOpacity>
			</LinearGradient>
		</DropShadowWrapper>
	);
};
const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		alignItems: 'center',
		borderRadius: 20,
		borderWidth: 0,
		padding: 6,
	},
	text: {
		paddingLeft: 12,
	},
});
