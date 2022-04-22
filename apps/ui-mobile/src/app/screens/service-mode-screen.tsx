import { Layout, Button, Input } from '@ui-kitten/components';
import React, { useEffect, useState } from 'react';
import { NativeModules, StyleSheet } from 'react-native';
import { SelectSimple } from '../components/inputs/select-simple';
import { EXERCISES } from '../config';
import { BluetoothButton } from '../components/buttons/bluetooth-button';
import {
  AccelerometerData,
  addEventListenerToAcceleometerModule,
} from '../events/accelerometer-module.listener';
import {
  addEventListenerToGyroModule,
  GyroscopeData,
} from '../events/gyroscope-module.listener';
import {
  addEventListenerToMagnetometerModule,
  MagnetometerData,
} from '../events/magnetometer-module.listener';
import MetaWearModule from '../native-modules/MetaWearModule';
import _ from 'lodash';
import { DateTime, Interval } from 'luxon';
import { AxesData } from 'libs/shared/meta/src/lib/models/axes-data.model';
import {
  ActivityTracking,
  ActivityTrackingMeta,
  SensorAsyncSample,
} from 'libs/shared/meta/src/lib/models';
import { instanceToPlain } from 'class-transformer';

interface ServiceModeScreenProps {
  navigation: any;
}

let tempValue = '';
let repeats = 0;

export const ServiceModeScreen: React.FC<ServiceModeScreenProps> = ({
  navigation,
}) => {
  const [inputValue, setInputValue] = useState<string>('');
  const [idInterval, setIdInterval] = useState<NodeJS.Timer>(null);

  let accData: SensorAsyncSample[] = [];
  let gyroData: SensorAsyncSample[] = [];
  let magData: SensorAsyncSample[] = [];

  let activityTrackingMeta: ActivityTrackingMeta;

  let setInputValueThrottled = _.throttle(setInputValue, 1000);

  const addRepetition = () => {
    repeats += 1;
  };

  const resetData = () => {
    repeats = 0;
    tempValue = '';
    setInputValue('');
  };

  const sendData = (activityTracking: ActivityTracking) => {
    //interwal w modelu to data poczatkowa(czyszczenie danych) i data koncowa(wysylanie danych)
    //start->odpala sie interval(zwraca swoj id)->pierwsze odpalenie, nic nie wysylasz->przy kolejnych wysylasz i czyscisz
    //czyscic interval przy kazdej mozliwosci zamkniecia komponentu(zmiana komponentu, przycisk stop itp)
    //instanceToPlain(activityTracking);
  };

  const startModules = () => {
    // const intervalID = setInterval(() => {
    //   if (activityTrackingMeta) {
    //     activityTrackingMeta.interval.set({ end: DateTime.now() });
    //     activityTrackingMeta.repeats = repeats;

    //     let activityTracking = new ActivityTracking(
    //       activityTrackingMeta,
    //       accData,
    //       gyroData,
    //       magData
    //     );

    //     console.log(instanceToPlain(activityTracking));
    //   }
    //   accData = [];
    //   gyroData = [];
    //   magData = [];
    //   activityTrackingMeta = new ActivityTrackingMeta(
    //     Interval.fromDateTimes(DateTime.now(), DateTime.now())
    //   );
    // }, 1000);

    // setIdInterval(intervalID);
    // resetData();
    MetaWearModule.startMetaWearModules();
  };

  //!!!!
  //naUnmounted tez trzeba dac clearInterval()
  //!!!!

  const stopModules = () => {
    console.log('CLEARING_INTERVAL:', idInterval);
    clearInterval(idInterval);
    console.log('tempValue', tempValue.length);

    // sendData();
    MetaWearModule.stopMetaWearModules();
  };

  const addToArray = (
    array: SensorAsyncSample[],
    x: String,
    y: String,
    z: String
  ) => {
    const sas = new SensorAsyncSample(
      new AxesData(Number(x), Number(y), Number(z))
    );
    array.push(sas);
  };

  const createTempValue = (name: string, x: String, y: String, z: String) => {
    return 'Device: ' + name + ' x: ' + x + ' y: ' + y + ' z: ' + z + '\n';
  };

  useEffect(() => {
    addEventListenerToAcceleometerModule(
      'onAccelerometerDataEmit',
      (newDevice) => {
        tempValue += createTempValue(
          'acc',
          newDevice.x,
          newDevice.y,
          newDevice.z
        );
        setInputValueThrottled(tempValue);
        addToArray(accData, newDevice.x, newDevice.y, newDevice.z);
      }
    );

    addEventListenerToMagnetometerModule(
      'onMagnetometerDataEmit',
      (newDevice) => {
        tempValue += createTempValue(
          'mag',
          newDevice.x,
          newDevice.y,
          newDevice.z
        );

        setInputValueThrottled(tempValue);
        addToArray(magData, newDevice.x, newDevice.y, newDevice.z);
      }
    );

    addEventListenerToGyroModule('onGyroscopeDataEmit', (newDevice) => {
      tempValue += createTempValue(
        'gyro',
        newDevice.x,
        newDevice.y,
        newDevice.z
      );
      setInputValueThrottled(tempValue);
      addToArray(gyroData, newDevice.x, newDevice.y, newDevice.z);
    });

    // componentWillUnmount
    return () => {
      clearInterval(idInterval);
      resetData();
    };
  }, []);

  return (
    <Layout style={styles.container}>
      <SelectSimple options={EXERCISES} placeholder="Exercise name" />

      <Layout style={styles.buttonsWrapper}>
        <Button
          style={styles.button}
          size="giant"
          appearance="outline"
          onPress={startModules}
        >
          Start
        </Button>
        <Button
          style={styles.button}
          size="giant"
          appearance="outline"
          onPress={stopModules}
        >
          Stop
        </Button>
      </Layout>

      <Input
        value={inputValue}
        multiline={true}
        editable={false}
        textStyle={{ minHeight: 256, maxHeight: 256 }}
        placeholder="Here incoming data should appear"
        style={styles.multiline}
      />

      <Button
        style={styles.buttonRepeat}
        size="giant"
        appearance="outline"
        onPress={addRepetition}
      >
        Increment
      </Button>
      <BluetoothButton navigation={navigation} />
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
  buttonRepeat: {
    width: window.innerWidth,
    marginBottom: 2,
  },
  multiline: {
    marginTop: 24,
    marginBottom: 24,
  },
});

//TODO:
//setInterval sie nie wylacza, po kliknieciu stop dalej leci
//tempValue sie chyba nie czysci, input po wyczyszczeniu przy pierwszym podaniu tempValue ma duzo wpisow
//repeats sie nie przekazuje dobrze lub nie inkrementuje(zawsze daje 0 do SensorAsyncSample)
//przekazac typ cwiczenia do SensorAsyncSample
//wysylanie axiosem SensorAsyncSample
//
