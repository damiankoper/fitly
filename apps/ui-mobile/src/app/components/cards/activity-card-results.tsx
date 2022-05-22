import React from 'react';
import { ActivityType } from '@fitly/shared/meta';
import { StyleSheet, View } from 'react-native';
import { ActivityIcon } from '../icons/activity-icon';
import { Text } from '@ui-kitten/components';
import { commonStyles } from '../../assets/common/styles';
import DropShadowWrapper from '../gradients/drop-shadow';
import LinearGradientCard from '../gradients/linear-gradient-card';
import { Themes } from '../gradients/themes';

interface Props {
	activity: ActivityType;
	theme?: Themes;
}

export const ActivityCardResults: React.FC<Props> = ({ activity, theme }) => {
	console.log(activity);

	return (
		<DropShadowWrapper shadowColorTheme={theme}>
			<LinearGradientCard
				theme={theme}
				style={[commonStyles.defaultBorder]}
			>
				<View style={[commonStyles.defaultBorder, styles.container]}>
					<Text category="h1">Results</Text>
					<ActivityIcon activity={activity} large={true} />
				</View>
			</LinearGradientCard>
		</DropShadowWrapper>
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
