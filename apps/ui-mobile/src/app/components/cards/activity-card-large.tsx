import React from 'react';
import { StyleSheet, View } from 'react-native';
import { ActivityIcon } from '../icons/activity-icon';
import { Text, useTheme } from '@ui-kitten/components';
import { commonStyles } from '../../assets/common/styles';
import { ActivityType } from '@fitly/shared/meta';
import { ActivityNames } from '../../assets/common/activity-names';

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
  const theme = useTheme();

  return (
    <View style={[commonStyles.defaultBorder, styles.container]}>
      <View style={styles.leftColumn}>
        <ActivityIcon activity={activity} />
        <Text category="h4">{ActivityNames[activity]}</Text>
        <Text>Last activity</Text>
      </View>
      <View style={styles.rightColumn}>
        <View style={styles.infoRow}>
          <View style={styles.exerciseData}>
            <Text category="h5">{count}</Text>
            <Text>Count</Text>
          </View>
          <View style={styles.exerciseData}>
            <Text category="h5">{time}</Text>
            <Text>Time</Text>
          </View>
          <View style={styles.exerciseData}>
            <Text category="h5">{kcal}</Text>
            <Text>kcal</Text>
          </View>
        </View>
      </View>
      <Text
        style={[
          { backgroundColor: theme['color-primary-default'] },
          styles.dateText,
        ]}
      >
        {date}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 16,
  },
  leftColumn: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 30,
  },
  rightColumn: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dateText: {
    color: 'white',
    padding: 4,
    borderRadius: 4,
    fontSize: 10,

    position: 'absolute',
    right: 8,
    top: 8,
  },
  infoRow: {
    alignSelf: 'stretch',
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
  },
  exerciseData: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
