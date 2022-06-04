import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { ActivityIcon } from '../icons/activity-icon';
import { ActivityType } from '@fitly/shared/meta';
import { formatActivityString } from '../../common/utils';
import DropShadowWrapper from '../gradients/drop-shadow';
import { Themes } from '../gradients/themes';
import { useTheme } from '@ui-kitten/components';

interface Props {
  activity: ActivityType;
  subtitle?: string;
  onPress?: () => void;
  theme?: Themes;
}

export const ActivityCardSmall: React.FC<Props> = ({
  activity,
  onPress,
  subtitle,
  theme,
}) => {
  const formattedActivity = formatActivityString(activity);
  return (
    <View style={styles.container}>
      <ActivityIcon activity={activity} shadow />
      <View style={styles.textContainer}>
        <Text style={styles.text}>{formattedActivity}</Text>
        {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flexWrap: 'nowrap',
    width: '100%',
    justifyContent: 'flex-start',
    flexDirection: 'row',
  },
  textContainer: {
    marginLeft: 16,
  },
  text: {
    fontFamily: 'Roboto-Bold',
    fontSize: 32,
    color: 'black',
  },
  subtitle: {
    fontSize: 16,
  },
});
