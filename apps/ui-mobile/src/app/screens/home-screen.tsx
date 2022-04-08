import { Icon, Layout, Text, useTheme } from '@ui-kitten/components';
import React from 'react';
import { UserCard } from '../components/cards/user-card';
import { StyleSheet, View, ScrollView } from 'react-native';
import { DataCardLarge } from '../components/cards/data-card-large';
import { BluetoothStatus } from '../components/icons/bluetooth-status';
import { DataCardSmall } from '../components/cards/data-card-small';
import { ActivityCardLarge } from '../components/cards/activity-card-large';
import { EXERCISES_ENUM } from '../config';

export const StepsIcon = () => {
  const theme = useTheme();

  return (
    <Icon
      name="pin-outline"
      style={styles.icon}
      fill={theme['color-primary-default']}
    />
  );
};

export const CaloriesIcon = () => {
  const theme = useTheme();

  return (
    <Icon
      name="flash-outline"
      style={styles.icon}
      fill={theme['color-danger-default']}
    />
  );
};

export const TimeIcon = () => {
  const theme = useTheme();

  return (
    <Icon
      name="clock-outline"
      style={styles.icon}
      fill={theme['color-basic-700']}
    />
  );
};

export const HomeScreen = () => {
  return (
    <Layout>
      <ScrollView>
        <UserCard name="Jan Nikodem" title="Master of squats" />
        <Text style={styles.placeholder}>placeholder wykresu</Text>

        <View style={styles.cardRow}>
          <View style={[styles.cardColumn, styles.leftColumn]}>
            <DataCardLarge Icon={StepsIcon} name="Steps" quantity={2137} />
            <DataCardLarge
              Icon={CaloriesIcon}
              name="Calories"
              quantity={1690}
            />
          </View>
          <View style={[styles.cardColumn, styles.rightColumn]}>
            <View style={styles.smallCardRow}>
              <BluetoothStatus connected={true} />
              <View style={styles.separator} />
              <DataCardSmall data="45" activity="running" />
            </View>
            <DataCardLarge Icon={TimeIcon} name="Time spent" quantity={3723} />
          </View>
        </View>

        <View style={styles.bottomCard}>
          <ActivityCardLarge
            activity={EXERCISES_ENUM.SQUATS}
            date="Yesterday, 8 Mar"
            kcal={231}
            time="2:32"
            count={31}
          />
        </View>
      </ScrollView>
    </Layout>
  );
};

const styles = StyleSheet.create({
  placeholder: {
    marginVertical: 16,
    height: 170,
  },
  cardColumn: {
    flex: 1,
    height: 170,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  leftColumn: {
    marginRight: 4,
  },
  rightColumn: {
    marginLeft: 4,
  },
  cardRow: {
    flexDirection: 'row',
    flex: 1,
    height: 170,
  },
  icon: {
    height: 40,
    width: 40,
  },
  smallCardRow: {
    flexDirection: 'row',
  },
  separator: {
    width: 8,
  },
  bottomCard: {
    marginVertical: 8,
  },
});
