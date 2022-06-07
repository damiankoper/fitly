import { Icon, Layout, useTheme } from '@ui-kitten/components';
import React, { useEffect, useState } from 'react';
import { UserCard } from '../components/cards/user-card';
import { StyleSheet, View, ScrollView } from 'react-native';
import { DataCardLarge } from '../components/cards/data-card-large';
import { BluetoothStatus } from '../components/icons/bluetooth-status';
import { DataCardSmall } from '../components/cards/data-card-small';
import { ActivityCardLarge } from '../components/cards/activity-card-large';
import {
  ActivityTimeStats,
  ActivityTrackingMeta,
  User,
} from '@fitly/shared/meta';
import { useIsFocused } from '@react-navigation/native';
import ActivityLineChart from '../components/charts/ActivityLineChart';
import {
  getCaloriesFromActivityMetaAndUserWeight,
  getReadableDateStringFromInterval,
  getTimeDurationFromInterval,
} from './history-screen';
import { DEFAULT_HOME_PLOT_DATA } from '../common/utils';
import uiControl from '../data';

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

export const ActivityIcon = () => {
  const theme = useTheme();

  return (
    <Icon
      name="activity-outline"
      style={styles.icon}
      fill={theme['color-warning-500']}
    />
  );
};

export const HomeScreen: React.FC<{}> = () => {
  const initialStats = uiControl.getTimeStats();
  const intialMostPopularActivity = Object.keys(initialStats.type).reduce(
    (a, b) => (initialStats.type[a] > initialStats.type[b] ? a : b)
  );
  const initialSummaryTime = Object.values(initialStats.type).reduce(
    (a, b) => a + b
  );
  const initialTopActivityTimeSpent =
    initialStats.type[intialMostPopularActivity];
  const initialPercentile =
    (100 * initialTopActivityTimeSpent) / initialSummaryTime;

  const isFocused = useIsFocused();
  const [user, setUser] = useState<User>();
  const [lastActivity, setLastActivity] = useState<ActivityTrackingMeta>();
  const [stats, setStats] = useState<ActivityTimeStats>(initialStats);
  const [mostPopularActivity, setMostPopularActivity] = useState<string>(
    intialMostPopularActivity
  );
  const [summaryTime, setSummaryTime] = useState<number>(initialSummaryTime);
  const [topActivityTimeSpent, setTopActivityTimeSpent] = useState<number>(
    initialTopActivityTimeSpent
  );
  const [percentile, setPercentile] = useState<number>(initialPercentile);

  const onHomeScrenFocused = async () => {
    // default user always exist
    const user = uiControl.getUser();
    if (user) setUser(user);
    // update UI
    setStats(uiControl.getTimeStats());
    setMostPopularActivity(
      Object.keys(stats.type).reduce((a, b) =>
        stats.type[a] > stats.type[b] ? a : b
      )
    );
    setTopActivityTimeSpent(stats.type[mostPopularActivity]);
    setSummaryTime(Object.values(stats.type).reduce((a, b) => a + b));
    setPercentile((100 * topActivityTimeSpent) / summaryTime);

    const lastSession = uiControl.getLastSession();
    if (lastSession) {
      setLastActivity(lastSession.activities[0]);
    }
  };

  useEffect(() => {
    if (isFocused) {
      onHomeScrenFocused();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFocused]);

  return (
    <Layout>
      <ScrollView contentContainerStyle={styles.defaultPadding}>
        <UserCard
          name={`${user?.name} ${user?.surname}`}
          title={`Master of ${mostPopularActivity}`}
        />

        {uiControl.getCaloriesDailyChart()?.data.length !== 0 ? (
          <ActivityLineChart
            data={
              // @ts-ignore
              uiControl.getCaloriesDailyChart().data
            }
          />
        ) : (
          <ActivityLineChart
            data={DEFAULT_HOME_PLOT_DATA}
            subtitle="Calories burned last week"
            selectedValueSubText="kcal"
          />
        )}

        <View style={[styles.cardRow, styles.overflowVisible]}>
          <View
            style={[
              styles.cardColumn,
              styles.leftColumn,
              styles.overflowVisible,
            ]}
          >
            <DataCardLarge
              Icon={StepsIcon}
              name={'Repeats'}
              quantity={uiControl.getTotalRepeats()}
            />
            <DataCardLarge
              Icon={CaloriesIcon}
              name="Calories"
              quantity={uiControl.getTotalCalories().toFixed(2)}
            />
          </View>
          <View style={[styles.cardColumn, styles.rightColumn]}>
            <View style={styles.smallCardRow}>
              <BluetoothStatus
                touchable
                touchableStyles={styles.bluetoothWrapper}
                renderOverlay
                iconSize={'large'}
              />
              <View style={styles.separator} />
              <DataCardSmall
                data={percentile}
                activity={mostPopularActivity}
                style={styles.activitiesWrapper}
              />
            </View>
            <DataCardLarge
              Icon={TimeIcon}
              name="Hours spent"
              quantity={topActivityTimeSpent.toFixed(2)}
            />
            <View style={styles.separator} />
          </View>
        </View>
        {lastActivity && (
          <View style={styles.bottomCard}>
            <ActivityCardLarge
              activity={lastActivity.type}
              count={lastActivity.repeats}
              time={getTimeDurationFromInterval(lastActivity.interval)}
              kcal={getCaloriesFromActivityMetaAndUserWeight(
                lastActivity,
                user?.weight || 0
              )}
              date={getReadableDateStringFromInterval(lastActivity.interval)}
            />
          </View>
        )}
      </ScrollView>
    </Layout>
  );
};

const styles = StyleSheet.create({
  defaultPadding: {
    padding: 16,
    overflow: 'visible',
  },
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
  bluetoothWrapper: {
    flex: 1,
    width: '50%',
    padding: 0,
  },
  activitiesWrapper: {
    width: '50%',
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
    marginLeft: -4,
  },
  smallCardRow: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  separator: {
    width: 8,
  },
  bottomCard: {
    marginVertical: 12,
  },
  overflowVisible: {
    overflow: 'visible',
  },
});
