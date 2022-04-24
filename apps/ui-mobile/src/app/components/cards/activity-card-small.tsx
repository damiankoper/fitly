import React from 'react';
import { StyleSheet, View } from 'react-native';
import { ActivityIcon } from '../icons/activity-icon';
import { Text } from '@ui-kitten/components';
import { EXERCISES_ENUM } from '../../config';
import { commonStyles } from '../../assets/common/styles';

interface Props {
  activity: EXERCISES_ENUM;
}

export const ActivityCardSmall: React.FC<Props> = ({ activity }) => {
  return (
    <View style={[commonStyles.defaultBorder, styles.container]}>
      <ActivityIcon activity={activity} />
      <Text category="h6" style={styles.activityTitle}>
        {activity}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 16,
  },
  activityTitle: {
    marginLeft: 16,
  },
});
