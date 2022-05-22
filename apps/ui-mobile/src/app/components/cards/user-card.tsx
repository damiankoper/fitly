import { Text, Icon, useTheme } from '@ui-kitten/components';
import React from 'react';
import { StyleSheet, Image, View } from 'react-native';
import { commonStyles } from '../../assets/common/styles';
import ManIcon from '../../assets/images/man.png';
import DropShadowWrapper from '../gradients/drop-shadow';
import LinearGradientCard from '../gradients/linear-gradient-card';
import { Themes } from '../gradients/themes';
interface Props {
	name: string;
	title: string;
	theme?: Themes;
}

export const UserCard: React.FC<Props> = ({ name, title, theme }) => {
	return (
		<DropShadowWrapper shadowColorTheme={theme}>
			<LinearGradientCard
				style={[commonStyles.defaultBorder]}
				x={0.48}
				y={0.5}
				theme={theme}
			>
				<View style={[commonStyles.defaultBorder, styles.container]}>
					<Image source={ManIcon} style={[styles.iconUser]} />
					<View>
						<Text style={styles.name}>{name}</Text>
						<View style={styles.titleContainer}>
							<Icon
								name="award-outline"
								style={styles.iconBadge}
							/>
							<Text style={styles.titleText}>{title}</Text>
						</View>
					</View>
				</View>
			</LinearGradientCard>
		</DropShadowWrapper>
	);
};

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		paddingHorizontal: 16,
		height: 80,
	},
	name: {
		textAlign: 'right',
		fontSize: 26,
		fontWeight: '800',
		letterSpacing: 1,
	},
	titleContainer: {
		textAlign: 'right',
		flexDirection: 'row',
	},
	titleText: {
		color: '#C1C1C1',
		fontFamily: 'notoserif',
		letterSpacing: 1,
	},
	iconUser: {
		width: 48,
		aspectRatio: 1,
		marginRight: 8,
	},
	iconBadge: {
		width: 24,
		height: 24,
		color: 'blue',
		aspectRatio: 1,
	},
});
