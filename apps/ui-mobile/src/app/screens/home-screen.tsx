import { Icon, Layout, useTheme } from '@ui-kitten/components';
import React, { useEffect, useState } from 'react';
import { UserCard } from '../components/cards/user-card';
import { StyleSheet, View, ScrollView } from 'react-native';
import { DataCardLarge } from '../components/cards/data-card-large';
import { BluetoothStatus } from '../components/icons/bluetooth-status';
import { DataCardSmall } from '../components/cards/data-card-small';
import { ActivityCardLarge } from '../components/cards/activity-card-large';
import {
  ActivitySession,
  ActivitySummary,
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
import { DEFAULT_HOME_PLOT_DATA, formatActivityString } from '../common/utils';
import uiControl from '../data';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { BottomTabParamList } from '../interfaces/BottomTabParamList';
import ActivitySessionSummaryCard from '../components/cards/activity-session-summary-card';

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

type NavProps = BottomTabScreenProps<BottomTabParamList, 'Home'>;

export const HomeScreen: React.FC<NavProps> = ({ navigation }) => {
  const isFocused = useIsFocused();
  const [user, setUser] = useState<User>(uiControl.getUser());
  const [lastSession, setLastSession] = useState<ActivitySession | null>(null);
  const [mostPopularActivity, setMostPopularActivity] = useState(
    getMostPopularActivity
  );
  const [percentile, setPercentile] = useState(getPercentile);
  const [summaryTime, setSummaryTime] = useState(getSummaryTime);

  function getMostPopularActivity(): string {
    const stats = uiControl.getTimeStats();
    return Object.keys(stats).reduce((a, b) => (stats[a] > stats[b] ? a : b));
  }
  function getActivityTimeSpent(): number {
    const stats = uiControl.getTimeStats();
    return stats[mostPopularActivity];
  }
  function getSummaryTime(): number {
    const stats = uiControl.getTimeStats();
    return Object.values(stats).reduce((a, b) => a + b);
  }
  function getPercentile(): number {
    return (100 * getActivityTimeSpent()) / getSummaryTime();
  }

  function onHomeScrenFocused() {
    setUser(uiControl.getUser());
    setMostPopularActivity(getMostPopularActivity());
    setPercentile(getPercentile());
    setSummaryTime(getSummaryTime());
    const lastSession = uiControl.getLastSession();
    setLastSession(lastSession);
  }

  useEffect(() => {
    if (isFocused) onHomeScrenFocused();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFocused]);

  const formattedActivity = formatActivityString(mostPopularActivity, false);
  return (
    <Layout>
      <ScrollView contentContainerStyle={styles.defaultPadding}>
        <UserCard
          name={`${user?.name} ${user?.surname}`}
          title={`Master of ${formattedActivity}`}
        />

        {/*   {uiControl.getCaloriesDailyChart()?.data.length !== 0 ? (
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
        )} */}

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
              name={'repeats'}
              quantity={uiControl.getTotalRepeats()}
            />
            <DataCardLarge
              Icon={CaloriesIcon}
              name="kcal burned"
              quantity={uiControl.getTotalCalories().toFixed(0)}
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
                data={percentile.toFixed(0)}
                activity={mostPopularActivity}
                style={styles.activitiesWrapper}
              />
            </View>
            <DataCardLarge
              Icon={TimeIcon}
              name="exercising"
              quantity={summaryTime.toFixed(2) + 'h'}
            />
            <View style={styles.separator} />
          </View>
        </View>
        {lastSession && (
          <View style={styles.bottomCard}>
            <ActivitySessionSummaryCard
              activitySession={lastSession}
              subtitle="Last activity"
              onPress={() =>
                navigation.navigate('ExerciseResultsScreen', {
                  activitySession: lastSession,
                })
              }
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
