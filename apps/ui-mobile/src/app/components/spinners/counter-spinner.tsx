import { Button, Text, useTheme } from '@ui-kitten/components';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import DropShadowWrapper from '../gradients/drop-shadow';

interface Props {
  repeats?: number;
  rate?: number;
  isPaused?: boolean;
  isStarted?: boolean;
  timer?: string;
  onStart?: () => void;
  onPause?: () => void;
  onStop?: () => void;
}

export const CounterSpinner: React.FC<Props> = ({
  repeats,
  rate,
  isPaused,
  isStarted,
  onPause,
  onStop,
  onStart,
  timer,
}) => {
  const theme = useTheme();

  return (
    <DropShadowWrapper style={{ width: '100%' }}>
      <View
        style={[
          styles.container,
          { backgroundColor: theme['color-primary-200'] },
        ]}
      >
        <View style={[styles.statsContainer]}>
          <View>
            <Text style={styles.repeatsCap}>repeats</Text>
            <Text style={styles.repeats}>{repeats || 0}</Text>
          </View>
          <View style={{ alignItems: 'flex-end' }}>
            <Text style={styles.repeatsCap}>rate {'[r/min]'}</Text>
            <Text style={styles.repeats}>{(rate || 0).toFixed(1)}</Text>
          </View>
        </View>
        <View>
          <Text style={styles.timerCap}>time</Text>
          <Text style={styles.timer}>{timer || '00:00'}</Text>
        </View>
        <View style={styles.buttonContainer}>
          {isStarted && (
            <Button
              style={[styles.button, styles.pause]}
              appearance="outline"
              size="large"
              onPress={onPause}
            >
              {isPaused ? 'Resume' : 'Pause'}
            </Button>
          )}

          {isStarted && (
            <Button
              style={[styles.button, styles.stop]}
              appearance="filled"
              size="large"
              onPress={onStop}
            >
              Stop
            </Button>
          )}
          {!isStarted && (
            <Button
              style={[styles.button, styles.stop]}
              appearance="filled"
              size="large"
              onPress={onStart}
            >
              Start
            </Button>
          )}
        </View>
      </View>
    </DropShadowWrapper>
  );
};
const radius = 40;
const styles = StyleSheet.create({
  container: {
    width: '100%',
    borderRadius: radius,
    padding: radius,
  },
  statsContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  repeats: {
    fontSize: 52,
    fontWeight: 'bold',
    lineHeight: 52,
  },
  repeatsCap: {
    fontSize: 24,
    lineHeight: 28,
  },
  buttonContainer: {
    justifyContent: 'flex-end',
    flexDirection: 'row',
    marginTop: 20,
  },
  button: {
    borderRadius: 999,
    flex: 1,
  },
  pause: { backgroundColor: 'transparent', marginRight: 4 },
  stop: { marginLeft: 4 },
  timer: {
    fontSize: 52,
    fontWeight: 'bold',
    lineHeight: 52,
  },
  timerCap: {
    fontSize: 24,
    lineHeight: 28,
  },
});
