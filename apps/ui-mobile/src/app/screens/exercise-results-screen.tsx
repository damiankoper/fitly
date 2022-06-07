import React, { useEffect, useState } from 'react';
import { Button, ButtonGroup, Layout, Text } from '@ui-kitten/components';
import { ActivityCardResults } from '../components/cards/activity-card-results';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { BottomTabParamList } from '../interfaces/BottomTabParamList';
import { StyleSheet, View } from 'react-native';
import LoadingScreen from '../components/loading-screen/LoadingScreen';
import ActivityLineChart from '../components/charts/ActivityLineChart';
import { ChartDataType } from '@fitly/shared/meta';
import { DataCardLarge } from '../components/cards/data-card-large';
import { ActivityIcon, CaloriesIcon, StepsIcon, TimeIcon } from './home-screen';
import uiControl from '../data';
import { ActivityCardSmall } from '../components/cards/activity-card-small';

type NavProps = BottomTabScreenProps<
  BottomTabParamList,
  'ExerciseResultsScreen'
>;

export const ExerciseResultsScreen: React.FC<NavProps> = ({ route }) => {
  const { activity } = route.params;

  const dataRow: ChartDataType = { date: new Date(), value: 25 };
  const data: ChartDataType[] = [1, 2, 3, 4, 5, 6, 7].map((x) => dataRow);

  return (
    <Layout>
      <View style={styles.resultsWrapper}>
        <ActivityCardResults activity={activity} />
      </View>
      <View>
        <View>
          <ActivityLineChart
            data={data}
            subtitle="Calories burnt during workout"
            selectedValueSubText="kcal"
            lineColor="#9CDE30"
          />
        </View>
      </View>
      <View style={styles.cardRow}>
        <View style={[styles.cardColumn, styles.leftColumn]}>
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
          <DataCardLarge
            Icon={ActivityIcon}
            name={'Repeats'}
            quantity={uiControl.getTotalRepeats()}
          />
          <DataCardLarge
            Icon={TimeIcon}
            name="Calories"
            quantity={uiControl.getTotalCalories().toFixed(2)}
          />
        </View>
      </View>
    </Layout>
  );
};

const styles = StyleSheet.create({
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
});
