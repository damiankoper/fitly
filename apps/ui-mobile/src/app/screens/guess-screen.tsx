import { Layout, Text } from '@ui-kitten/components';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { GuessSpinner } from '../components/spinners/guess-spinner';

export const GuessScreen = () => {
  return (
    <Layout>
      <Text style={styles.title} category="h3">
        Push to{' '}
        <Text category="h3" status="primary">
          detect
        </Text>
      </Text>
      <View style={styles.spinnerWrapper}>
        <GuessSpinner />
      </View>
    </Layout>
  );s
};

const styles = StyleSheet.create({
  title: {
    textAlign: 'center',
  },
  spinnerWrapper: {
    marginTop: 40,
    alignItems: 'center',
  }
});
