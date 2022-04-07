import React from 'react';
import { Icon, Button } from '@ui-kitten/components';
import { StyleSheet } from 'react-native';

const BluetoothIcon = (props) => <Icon {...props} name="bluetooth-outline" />;

export interface BluetoothButtonProps {
  navigation: any;
}

export const BluetoothButton: React.FC<BluetoothButtonProps> = ({
  navigation,
}) => {
  return (
    <Button
      style={styles.button}
      status="primary"
      accessoryLeft={BluetoothIcon}
      onPress={() => navigation.navigate('BluetoothConnection')}
    >
      Press to (re)set connection with armband
    </Button>
  );
};

const styles = StyleSheet.create({
  button: {},
});
