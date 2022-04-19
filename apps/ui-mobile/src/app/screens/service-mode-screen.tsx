import { Layout, Button, Input } from '@ui-kitten/components';
import React, { useEffect } from 'react';
import { NativeModules, StyleSheet } from 'react-native';
import { SelectSimple } from '../components/inputs/select-simple';
import { EXERCISES } from '../config';
import { BluetoothButton } from '../components/buttons/bluetooth-button';
import {
	addEventListenerToAcceleometerModule
} from '../events/accelerometer-module.listener';
import {
	addEventListenerToGyroModule
} from '../events/gyroscope-module.listener';
import {
	addEventListenerToMagnetometerModule
} from '../events/magnetometer-module.listener';
import MetaWearModule from '../native-modules/MetaWearModule';

export const ServiceModeScreen = () => {

  useEffect(()=>{
    addEventListenerToAcceleometerModule(
			'onAccelerometerDataEmit',
			(newDevice) => {
				console.log(newDevice)
			}
		);

    addEventListenerToMagnetometerModule(
			'onMagnetometerDataEmit',
			(newDevice) => {
				console.log(newDevice)
			}
		);

    addEventListenerToGyroModule(
			'onGyroscopeDataEmit',
			(newDevice) => {
				console.log(newDevice)
			}
		);

	}, []);
  return (
    <Layout style={styles.container}>
      <SelectSimple options={EXERCISES} placeholder="Exercise name" />

      <Layout style={styles.buttonsWrapper}>
        <Button style={styles.button} size="giant" appearance="outline" onPress={startModules}>
          Start
        </Button>
        <Button style={styles.button} size="giant" appearance="outline" onPress={stopModules}>
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

const startModules = () => {
  MetaWearModule.startMetaWearModules()
}

const stopModules = () => {
  MetaWearModule.stopMetaWearModules()
}

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
