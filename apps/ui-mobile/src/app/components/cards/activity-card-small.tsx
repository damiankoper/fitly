import React from 'react';
import { StyleSheet, View } from 'react-native';
import { ActivityIcon } from '../icons/activity-icon';
import { Text } from '@ui-kitten/components';
import { commonStyles } from '../../assets/common/styles';
import { ActivityType } from '@fitly/shared/meta';

interface Props {
  activity: ActivityType;
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
