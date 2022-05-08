import { ActivityType } from '@fitly/shared/meta';
import { Layout, Text, Button } from '@ui-kitten/components';
import { useStopwatch } from 'react-timer-hook';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { GuessSpinner } from '../components/spinners/guess-spinner';
import { useActivityString } from '../hooks/useActivityString';
import { Timer } from '../components/misc/timer';

export enum STATUS {
  IDLE = 'idle',
  SEARCHING = 'searching',
  FOUND = 'found',
}

export const GuessScreen = () => {
  const [status, setStatus] = useState<STATUS>(STATUS.IDLE);
  const [activity, setActivity] = useState<ActivityType | null>(null);
  const { seconds, minutes, isRunning, start, pause, reset } = useStopwatch({
    autoStart: false,
  });

  useEffect(() => {
    if (status === STATUS.SEARCHING) {
      start();
    }
  }, [status]);

  let title;

  if (status === STATUS.SEARCHING) {
    title = (
      <Text style={styles.title}>
        <Text category="h3" status="primary">
          searching...
        </Text>
      </Text>
    );
  } else if (status === STATUS.FOUND && activity) {
    title = (
      <Text style={styles.title} category="h3">
        Detected{' '}
        <Text category="h3" status="primary">
          {useActivityString(activity)}
        </Text>
      </Text>
    );
  } else {
    title = (
      <Text style={styles.title} category="h3">
        Push to{' '}
        <Text category="h3" status="primary">
          detect
        </Text>
      </Text>
    );
  }

  const handleStop = () => {
    isRunning ? pause() : start();
  };

  const handleReset = () => {
    pause();
    reset();
    setStatus(STATUS.IDLE);
  };

  return (
    <Layout style={status !== STATUS.IDLE ? styles.container : {}}>
      {title}

      <View
        style={
          status !== STATUS.IDLE
            ? styles.spinnerWrapper
            : styles.idleSpinnerWrapper
        }
      >
        <GuessSpinner status={status} activity={activity} setStatus={setStatus} />
      </View>

      {status !== STATUS.IDLE && (
        <View style={styles.timerWrapper}>
          <Timer minutes={minutes} seconds={seconds} />
        </View>
      )}

      {(status === STATUS.FOUND || status == STATUS.SEARCHING) && (
        <View style={styles.buttonWrapper}>
          <Button
            style={styles.button}
            size="giant"
            appearance="filled"
            onPress={handleStop}
          >
            Stop
          </Button>
          <Button
            style={styles.button}
            size="giant"
            appearance="outline"
            onPress={handleReset}
          >
            Reset
          </Button>
        </View>
      )}
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  title: {
    textAlign: 'center',
  },
  spinnerWrapper: {
    alignItems: 'center',
  },
  idleSpinnerWrapper: {
    alignItems: 'center',
    marginTop: 80,
  },
  timerWrapper: {
    alignItems: 'center',
  },
  buttonWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    width: 170,
  },
});
