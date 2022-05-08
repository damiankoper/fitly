import { Text } from '@ui-kitten/components';
import React from 'react';
import { StyleSheet, View } from 'react-native';

interface Props {
  seconds: number;
  minutes: number;
}

export const Timer: React.FC<Props> = ({ seconds, minutes }) => {
  return (
    <View style={styles.container}>
      <Text category="h3" style={styles.text}>
        {minutes < 10 ? `0${minutes}` : minutes }:{seconds < 10 ? `0${seconds}` : seconds}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {

  },
  text: {},
});
