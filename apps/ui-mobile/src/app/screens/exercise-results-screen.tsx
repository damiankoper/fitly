import React from 'react';
import { Layout } from '@ui-kitten/components';
import { ActivityCardResults } from '../components/cards/activity-card-results';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { BottomTabParamList } from '../interfaces/BottomTabParamList';
import { StyleSheet, View } from 'react-native';
import ActivityLineChart from '../components/charts/ActivityLineChart';
import { DataCardLarge } from '../components/cards/data-card-large';
import { ActivityIcon, CaloriesIcon, StepsIcon, TimeIcon } from './home-screen';
import uiControl from '../data';
import { DateTime, Interval } from 'luxon';
import { getTimeDurationFromInterval } from './history-screen';

function getPace(repeats: number, interval: Interval): number {
  const minutes = interval.toDuration().shiftTo('minutes').minutes;
  return repeats / minutes;
}

type NavProps = BottomTabScreenProps<
  BottomTabParamList,
  'ExerciseResultsScreen'
>;

export const ExerciseResultsScreen: React.FC<NavProps> = ({ route }) => {
  const { activitySession } = route.params;
  const { activities, interval } = activitySession;
  const firstActivity = activities[0];
  const sessionSummary = uiControl.getSessionSummary(activitySession);
  const { data } = uiControl.getSessionPaceChart(activitySession);

  return (
    <Layout style={styles.layout}>
      <View style={styles.resultsWrapper}>
        <ActivityCardResults
          activity={firstActivity.type}
          subtitle={interval.start.toLocaleString(DateTime.DATETIME_SHORT, {
            locale: 'pl',
          })}
        />
      </View>
      <View>
        <ActivityLineChart
          data={data}
          granulity="minutes"
          subtitle="Calories burnt during workout overtime"
          selectedValueSubText="kcal"
          lineColor="#9CDE30"
          interval={activitySession.interval}
        />
      </View>
      <View style={styles.cardRow}>
        <View style={[styles.cardColumn, styles.leftColumn]}>
          <DataCardLarge
            Icon={StepsIcon}
            name={'Repeats'}
            quantity={sessionSummary?.repeats || 0}
          />
          <DataCardLarge
            Icon={CaloriesIcon}
            name="Calories"
            quantity={sessionSummary?.calories.toFixed(0) || 0}
          />
        </View>
        <View style={[styles.cardColumn, styles.rightColumn]}>
          <DataCardLarge
            Icon={ActivityIcon}
            name={'rep/min'}
            quantity={getPace(sessionSummary?.repeats || 1, interval).toFixed(
              2
            )}
          />
          <DataCardLarge
            Icon={TimeIcon}
            name="duration"
            quantity={getTimeDurationFromInterval(interval)}
          />
        </View>
      </View>
    </Layout>
  );
};

const styles = StyleSheet.create({
  layout: {
    overflow: 'visible',
    backgroundColor: 'white',
    height: '100%',
  },
  buttonGroup: {
    justifyContent: 'center',
    width: '',
  },
  resultsWrapper: {
    marginBottom: 20,
  },
  cardDeafultWidth: {
    width: '50%',
  },
  cardRow: {
    flexDirection: 'row',
    flex: 1,
    height: 170,
  },
  leftColumn: {
    marginRight: 4,
  },
  rightColumn: {
    marginLeft: 4,
  },
  cardColumn: {
    flex: 1,
    height: 170,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  dateContainer: {
    marginLeft: 16,
    marginBottom: 2,
  },
  dateText: {
    fontFamily: 'Roboto-Regular',
    fontSize: 16,
    color: '#aaa',
  },
});
