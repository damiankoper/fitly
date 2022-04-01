import { Layout, Button, Input } from '@ui-kitten/components';
import React from 'react';
import { StyleSheet } from 'react-native';
import { SelectSimple } from '../components/inputs/select-simple';
import { EXERCISES } from '../config';
import { BluetoothButton } from '../components/buttons/bluetooth-button';

export const ServiceModeScreen = () => {
  return (
    <Layout style={styles.container}>
      <SelectSimple options={EXERCISES} placeholder="Exercise name" />

      <Layout style={styles.buttonsWrapper}>
        <Button style={styles.button} size="giant" appearance="outline">
          Start
        </Button>
        <Button style={styles.button} size="giant" appearance="outline">
          Stop
        </Button>
      </Layout>

      <Input
        multiline={true}
        textStyle={{ minHeight: 256 }}
        placeholder="Here incoming data should appear"
        style={styles.multiline}
      />

      <BluetoothButton />
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttonsWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 24,
  },
  button: {
    width: 150,
    margin: 2,
  },
  multiline: {
    marginTop: 24,
    marginBottom: 24,
  },
});
