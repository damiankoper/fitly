import { Icon, Layout, useTheme } from '@ui-kitten/components';
import React, { useEffect, useState } from 'react';
import { UserCard } from '../../components/cards/user-card';
import { StyleSheet, View, ScrollView } from 'react-native';
import { DataCardLarge } from '../../components/cards/data-card-large';
import { BluetoothStatus } from '../../components/icons/bluetooth-status';
import { DataCardSmall } from '../../components/cards/data-card-small';
import { ActivityCardLarge } from '../../components/cards/activity-card-large';
import {
  ActivitySession,
  ActivityTrackingMeta,
  ActivityType,
  User,
} from '@fitly/shared/meta';
import { useIsFocused } from '@react-navigation/native';
import ActivityLineChart from '../../components/charts/ActivityLineChart';
import uiControl from 'apps/ui-mobile/data';
import {
  getCaloriesFromActivityMetaAndUserWeight,
  getReadableDateStringFromInterval,
  getTimeDurationFromInterval,
} from './history-screen';
import { formatActivityString } from '../../common/utils';
import { DEFAULT_HOME_PLOT_DATA } from '../../common/utils';

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

export const HomeScreen: React.FC<{}> = () => {
  const [user, setUser] = useState<User>();
  const isFocused = useIsFocused();
  const [lastActivity, setLastActivity] = useState<ActivityTrackingMeta>();
  const [activities, setActivities] = useState<ActivitySession[] | null>(null);
  const [userWeight, setUserWeight] = useState<number>(0);
  const [allKcal, setAllKcal] = useState<number>(0);
  const [sumTime, setSumTime] = useState<number>(0);
  const [mostPopularActivity, setMostPopularActivity] = useState(
    ActivityType.UNKNOWN
  );
  const [topRepeats, setTopRepeats] = useState<number>(0);
  const [percentile, setPercentile] = useState<number>(0);

  const getStats = (sessions: ActivitySession[] | null) => {
    let summaryTime = 0;
    let summaryKcal = 0;
    setAllKcal(summaryKcal);
    setSumTime(summaryTime);

    if (!sessions) {
      return { summaryTime, summaryKcal };
    }

    for (let i = 0; i < sessions.length; i++) {
      const sessionActivities = sessions[i].activities;
      for (let j = 0; j < sessionActivities.length; j++) {
        summaryKcal += getCaloriesFromActivityMetaAndUserWeight(
          sessions[i].activities[j],
          userWeight
        );
        const millis = sessions[i].activities[j].interval
          .toDuration()
          .toMillis();
        summaryTime += millis;
      }
    }

    // to hours
    summaryTime = summaryTime / (1000 * 60 * 60);

    setAllKcal(summaryKcal);
    setSumTime(summaryTime);

    const { topActivity, repeats, percentile } =
      getMostPopularActivity(sessions);

    setMostPopularActivity(topActivity);
    setTopRepeats(repeats);
    setPercentile(percentile);
  };

  const getMostPopularActivity = (sessions: ActivitySession[] | null) => {
    let topActivity = ActivityType.UNKNOWN;
    let repeats = 0;
    let percentile = 0;
    if (!sessions) {
      return { topActivity, repeats, percentile };
    }

    const counter = [
      { name: ActivityType.UNKNOWN, repeats: 0 },
      { name: ActivityType.SITUPS, repeats: 0 },
      { name: ActivityType.SQUATS, repeats: 0 },
      { name: ActivityType.PUSHUPS, repeats: 0 },
      { name: ActivityType.STAR_JUMPS, repeats: 0 },
    ];

    for (let i = 0; i < sessions.length; i++) {
      const sessionActivities = sessions[i].activities;
      for (let j = 0; j < sessionActivities.length; j++) {
        for (let k = 0; k < counter.length; k++) {
          if (sessionActivities[j].type === counter[k].name) {
            counter[k].repeats += sessionActivities[j].repeats;
          }
        }
      }
    }

    for (let i = 0; i < counter.length; i++) {
      percentile += counter[i].repeats;
      if (counter[i].repeats > repeats) {
        repeats = counter[i].repeats;
        topActivity = counter[i].name;
      }
    }

    percentile = (repeats / percentile) * 100;
    return { topActivity, repeats, percentile };
  };

  const onHomeScrenFocused = async () => {
    setUser(uiControl.getUser()!);
    setActivities(await uiControl.getSessions());
    setUserWeight(uiControl.getUser()?.weight || 0);
    getStats(activities);

    const lastSession = uiControl.getLastSession();
    if (lastSession) {
      setLastActivity(lastSession.activities[0]);
    }
  };

  useEffect(() => {
    if (isFocused) {
      onHomeScrenFocused();
    }
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
              name={formatActivityString(mostPopularActivity)}
              quantity={topRepeats}
              theme="primary"
            />
            <DataCardLarge
              Icon={CaloriesIcon}
              name="Calories"
              quantity={allKcal}
              theme="danger"
            />
          </View>
          <View style={[styles.cardColumn, styles.rightColumn]}>
            <View style={styles.smallCardRow}>
              <BluetoothStatus
                touchable
                touchableStyles={styles.bluetoothWrapper}
                renderOverlay
                renderSubText
                iconSize="large"
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
              quantity={sumTime.toFixed(2)}
              theme="basic"
            />
            <View style={styles.separator} />
          </View>
        </View>
        {lastActivity ? (
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
              theme="primary"
            />
          </View>
        ) : (
          <></>
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
  },
  smallCardRow: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  separator: {
    width: 8,
  },
  bottomCard: {
    marginVertical: 21,
  },
  overflowVisible: {
    overflow: 'visible',
  },
});
