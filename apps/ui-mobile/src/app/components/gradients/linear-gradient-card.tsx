import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

export interface LinearGradientCardProps {
  x?: number;
  y?: number;
  style: StyleProp<ViewStyle>;
  theme?: 'primary' | 'red';
}

const LinearGradientCard: React.FC<LinearGradientCardProps> = ({
  x,
  y,
  style,
  children,
  theme,
}) => {
  let colors;
  switch (theme) {
    case 'red':
      colors = ['#FFFDFD', '#FFECED'];
      break;

    case 'primary':
    default:
      colors = ['#FDFEFF', '#F1F5FF'];
      break;
  }

  return (
    <LinearGradient
      locations={[0, 1]}
      colors={colors}
      start={{ x: x || 0.38, y: y || 0.5 }}
      style={style}
    >
      {children}
    </LinearGradient>
  );
};

export default LinearGradientCard;
