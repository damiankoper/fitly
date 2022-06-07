import { ActivityType } from '@fitly/shared/meta';
import { useTheme } from '@ui-kitten/components';
import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { ActivityIcons } from '../../assets/common/activity-icons';
import DropShadowWrapper from '../gradients/drop-shadow';

interface Props {
  activity: ActivityType;
  large?: boolean;
  shadow?: boolean;
  color?: string;
}

export const ActivityIcon: React.FC<Props> = ({
  activity,
  large,
  color,
  shadow,
}) => {
  const theme = useTheme();

  function wrapShadow(component: any) {
    if (shadow) return <DropShadowWrapper>{component}</DropShadowWrapper>;
    else return component;
  }

  return wrapShadow(
    <View
      style={[
        large ? styles.largeContainer : styles.container,
        {
          backgroundColor: color ? theme[color] : theme['color-basic-200'],
        },
      ]}
    >
      <Image
        style={large ? styles.largeImage : styles.image}
        source={ActivityIcons[activity]}
      />
    </View>
  );
};

const size = 64;
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    width: size,
    height: size,
    borderRadius: 20,
  },
  largeContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 2 * size,
    height: 2 * size,
    borderRadius: 20,
  },
  image: {
    width: size - 8,
    height: size - 8,
  },
  largeImage: {
    width: 2 * size - 8,
    height: 2 * size - 8,
  },
});
