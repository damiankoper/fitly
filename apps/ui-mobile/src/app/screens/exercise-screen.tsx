import { Layout, Text } from '@ui-kitten/components';
import React from 'react';
import { EXERCISES_ENUM } from '../config';
import { StyleSheet, View } from 'react-native';
import { ActivityCardSmall } from '../components/cards/activity-card-small';
export const ExerciseScreen = () => {
  const exercises = Object.values(EXERCISES_ENUM);

  return (
    <Layout>
      <Text category="h4" style={styles.title}>
        Choose activity
      </Text>
      {exercises.map((ex) => (
        <View style={styles.cardWrapper}>
          <ActivityCardSmall activity={ex} key={ex} />
        </View>
      ))}
    </Layout>
  );
};

const styles = StyleSheet.create({
  title: {
    textAlign: 'center',
    marginBottom: 16,
  },
  cardWrapper: {
    marginBottom: 8,
  },
});
