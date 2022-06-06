import React from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { commonStyles } from '../../assets/common/styles';
import { ActivityType } from '@fitly/shared/meta';
import DropShadowWrapper from '../gradients/drop-shadow';
import { Text as TextUi } from '@ui-kitten/components';
import { ActivityCardSmall } from './activity-card-small';
interface Props {
  activity: ActivityType;
  count: number;
  time: string;
  kcal: number;
  date: string;
}

export const ActivityCardLarge: React.FC<Props> = ({
  activity,
  date,
  count,
  time,
  kcal,
}) => {
  return (
    <DropShadowWrapper>
      <View style={[commonStyles.defaultBorder, styles.container]}>
        <ActivityCardSmall activity={activity} />

        <View style={styles.stats}>
          <View style={styles.infoRow}>
            <View style={styles.exerciseData}>
              <Text style={[styles.valueText, styles.repeatsText]}>
                {count}
              </Text>
              <Text style={[styles.labelText, styles.repeatsText]}>
                repeats
              </Text>
            </View>
            <View style={styles.exerciseData}>
              <Text style={[styles.valueText, styles.timeText]}>{time}</Text>
              <Text style={[styles.labelText, styles.timeText]}>time</Text>
            </View>
            <View style={styles.exerciseData}>
              <Text style={[styles.valueText]}>{kcal}</Text>
              <Text style={[styles.labelText]}>kcal</Text>
            </View>
          </View>
        </View>
        <Text
          style={[
            { backgroundColor: '#3366FF', color: 'white' },
            styles.dateText,
          ]}
        >
          {date}
        </Text>
      </View>
    </DropShadowWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: 'white',
  },
  leftColumn: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  stats: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
  },
  dateText: {
    paddingTop: 4,
    paddingBottom: 4,
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 999,
    fontSize: 10,

    position: 'absolute',
    right: 16,
    top: 16,
  },
  activityTypeText: {
    fontFamily: 'RobotoSlab-Bold',
    fontSize: 28,
    letterSpacing: 1,
    color: 'black',
  },
  lastActivityText: {
    fontFamily: 'Roboto-Light',
    letterSpacing: 1,
    fontSize: 14,
    color: '#a1a1a1',
  },
  infoRow: {
    alignSelf: 'stretch',
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  valueText: {
    fontFamily: 'RobotoSlab-Bold',
    color: 'black',
    letterSpacing: 1,
    fontSize: 24,
  },
  labelText: {
    fontFamily: 'Roboto-Light',
    fontSize: 14,
    letterSpacing: 1,
    color: '#a1a1a1',
  },
  exerciseData: {
    justifyContent: 'center',
    width: 100 / 3 + '%',
  },
  timeText: {
    textAlign: 'center',
  },
  repeatsText: {
    textAlign: 'right',
  },
});
