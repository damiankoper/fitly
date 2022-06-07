import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, useTheme } from '@ui-kitten/components';
import { commonStyles } from '../../assets/common/styles';
import DropShadowWrapper from '../gradients/drop-shadow';

interface Props {
  quantity: number | string;
  name: string;
  Icon: React.FC;
  borderColor?: string;
}

export const DataCardLarge: React.FC<Props> = ({
  Icon,
  name,
  quantity,
  borderColor,
}) => {
  const theme = useTheme();
  return (
    <DropShadowWrapper>
      <View
        style={[
          commonStyles.defaultBorder,
          styles.container,
          { borderColor: (borderColor && theme[borderColor]) || 'white' },
        ]}
      >
        <Icon />
        <View style={styles.column}>
          <Text style={styles.quantityText}>{quantity}</Text>
          <Text style={styles.text}>{name}</Text>
        </View>
      </View>
    </DropShadowWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    height: 80,
    backgroundColor: 'white',
    borderWidth: 2,
  },
  column: {
    flexDirection: 'column',
    justifyContent: 'center',
  },
  quantityText: {
    fontSize: 20,
    textAlign: 'right',
    fontWeight: '700',
  },
  text: {
    fontSize: 14,
    lineHeight: 14,
    color: '#A1A1A1',
    fontFamily: 'Roboto-Light',
    textAlign: 'right',
  },
});
