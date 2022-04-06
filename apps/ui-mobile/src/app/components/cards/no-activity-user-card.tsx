import { Text } from '@ui-kitten/components';
import React from 'react';
import { StyleSheet, Image, View } from 'react-native';

interface Props {
  name: string;
}

export const NoActivityUserCard: React.FC<Props> = ({ name }) => {
  return (
    <View style={styles.container}>
      <Image source={require('../../assets/images/user-avatar.png')} />
      <Text style={styles.name}>{name}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    borderRadius: 4,
    borderColor: 'lightgray',
    borderWidth: 1,
  },
  name: {
    fontSize: 20,
    fontWeight: '700',
  },
});
