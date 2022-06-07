import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { ActivityIcon } from '../icons/activity-icon';
import { ActivityType } from '@fitly/shared/meta';
import { formatActivityString } from '../../common/utils';

interface Props {
  activity: ActivityType;
  subtitle?: string;
  color?: 'black' | 'white';
}

export const ActivityCardSmall: React.FC<Props> = ({
  activity,
  subtitle,
  color,
}) => {
  const formattedActivity = formatActivityString(activity);
  return (
    <View style={styles.container}>
      <ActivityIcon activity={activity} shadow />
      <View style={styles.textContainer}>
        <Text style={[styles.text, { color: color || 'black' }]}>
          {formattedActivity}
        </Text>
        {subtitle && (
          <Text style={[styles.subtitle, { color }]}>{subtitle}</Text>
        )}
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flexWrap: 'nowrap',
    width: '100%',
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    flexDirection: 'row',
  },
  textContainer: {
    marginLeft: 16,
  },
  text: {
    fontFamily: 'RobotoSlab-Bold',
    fontSize: 32,
  },
  subtitle: {
    fontSize: 16,
  },
});
