import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { ActivityIcon } from '../icons/activity-icon';
import { Text } from '@ui-kitten/components';
import { commonStyles } from '../../assets/common/styles';
import { ActivityType } from '@fitly/shared/meta';
import { useActivityString } from '../../hooks/useActivityString';

interface Props {
  activity: ActivityType;
  onPress: () => void;
}

export const ActivityCardSmall: React.FC<Props> = ({ activity, onPress }) => {
  const formattedActivity = useActivityString(activity);

  return (
    <TouchableOpacity style={[commonStyles.defaultBorder, styles.container]} onPress={onPress}>
      <ActivityIcon activity={activity} />
      <Text category="h6" style={styles.activityTitle}>
        {formattedActivity}
      </Text>
    </TouchableOpacity>
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
