import React, { Dispatch, SetStateAction } from 'react';
import { StyleSheet } from 'react-native';
import { Layout, Select, SelectItem, IndexPath } from '@ui-kitten/components';
import { EXERCISES_ENUM } from '../../config';

interface Props {
	placeholder?: string;
	selectedIndex: IndexPath;
	setSelectedIndex: Dispatch<SetStateAction<IndexPath>>;
}

export const SelectSimple: React.FC<Props> = ({ placeholder, setSelectedIndex, selectedIndex }) => {
	const exercises = Object.values(EXERCISES_ENUM)

	return (
		<Layout style={styles.container}>
			<Select
				placeholder={placeholder}
				// @ts-ignore
				onSelect={(index) => setSelectedIndex(index)}
				selectedIndex={selectedIndex}
				value={exercises[selectedIndex.row]}
			>
				{Object.values(EXERCISES_ENUM).map((option) => (
					<SelectItem title={option} key={option} />
				))}
			</Select>
		</Layout>
	);
};

const styles = StyleSheet.create({
	container: {},
});
