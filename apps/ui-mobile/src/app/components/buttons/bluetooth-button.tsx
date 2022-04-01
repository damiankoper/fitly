import React from 'react';
import { Icon, Button } from '@ui-kitten/components';
import { StyleSheet } from 'react-native';

const BluetoothIcon = (props) => <Icon {...props} name="bluetooth-outline" />;

export const BluetoothButton = () => {
  return (
    <Button
      style={styles.button}
      status="primary"
      accessoryLeft={BluetoothIcon}
    >
      Press to (re)set connection with armband
    </Button>
  );
};

const styles = StyleSheet.create({
  button: {
    margin: 2,
  },
});
