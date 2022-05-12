import { ActivityType } from '@fitly/shared/meta';
import { useTheme } from '@ui-kitten/components';
import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { ActivityIcons } from '../../assets/common/activity-icons';

interface Props {
	activity: ActivityType;
	large?: boolean;
	variant?: boolean;
}

export const ActivityIcon: React.FC<Props> = ({ activity, large, variant }) => {
	const theme = useTheme();

	return (
		<View
			style={[
				large ? styles.largeContainer : styles.container,
				{
					backgroundColor: variant
						? theme['color-basic-200']
						: theme['color-primary-200'],
				},
			]}
		>
			<Image
				style={large ? styles.largeImage : styles.image}
				source={ActivityIcons[activity]}
			/>
		</View>
	);
};

const size = 68;
const styles = StyleSheet.create({
	container: {
		alignItems: 'center',
		justifyContent: 'center',
		width: size,
		height: size,
		borderRadius: 20,
	},
	largeContainer: {
		alignItems: 'center',
		justifyContent: 'center',
		width: 2 * size,
		height: 2 * size,
		borderRadius: 20,
	},
	image: {
		width: size - 8,
		height: size - 8,
	},
	largeImage: {
		width: 2 * size - 8,
		height: 2 * size - 8,
	},
});
