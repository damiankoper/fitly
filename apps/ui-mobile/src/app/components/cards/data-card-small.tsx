import React from 'react';
import { View, StyleSheet, StyleProp, ViewStyle } from 'react-native';
import { Text } from '@ui-kitten/components';
import { commonStyles } from '../../assets/common/styles';
import DropShadowWrapper from '../gradients/drop-shadow';
import LinearGradientCard from '../gradients/linear-gradient-card';
import { Themes } from '../gradients/themes';

interface Props {
	data: string | number;
	activity: string;
	theme?: Themes;
	style?: StyleProp<ViewStyle>;
}

export const DataCardSmall: React.FC<Props> = ({
	data,
	activity,
	theme,
	style,
}) => {
	return (
		<DropShadowWrapper shadowColorTheme={theme} style={style}>
			<LinearGradientCard
				theme={theme}
				style={[commonStyles.defaultBorder, { height: 80, padding: 0 }]}
			>
				<View style={[commonStyles.defaultBorder, styles.container]}>
					<Text style={styles.data}>
						{data}
						<Text style={styles.procent}>%</Text>
					</Text>
					<Text style={styles.smallText}>
						of activities is{' '}
						<Text style={styles.primaryText} status="primary">
							{activity}
						</Text>
					</Text>
				</View>
			</LinearGradientCard>
		</DropShadowWrapper>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		height: 80,
		justifyContent: 'center',
		alignItems: 'center',
		padding: 12,
	},
	data: {
		fontSize: 20,
		fontWeight: '700',
	},
	smallText: {
		fontSize: 12,
		textAlign: 'center',
	},
	primaryText: {
		fontSize: 12,
		textAlign: 'center',
		fontFamily: 'RobotoSlab-Bold',
	},
	procent: {
		fontSize: 20,
	},
});
