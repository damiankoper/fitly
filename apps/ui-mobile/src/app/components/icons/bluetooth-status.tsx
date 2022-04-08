import { Icon, Text } from '@ui-kitten/components';
import React from 'react';
import { View, StyleSheet } from 'react-native';

interface Props {
  connected: boolean;
}

export const BluetoothStatus: React.FC<Props> = ({ connected }) => {
  return (
    <View style={styles.container}>
      <Icon
        name="bluetooth-outline"
        style={styles.icon}
        fill={connected ? 'green' : 'red'}
      />
      <Text style={styles.smallText}>
        {connected ? 'Connected' : 'Not connected'} with device
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderRadius: 4,
    borderColor: 'lightgray',
    borderWidth: 1,
    padding: 9,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    height: 28,
    width: 28,
  },
  smallText: {
    fontSize: 12,
    textAlign: 'center',
  },
});
