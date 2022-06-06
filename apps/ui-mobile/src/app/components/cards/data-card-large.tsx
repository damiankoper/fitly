import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from '@ui-kitten/components';
import { commonStyles } from '../../assets/common/styles';
import LinearGradientCard, {
  LinearGradientCardProps,
} from '../gradients/linear-gradient-card';
import DropShadowWrapper from '../gradients/drop-shadow';
import { Themes } from '../gradients/themes';

interface Props {
  quantity: number | string;
  name: string;
  Icon: React.FC;
  theme?: Themes;
  nostyle?: boolean;
}

export const DataCardLarge: React.FC<Props> = ({
  Icon,
  name,
  quantity,
  theme,
  nostyle,
}) => {
  if (nostyle) {
    return (
      <View style={[commonStyles.defaultBorder, styles.container]}>
        <Icon />
        <View style={styles.column}>
          <Text style={styles.quantityText}>{quantity}</Text>
          <Text style={styles.text}>{name}</Text>
        </View>
      </View>
    );
  }
  return (
    <DropShadowWrapper
      shadowColorTheme={theme}
      style={[commonStyles.defaultBorder, { padding: 0, height: 80 }]}
    >
      <LinearGradientCard
        theme={theme}
        style={[commonStyles.defaultBorder, { padding: 0, height: 80 }]}
      >
        <View style={[commonStyles.defaultBorder, styles.container]}>
          <Icon />
          <View style={styles.column}>
            <Text style={styles.quantityText}>{quantity}</Text>
            <Text style={styles.text}>{name}</Text>
          </View>
        </View>
      </LinearGradientCard>
    </DropShadowWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
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
    textAlign: 'center',
    fontWeight: '700',
  },
  text: {
    fontSize: 14,
    color: '#A1A1A1',
    fontFamily: 'Roboto-Light',
    textAlign: 'center',
  },
});
