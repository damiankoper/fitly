import { Text } from '@ui-kitten/components';
import React from 'react';
import { StyleSheet, Image, View } from 'react-native';
import { commonStyles } from '../../assets/common/styles';
import DropShadowWrapper from '../gradients/drop-shadow';
import LinearGradientCard from '../gradients/linear-gradient-card';
import { Themes } from '../gradients/themes';

interface Props {
	name: string;
	theme?: Themes;
}

export const UserCardNoActivity: React.FC<Props> = ({ name, theme }) => {
	return (
		<DropShadowWrapper shadowColorTheme={theme}>
			<LinearGradientCard
				theme={theme}
				style={[commonStyles.defaultBorder]}
			>
				<View style={[commonStyles.defaultBorder, styles.container]}>
					<Image
						source={require('../../assets/images/user-avatar.png')}
					/>
					<Text style={styles.name}>{name}</Text>
				</View>
			</LinearGradientCard>
		</DropShadowWrapper>
	);
};

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		paddingHorizontal: 16,
		borderRadius: 4,
		borderColor: 'lightgray',
		borderWidth: 1,
	},
	name: {
		fontSize: 20,
		fontWeight: '700',
	},
});
