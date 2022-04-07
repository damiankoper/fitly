import { Layout, Text } from '@ui-kitten/components';
import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { ActivityCard } from '../components/cards/activity-card';
import { EXERCISES_ENUM } from '../config';

export const HistoryScreen = () => {
  return (
    <Layout>
      <ScrollView>
        <Text category="h6" style={styles.dateText}>
          Yesterday
        </Text>
        <View style={styles.cardWrapper}>
          <ActivityCard
            activity={EXERCISES_ENUM.SQUATS}
            count={35}
            time="7:34"
            kcal={128}
            date="Yesterday"
          />
        </View>
        <View style={styles.cardWrapper}>
          <ActivityCard
            activity={EXERCISES_ENUM.SQUATS}
            count={35}
            time="7:34"
            kcal={128}
            date="Yesterday"
          />
        </View>
        <Text category="h6" style={styles.dateText}>
          10 march 2022
        </Text>
        <View style={styles.cardWrapper}>
          <ActivityCard
            activity={EXERCISES_ENUM.SQUATS}
            count={35}
            time="7:34"
            kcal={128}
            date="Yesterday"
          />
        </View>
        <View style={styles.cardWrapper}>
          <ActivityCard
            activity={EXERCISES_ENUM.SQUATS}
            count={35}
            time="7:34"
            kcal={128}
            date="Yesterday"
          />
        </View>
        <View style={styles.cardWrapper}>
          <ActivityCard
            activity={EXERCISES_ENUM.SQUATS}
            count={35}
            time="7:34"
            kcal={128}
            date="Yesterday"
          />
        </View>
      </ScrollView>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {},
  dateText: {
    marginBottom: 4,
  },
  cardWrapper: {
    marginBottom: 8,
  },
});
