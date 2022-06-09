import React, { useEffect, useRef, useState } from 'react';
import { Layout } from '@ui-kitten/components';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { BottomTabParamList } from '../interfaces/BottomTabParamList';
import { CounterSpinner } from '../components/spinners/counter-spinner';
import { StyleSheet, View, Alert } from 'react-native';
import { ActivityCardSmall } from '../components/cards/activity-card-small';
import { MetaWearProps } from '../App';
import { showNotification } from '@fitly/ui-utils';
import { ActivitySession, SensorAsyncSample } from '@fitly/shared/meta';
import { useStopwatch } from 'react-timer-hook';
import { Interval, DateTime } from 'luxon';
import uiControl from '../data';
import { v4 as uuidv4 } from 'uuid';
import { useSelector } from 'react-redux';
import { RootState } from '../state/root.reducer';
type NavProps = BottomTabScreenProps<
  BottomTabParamList,
  'ExerciseCounterScreen'
>;

export const ExerciseCounterScreen: React.FC<NavProps & MetaWearProps> = ({
  route,
  navigation,
  metawear,
  tracker,
}) => {
  const [activity, setActivity] = useState(route.params.activity);

  useEffect(() => {
    setActivity(route.params.activity);
    onStop(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [route]);

  const [isPaused, setIsPaused] = useState(false);
  const [isStarted, setIsStarted] = useState(false);
  const [lastRepeats, setLastRepeats] = useState(0);
  const [lastDuration, setLastDuration] = useState(1);

  const activitySession = useRef<ActivitySession | null>(null);

  const stopwatch = useStopwatch({
    autoStart: false,
  });

  const isConnectedWithDevice = useSelector((state: RootState) =>
    Boolean(state.app.connectedDevice)
  );

  function startCapture() {
    metawear.start();
    tracker.startAnalyze();
  }

  function stopCapture() {
    tracker.stop();
    metawear.stop();
  }

  function onStop(redirect = true) {
    setIsStarted(false);
    setIsPaused(false);
    stopCapture();
    setLastDuration(0);
    setLastRepeats(0);
    stopwatch.reset(undefined, false);
    if (redirect && activitySession.current) {
      if (activitySession.current.activities.length > 0) {
        uiControl.saveSession(activitySession.current);
        navigation.navigate('ExerciseResultsScreen', {
          activitySession: activitySession.current,
        });
      } else {
        showNotification(
          'Excercise for at least 10 seconds to enable activity tracking'
        );
      }
    }
  }

  function onStart() {
    if (!isConnectedWithDevice) {
      showNotification('Connect your armband to enable activity tracking');
    } else {
      setIsStarted(true);
      setIsPaused(false);
      stopwatch.reset(undefined, true);
      startCapture();
      activitySession.current = new ActivitySession(
        Interval.fromDateTimes(DateTime.now(), DateTime.now()),
        [],
        uuidv4()
      );
    }
  }

  function onPause() {
    setIsPaused(!isPaused);
    if (!isPaused) {
      stopCapture();
      stopwatch.pause();
    } else {
      startCapture();
      stopwatch.start();
    }
  }

  useEffect(() => {
    const events: (() => void)[] = [];
    const navigationEvents: (() => void)[] = [];
    navigationEvents.push(
      navigation.addListener('focus', () => {
        events.push(
          metawear.accelerometerData.sub((data) =>
            tracker.addAccelerometerSample(new SensorAsyncSample(data))
          ),
          metawear.gyroscopeData.sub((data) =>
            tracker.addGyroscopeSample(new SensorAsyncSample(data))
          ),
          metawear.magnetometerData.sub((data) =>
            tracker.addMagnetometerSample(new SensorAsyncSample(data))
          ),
          tracker.onError.sub((error) => {
            showNotification(error.message);
          }),
          tracker.onAnalyze.sub((data) => {
            setActivity(data.type);
            setLastRepeats(lastRepeats + data.repeats);
            setLastDuration(
              lastDuration + data.interval.toDuration().as('seconds')
            );
            if (activitySession.current) {
              activitySession.current.activities.push(data);
              activitySession.current.interval =
                activitySession.current.interval.set({
                  end: data.interval.end,
                });
            }
          })
        );
      })
    );
    navigationEvents.push(
      navigation.addListener('blur', (e) => {
        if (isStarted) onStop();
        events.forEach((t) => t());
      })
    );

    return () => {
      navigationEvents.forEach((t) => t());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Layout style={styles.container}>
      <View>
        <View>
          <ActivityCardSmall activity={activity} subtitle="Current activity" />
        </View>
        <View style={styles.spinnerWrapper}>
          <CounterSpinner
            repeats={lastRepeats}
            rate={(lastRepeats / lastDuration) * 60}
            isPaused={isPaused}
            isStarted={isStarted}
            timer={`${stopwatch.minutes
              .toString()
              .padStart(2, '0')}:${stopwatch.seconds
              .toString()
              .padStart(2, '0')}`}
            onStop={onStop}
            onStart={onStart}
            onPause={onPause}
          />
        </View>
      </View>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    overflow: 'visible',
  },
  titleText: {
    fontSize: 32,
    textAlign: 'center',
    fontFamily: 'RobotoSlab-Bold',
    color: 'black',
    marginBottom: 16,
  },
  spinnerWrapper: {
    alignItems: 'center',
    marginTop: 16,
    marginBottom: 8,
  },
});
