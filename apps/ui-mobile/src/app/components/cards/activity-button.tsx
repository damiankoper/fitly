import React from 'react';
import { StyleSheet, TouchableOpacity, View, Text } from 'react-native';
import { ActivityIcon } from '../icons/activity-icon';
import { commonStyles } from '../../assets/common/styles';
import { ActivityType } from '@fitly/shared/meta';
import { formatActivityString } from '../../common/utils';
import DropShadowWrapper from '../gradients/drop-shadow';
import { useTheme } from '@ui-kitten/components';

interface Props {
  activity: ActivityType;
  subtitle?: string;
  onPress?: () => void;
}

export const ActivityButton: React.FC<Props> = ({
  activity,
  onPress,
  subtitle,
}) => {
  const formattedActivity = formatActivityString(activity);
  const uTheme = useTheme();
  return (
    <DropShadowWrapper>
      <TouchableOpacity style={[commonStyles.defaultBorder]} onPress={onPress}>
        <View
          style={[
            styles.container,
            { backgroundColor: uTheme['color-primary-300'] },
          ]}
        >
          <ActivityIcon activity={activity} />
          <Text style={styles.text}>{formattedActivity}</Text>
          {subtitle && <Text style={styles.text}>{subtitle}</Text>}
        </View>
      </TouchableOpacity>
    </DropShadowWrapper>
  );
};
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    borderRadius: 20,
    padding: 12,
    height: '100%',
    justifyContent: 'center',
  },
  text: {
    fontFamily: 'Roboto-Bold',
    fontSize: 24,
    color: 'white',
    textAlign: 'center',
  },
});
