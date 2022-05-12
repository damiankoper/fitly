import { Text, Icon, useTheme } from '@ui-kitten/components';
import React from 'react';
import { StyleSheet, Image, View } from 'react-native';
import { commonStyles } from '../../assets/common/styles';
import ManIcon from '../../assets/images/man.png';
interface Props {
	name: string;
	title: string;
}

export const UserCard: React.FC<Props> = ({ name, title }) => {
	const theme = useTheme();

	return (
		<View style={[commonStyles.defaultCard, styles.container]}>
			<Image source={ManIcon} style={[styles.iconUser]} />
			<View>
				<Text style={styles.name}>{name}</Text>
				<View style={styles.titleContainer}>
					<Icon
						name="award-outline"
						style={styles.iconBadge}
						fill={theme['color-primary-default']}
					/>
					<Text>{title}</Text>
				</View>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		alignItems: 'center',
		paddingHorizontal: 16,
		height: 80,
	},
	name: {
		fontSize: 20,
		fontWeight: '700',
	},
	titleContainer: {
		flexDirection: 'row',
	},
	iconUser: {
		width: 48,
		aspectRatio: 1,
		marginRight: 8,
	},
	iconBadge: {
		width: 24,
		aspectRatio: 1,
	},
});
