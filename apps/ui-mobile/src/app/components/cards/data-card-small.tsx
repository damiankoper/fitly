import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from '@ui-kitten/components';
import { commonStyles } from '../../assets/common/styles';

interface Props {
  data: string;
  activity: string;
}

export const DataCardSmall: React.FC<Props> = ({ data, activity }) => {
  return (
    <View style={[commonStyles.defaultBorder, styles.container]}>
      <Text style={styles.data}>
        {data}
        <Text style={styles.procent}>%</Text>
      </Text>
      <Text style={styles.smallText}>
        of activities is{' '}
        <Text style={styles.smallText} status="primary">
          {activity}
        </Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 12,
  },
  data: {
    fontSize: 20,
    fontWeight: '700',
  },
  smallText: {
    fontSize: 12,
    textAlign: 'center',
  },
  procent: {
    fontSize: 20,
  },
});
