import { ActivityType } from '@fitly/shared/meta';
import { useTheme } from '@ui-kitten/components';
import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { ActivityIcons } from '../../assets/common/activity-icons';

interface Props {
  activity: ActivityType;
  large?: Boolean;
}

export const ActivityIcon: React.FC<Props> = ({ activity, large }) => {
  const theme = useTheme();

  return (
    <View
      style={[
        large ? styles.largeContainer : styles.container,
        { borderColor: theme['color-info-300'] },
      ]}
    >
      <Image
        style={large ? styles.largeImage : styles.image}
        source={ActivityIcons[activity]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 5,
    width: 44,
    height: 44,
    borderRadius: 44 / 2,
  },
  largeContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 5,
    width: 88,
    height: 88,
    borderRadius: 88 / 2,
  },
  image: {
    width: 28,
    height: 28,
  },
  largeImage: {
    width: 56,
    height: 56,
  },
});
