import React from 'react';
import { Layout, Toggle, Text, Divider, Button } from '@ui-kitten/components';
import { StyleSheet, View } from 'react-native';
import { BluetoothButton } from '../components/buttons/bluetooth-button';

const useToggleState = (initialState = false) => {
  const [checked, setChecked] = React.useState(initialState);

  const onCheckedChange = (isChecked) => {
    setChecked(isChecked);
  };

  return { checked, onChange: onCheckedChange };
};

export const SettingScreen = ({ navigation }) => {
  const controlToggleState = useToggleState();

  return (
    <Layout style={styles.container}>
      <View style={styles.controlContainer}>
        <Text style={styles.modeText}>Dark mode</Text>
        <Toggle status="primary" {...controlToggleState} />
      </View>
      <Divider />

      <View style={styles.buttonColumn}>
        <View>
          <Button
            style={styles.button}
            size="giant"
            appearance="outline"
            onPress={() => navigation.navigate('Profile')}
          >
            Change data
          </Button>
          <Button
            style={styles.button}
            size="giant"
            status="warning"
            appearance="outline"
          >
            Clear data
          </Button>
          <Button
            style={styles.button}
            size="giant"
            status="basic"
            appearance="outline"
            onPress={() => navigation.navigate('Service')}
          >
            Service mode
          </Button>
        </View>

        <BluetoothButton />
      </View>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  controlContainer: {
    borderRadius: 4,
    padding: 16,

    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

    borderColor: 'lightgray',
    color: 'black',
    borderWidth: 1,
  },
  modeText: {
    fontWeight: '700',
    fontSize: 20,
  },
  buttonColumn: {
    flex: 1,
    justifyContent: 'space-between',
  },
  button: {
    marginTop: 16,
  },
});
