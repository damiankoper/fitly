import React from 'react';
import { StyleSheet } from 'react-native';
import { IndexPath, Layout, Select, SelectItem } from '@ui-kitten/components';

interface Props {
  options: string[];
  placeholder?: string;
}

export const SelectSimple: React.FC<Props> = ({ options, placeholder }) => {
  const [selectedIndex, setSelectedIndex] = React.useState(new IndexPath(0));

  return (
    <Layout style={styles.container}>
      <Select
        placeholder={placeholder}
        // @ts-ignore
        onSelect={(index) => setSelectedIndex(index)}
      >
        {options.map((option) => (
          <SelectItem title={option} key={option}/>
        ))}
      </Select>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {},
});
