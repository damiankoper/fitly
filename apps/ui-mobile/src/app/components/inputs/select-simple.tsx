import React, { Dispatch, SetStateAction } from 'react';
import { StyleSheet } from 'react-native';
import { Layout, Select, SelectItem, IndexPath } from '@ui-kitten/components';
import { ActivityType } from '@fitly/shared/meta';

interface Props {
  placeholder?: string;
  selectedIndex: IndexPath;
  setSelectedIndex: Dispatch<SetStateAction<IndexPath>>;
}

export const SelectSimple: React.FC<Props> = ({
  placeholder,
  setSelectedIndex,
  selectedIndex,
}) => {
  const exercises = Object.values(ActivityType);

  return (
    <Layout style={styles.container}>
      <Select
        placeholder={placeholder}
        // @ts-ignore
        onSelect={(index) => setSelectedIndex(index)}
        selectedIndex={selectedIndex}
        value={exercises[selectedIndex.row]}
      >
        {Object.values(ActivityType).map((option) => (
          <SelectItem title={option} key={option} />
        ))}
      </Select>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {},
});
