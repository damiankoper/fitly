import { Button, Layout, Spinner } from '@ui-kitten/components';
import React from 'react';
import { StyleSheet, Text } from 'react-native';

export interface LoadingScreenProps {
	subText?: string;
	buttonText?: string;
	additionalButton?: boolean;
	onButtonPress?: () => void;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({
	subText,
	additionalButton,
	buttonText,
	onButtonPress,
}) => {
	return (
		<Layout style={styles.outerContainer} level="1">
			<Layout style={styles.innerContainer} level="1">
				<Spinner size="giant" />
				{subText && <Text style={styles.text}>{subText}</Text>}
				{additionalButton && (
					<Button
						size="medium"
						onPress={onButtonPress}
						style={styles.button}
					>
						{buttonText || 'Ok'}
					</Button>
				)}
			</Layout>
		</Layout>
	);
};

export default LoadingScreen;

const styles = StyleSheet.create({
	outerContainer: {
		justifyContent: 'center',
		alignItems: 'center',
		flex: 1,
	},
	innerContainer: {
		flexDirection: 'column',
		justifyContent: 'space-between',
		alignItems: 'center',
		flexWrap: 'wrap',
	},
	text: {
		marginTop: 10,
	},
	button: {
		marginTop: 10,
	},
});
