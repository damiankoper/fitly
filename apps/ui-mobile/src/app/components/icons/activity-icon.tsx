import { Icon, useTheme } from '@ui-kitten/components';
import React from 'react';
import { View, StyleSheet } from 'react-native';

interface Props {
  iconName: string;
}

export const ActivityIcon: React.FC<Props> = ({ iconName }) => {
  const theme = useTheme();

  return (
    <View style={[styles.container, { borderColor: theme['color-info-300'] }]}>
      <Icon name={iconName} fill="000" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 5,
    width: 44,
    height: 44,
    borderRadius: 44 / 2,
  },
});
