import React from 'react';
import { ActivityType } from '@fitly/shared/meta';
import { StyleSheet, View } from 'react-native';
import { ActivityIcon } from '../icons/activity-icon';
import { Text } from '@ui-kitten/components';
import { formatActivityString } from '../../common/utils';
import { commonStyles } from '../../assets/common/styles';
import DropShadowWrapper from '../gradients/drop-shadow';
import LinearGradientCard from '../gradients/linear-gradient-card';
import { Themes } from '../gradients/themes';

interface Props {
	activity: ActivityType;
	theme?: Themes;
}

export const ActivityCardLargeNoDetails: React.FC<Props> = ({
	activity,
	theme,
}) => {
	const formattedActivity = formatActivityString(activity);

	return (
		<DropShadowWrapper shadowColorTheme={theme}>
			<LinearGradientCard
				theme={theme}
				style={[commonStyles.defaultBorder]}
			>
				<View style={[commonStyles.defaultBorder, styles.container]}>
					<ActivityIcon activity={activity} large={true} />
					<Text category="h1" style={styles.text}>
						{formattedActivity}
					</Text>
				</View>
			</LinearGradientCard>
		</DropShadowWrapper>
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
