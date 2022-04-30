import React from 'react';
import { Layout, Button } from '@ui-kitten/components';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { BottomTabParamList } from '../interfaces/BottomTabParamList';
import { ActivityCardLargeNoDetails } from '../components/cards/activity-card-large-no-details';
import { CounterSpinner } from '../components/spinners/counter-spinner';
import { StyleSheet, View } from 'react-native';

type NavProps = BottomTabScreenProps<
  BottomTabParamList,
  'ExerciseCounterScreen'
>;

export const ExerciseCounterScreen: React.FC<NavProps> = ({ route }) => {
  const { activity } = route.params;

  return (
    <Layout style={styles.container}>
      <ActivityCardLargeNoDetails activity={activity} />
      <View style={styles.spinnerWrapper}>
        <CounterSpinner content="35" />
      </View>
      <View style={styles.buttonContainer}>
        <Button style={styles.button} appearance="outline" size='giant'>
          Pause
        </Button>

        <Button style={styles.button} appearance="filled" size='giant'>
          Stop
        </Button>
      </View>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between'
  },
  spinnerWrapper: {
    alignItems: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between'

  },
  button:{
    width: 180,
  }
});
