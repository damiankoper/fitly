import { useTheme } from '@ui-kitten/components';
import React from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { ActivityType } from '@fitly/shared/meta';
import { ActivityIcons } from '../../assets/common/activity-icons';
import { VariousIcons } from '../../assets/common/various-icons';

interface Props {
  activity?: ActivityType;
}

export const GuessSpinner: React.FC<Props> = ({ activity }) => {
  const theme = useTheme();

  return (
    <View style={[styles.container, { borderColor: theme['color-info-400'] }]}>
      <Image
        style={styles.image}
        source={activity ? ActivityIcons[activity] : VariousIcons['questionMark']}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 20,
    width: 250,
    height: 250,
    borderRadius: 250 / 2,
  },
  text: {
    fontSize: 64,
  },
  image: {
    width: 120,
    height: 120,
  },
});
