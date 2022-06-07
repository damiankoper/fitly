import React, { useEffect, useState } from 'react';
import { Button, ButtonGroup, Layout, Text } from '@ui-kitten/components';
import { ActivityCardResults } from '../components/cards/activity-card-results';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { BottomTabParamList } from '../interfaces/BottomTabParamList';
import { StyleSheet, View } from 'react-native';
import LoadingScreen from '../components/loading-screen/LoadingScreen';
import ActivityLineChart from '../components/charts/ActivityLineChart';
import { ActivitySession, ChartData, ChartDataType } from '@fitly/shared/meta';
import { DataCardLarge } from '../components/cards/data-card-large';
import { ActivityIcon, CaloriesIcon, StepsIcon, TimeIcon } from './home-screen';
import uiControl from '../data';
import { ActivityCardSmall } from '../components/cards/activity-card-small';
import { Interval } from 'luxon';
import { getTimeDurationFromInterval } from './history-screen';

export function prettyPrintDateString(date: Date): string {
  return date.toLocaleString('pl', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
}

function getPace(repeats: number, interval: Interval): number {
  const minutes = interval.toDuration().shiftTo('minutes').minutes;
  return minutes / repeats;
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
      <View style={styles.dateContainer}>
        <Text style={styles.dateText}>
          {prettyPrintDateString(interval.start.toJSDate())}
        </Text>
      </View>
      <View style={styles.resultsWrapper}>
        <ActivityCardResults activity={firstActivity.type} />
      </View>
      <View>
        <ActivityLineChart
          data={data}
          granulity="minutes"
          subtitle="Calories burnt during workout"
          selectedValueSubText="kcal"
          lineColor="#9CDE30"
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
            quantity={sessionSummary?.calories || 0}
          />
        </View>
        <View style={[styles.cardColumn, styles.rightColumn]}>
          <DataCardLarge
            Icon={ActivityIcon}
            name={'min/rep'}
            quantity={getPace(sessionSummary?.repeats || 1, interval).toFixed(
              2
            )}
          />
          <DataCardLarge
            Icon={TimeIcon}
            name="Time"
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
    padding: 16,
  },
  buttonGroup: {
    justifyContent: 'center',
    width: '',
  },
  resultsWrapper: {
    marginBottom: 20,
  },
  dataContainer: {
    flex: 1,
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
