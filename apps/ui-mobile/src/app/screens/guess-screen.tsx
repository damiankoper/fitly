import { ActivityType } from '@fitly/shared/meta';
import { Layout, Text } from '@ui-kitten/components';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { GuessSpinner } from '../components/spinners/guess-spinner';
import { useActivityString } from '../hooks/useActivityString';

export enum STATUS {
  IDLE = 'idle',
  SEARCHING = 'searching',
  FOUND = 'found'
}

export const GuessScreen = () => {
  const [status, setStatus] = useState<STATUS>(STATUS.IDLE);
  const [activity, setActivity] = useState<ActivityType | null>(null);
  let title;

  if (status === STATUS.SEARCHING) {
    title = (
      <Text style={styles.title}>
        <Text category="h3" status="primary">
          searching...
        </Text>
      </Text>
    );
  } else if (status === STATUS.FOUND && activity) {
    title = (
      <Text style={styles.title} category="h3">
        Detected{' '}
        <Text category="h3" status="primary">
          {useActivityString(activity)}
        </Text>
      </Text>
    );
  } else {
    title = (
      <Text style={styles.title} category="h3">
        Push to{' '}
        <Text category="h3" status="primary">
          detect
        </Text>
      </Text>
    );
  }

  return (
    <Layout>
      {title}
      <View style={styles.spinnerWrapper}>
        <GuessSpinner status={status} setStatus={setStatus}/>
      </View>
    </Layout>
  );
};

const styles = StyleSheet.create({
  title: {
    textAlign: 'center',
  },
  spinnerWrapper: {
    marginTop: 40,
    alignItems: 'center',
  },
});
