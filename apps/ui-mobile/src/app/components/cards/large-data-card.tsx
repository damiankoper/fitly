import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from '@ui-kitten/components';

interface Props {
  quantity: number;
  name: string;
  Icon: React.FC;
}

export const BigStatsCard: React.FC<Props> = ({ Icon, name, quantity }) => {
  return (
    <View style={styles.container}>
      <Icon />
      <View style={styles.column}>
        <Text style={styles.quantityText}>{quantity}</Text>
        <Text style={styles.text}>{name}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 4,
    borderColor: 'lightgray',
    borderWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    height: 80,
  },
  column: {
    flexDirection: 'column',
    justifyContent: 'center',
  },
  quantityText: {
    fontSize: 20,
    fontWeight: '700',
  },
  text: {
    fontSize: 12,
    textAlign: 'center',
  },
});
