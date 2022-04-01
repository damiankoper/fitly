import { Layout, Text } from '@ui-kitten/components';
import React from 'react';
import { StyleSheet } from 'react-native';
import { SelectSimple } from '../components/inputs/select-simple';
import { EXERCISES } from '../config';

export const ServiceModeScreen = () => {
  return (
    <Layout style={styles.container}>
      <SelectSimple options={EXERCISES} placeholder="Exercise name" />
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
