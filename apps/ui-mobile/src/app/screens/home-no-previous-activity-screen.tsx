import { Button, Layout, Text } from '@ui-kitten/components';
import React from 'react';
import { StyleSheet, Image } from 'react-native';
import { NoActivityUserCard } from '../components/cards/no-activity-user-card';

export const NoPreviousActivityScreen = () => {
  return (
    <Layout style={styles.container}>
      <NoActivityUserCard name="Jan Nikodem" />
      <Text category="h4" style={styles.manual}>
        <Text category="h4" status="primary">
          Start
        </Text>{' '}
        recording your exercise, or let the app detect your current{' '}
        <Text category="h4" status="primary">
          activity
        </Text>{' '}
        !
      </Text>
      <Image
        source={require('../assets/images/runner.png')}
        style={styles.image}
      />
      <Text style={styles.description}>
        Select tab Exercise to choose which activy would you like to monit or
        select tab Guess to let app guess which acitivity you are currently
        doing
      </Text>
      <Button status="primary" style={styles.button}>
        Start recording
      </Button>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {},
  manual: {
    textAlign: 'center',
    marginTop: 12,
  },
  image: {
    height: 170,
    resizeMode: 'contain',
    margin: 20,
    alignSelf: 'center',
  },
  description: {
    textAlign: 'center',
  },
  button: {
    marginTop: 24,
    width: 150,
    alignSelf: 'center',
  },
});
