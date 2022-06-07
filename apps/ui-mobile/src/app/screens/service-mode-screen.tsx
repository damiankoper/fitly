import {
  Layout,
  Button,
  Select,
  SelectItem,
  Text,
} from '@ui-kitten/components';
import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { BluetoothButton } from '../components/buttons/bluetooth-button';
import _ from 'lodash';
import { AxesData, SensorAsyncSample, ActivityType } from '@fitly/shared/meta';
import { IndexPath } from '@ui-kitten/components';
import { ActivityNames } from '../assets/common/activity-names';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { MetaWearProps } from '../App';
import { showNotification } from '@fitly/ui-utils';
import { BottomTabParamList } from '../interfaces/BottomTabParamList';
import { useSelector } from 'react-redux';
import { RootState } from '../state/root.reducer';

type NavProps = BottomTabScreenProps<BottomTabParamList, 'Service'>;
export const ServiceModeScreen: React.FC<NavProps & MetaWearProps> = ({
  navigation,
  metawear,
  tracker,
}) => {
  const isConnectedToDevice = useSelector((state: RootState) =>
    Boolean(state.app.connectedDevice)
  );

  const throttleInteval = 1000;
  const defaultSensorSample = new SensorAsyncSample(new AxesData(0, 0, 0));
  const [repeats, setRepeats] = useState(0);
  const [selectedActivity, setSelectedActivity] = useState(
    ActivityType.UNKNOWN
  );

  const [lastAccData, _setLastAccData] = useState(defaultSensorSample);
  const setLastAccData = _.throttle(_setLastAccData, throttleInteval);
  const [lastGyroData, _setLastGyroData] = useState(defaultSensorSample);
  const setLastGyroData = _.throttle(_setLastGyroData, throttleInteval);
  const [lastMagData, _setLastMagData] = useState(defaultSensorSample);
  const setLastMagData = _.throttle(_setLastMagData, throttleInteval);

  function resetData() {
    setRepeats(0);
    setLastAccData(defaultSensorSample);
    setLastGyroData(defaultSensorSample);
    setLastMagData(defaultSensorSample);
  }

  function startModules() {
    resetData();
    metawear.start();
    tracker.startService();
  }

  function stopModules() {
    tracker.stop();
    metawear.stop();
    resetData();
  }

  function processData(
    data: AxesData,
    setTracker: (x: SensorAsyncSample) => void,
    setLast: (x: SensorAsyncSample) => void
  ) {
    const sample = new SensorAsyncSample(data);
    setTracker(sample);
    setLast(sample);
  }

  useEffect(() => {
    const events: (() => void)[] = [];
    const navigationEvents: (() => void)[] = [];
    navigationEvents.push(
      navigation.addListener('focus', () => {
        events.push(
          metawear.accelerometerData.sub((data) =>
            processData(
              data,
              tracker.addAccelerometerSample.bind(tracker),
              setLastAccData
            )
          ),
          metawear.gyroscopeData.sub((data) =>
            processData(
              data,
              tracker.addGyroscopeSample.bind(tracker),
              setLastGyroData
            )
          ),
          metawear.magnetometerData.sub((data) =>
            processData(
              data,
              tracker.addMagnetometerSample.bind(tracker),
              setLastMagData
            )
          ),
          tracker.onError.sub((error) => {
            showNotification(error.message);
          }),
          tracker.onSuccess.sub((message) => {
            showNotification(
              `Sent samples: acc(${message.accelerometer.length}), gyro(${message.gyroscope.length}), mag(${message.magnetometer.length})`
            );
          })
        );
      })
    );
    navigationEvents.push(
      navigation.addListener('blur', () => {
        resetData();
        events.forEach((t) => t());
      })
    );

    return () => {
      navigationEvents.forEach((t) => t());
      events.forEach((t) => t());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const activityTypeArray = Object.values(ActivityType);
  function getActivityIndexPath(activity: ActivityType): IndexPath {
    return new IndexPath(activityTypeArray.findIndex((a) => a === activity));
  }

  function setActivityFromIndexPath(indexPath: IndexPath | IndexPath[]) {
    if ('row' in indexPath) {
      setSelectedActivity(activityTypeArray[indexPath.row]);
      tracker.setActivityType(activityTypeArray[indexPath.row]);
    }
  }

  return (
    <Layout style={styles.container}>
      <Select
        size="large"
        placeholder="Exercise name"
        onSelect={setActivityFromIndexPath}
        selectedIndex={getActivityIndexPath(selectedActivity)}
        value={ActivityNames[selectedActivity]}
      >
        {Object.values(ActivityType).map((activity) => (
          <SelectItem title={ActivityNames[activity]} key={activity} />
        ))}
      </Select>

      <Layout style={styles.buttonsWrapper}>
        <Button
          style={{ ...styles.button, ...styles.buttonLeft }}
          size="giant"
          appearance="outline"
          onPress={startModules}
          disabled={!isConnectedToDevice}
        >
          Start
        </Button>
        <Button
          style={{ ...styles.button, ...styles.buttonRight }}
          size="giant"
          appearance="outline"
          onPress={stopModules}
          disabled={!isConnectedToDevice}
        >
          Stop
        </Button>
      </Layout>

      <Layout style={styles.multiline}>
        <Text>Repeats: {repeats}</Text>
        <Text>
          Acc: {lastAccData.data.x.toFixed(6)} {lastAccData.data.y.toFixed(6)}{' '}
          {lastAccData.data.z.toFixed(6)}
        </Text>
        <Text>
          Gyro: {lastGyroData.data.x.toFixed(6)}{' '}
          {lastGyroData.data.y.toFixed(6)} {lastGyroData.data.z.toFixed(6)}
        </Text>
        <Text>
          Mag: {lastMagData.data.x.toFixed(6)} {lastMagData.data.y.toFixed(6)}{' '}
          {lastMagData.data.z.toFixed(6)}
        </Text>
      </Layout>

      <Button
        style={styles.buttonRepeat}
        size="giant"
        appearance="outline"
        onPress={() => {
          setRepeats(repeats + 1);
          tracker.addRepeats();
        }}
      >
        Increment repeats
      </Button>
      {isConnectedToDevice || <BluetoothButton navigation={navigation} />}
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttonsWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: 12,
  },
  button: {
    flex: 1,
  },
  buttonLeft: { marginRight: 6 },
  buttonRight: { marginLeft: 6 },
  buttonRepeat: {
    height: 256,
    marginBottom: 12,
  },
  multiline: {
    margin: 24,
  },
});
