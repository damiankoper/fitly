import { useTheme } from '@ui-kitten/components';
import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { EXERCISES_ENUM, EXERCISES_DATA } from '../../config';

interface Props {
  activity: EXERCISES_ENUM;
}

export const ActivityIcon: React.FC<Props> = ({ activity }) => {
  const theme = useTheme();

  return (
    <View style={[styles.container, { borderColor: theme['color-info-300'] }]}>
      <Image style={styles.image} source={EXERCISES_DATA[activity].icon} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 5,
    width: 44,
    height: 44,
    borderRadius: 44 / 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 28,
    height: 28,
  },
});
