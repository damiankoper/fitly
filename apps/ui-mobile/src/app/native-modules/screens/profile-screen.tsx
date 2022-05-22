import React from 'react';
import { StyleSheet } from 'react-native';
import { View } from 'react-native';
import {
	Layout,
	Text,
	Input,
	Radio,
	RadioGroup,
	Button,
} from '@ui-kitten/components';

export const ProfileScreen = () => {
	const [firstName, setFirstName] = React.useState('');
	const [lastName, setLasttName] = React.useState('');
	const [age, setAge] = React.useState('');
	const [weight, setWeight] = React.useState('');
	const [height, setHeight] = React.useState('');

	const [selectedIndex, setSelectedIndex] = React.useState(0);

	return (
		<Layout style={styles.container}>
			<View style={styles.formColumn}>
				<View>
					<Text category="h1" style={styles.name}>
						Jan Nikodem
					</Text>
					<Input
						placeholder="first name"
						value={firstName}
						onChangeText={(nextValue) => setFirstName(nextValue)}
						style={styles.input}
						size="large"
					/>
					<Input
						placeholder="last name"
						value={lastName}
						onChangeText={(nextValue) => setLasttName(nextValue)}
						style={styles.input}
						size="large"
					/>
					<Input
						placeholder="age"
						value={age}
						onChangeText={(nextValue) => setAge(nextValue)}
						style={styles.input}
						size="large"
					/>
					<Input
						placeholder="weight"
						value={weight}
						onChangeText={(nextValue) => setWeight(nextValue)}
						style={styles.input}
						size="large"
					/>
					<Input
						placeholder="height"
						value={height}
						onChangeText={(nextValue) => setHeight(nextValue)}
						style={styles.input}
						size="large"
					/>
					<RadioGroup
						style={styles.radioGroup}
						selectedIndex={selectedIndex}
						onChange={(index) => setSelectedIndex(index)}
					>
						<Radio>Male</Radio>
						<Radio>Female</Radio>
					</RadioGroup>
				</View>

				<Button appearance="outline" status="primary">
					Save
				</Button>
			</View>
		</Layout>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	formColumn: {
		flex: 1,
		justifyContent: 'space-between',
	},
	name: {
		textAlign: 'center',
	},
	input: {
		marginTop: 16,
	},
	radioGroup: {
		flexDirection: 'row',
		marginTop: 8,
	},
	button: {
		marginTop: 16,
	},
});
