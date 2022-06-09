import { Icon, Text, useTheme } from '@ui-kitten/components';
import React from 'react';
import { TouchableOpacity, StyleSheet, View } from 'react-native';
import { useSelector } from 'react-redux';
import { commonStyles } from '../../assets/common/styles';
import { RootState } from '../../state/root.reducer';
import DropShadowWrapper from '../gradients/drop-shadow';
import LinearGradientCard from '../gradients/linear-gradient-card';
import { Themes } from '../gradients/themes';
import * as RootNavigation from '../navigation/root-navigation';

interface Props {
  iconSize?: 'large' | 'medium' | 'small';
  touchable?: boolean;
  renderOverlay?: boolean;
  touchableStyles?: any;
}

export const BluetoothStatus: React.FC<Props> = ({
  touchable,
  touchableStyles,
  iconSize,
  renderOverlay,
}) => {
  const isConnectedWithDevice = useSelector((state: RootState) =>
    Boolean(state.app.connectedDevice)
  );

  const theme: Themes = isConnectedWithDevice ? 'success' : 'danger';
  const uiTheme = useTheme();
  const borderColor = isConnectedWithDevice
    ? uiTheme['color-success-300']
    : uiTheme['color-danger-300'];

  const handleBluetoothStatusPress = () =>
    RootNavigation.navigate('BluetoothConnection');

  let Body = (
    <Icon
      name="bluetooth-outline"
      style={iconStyles[iconSize || 'medium']}
      fill={
        isConnectedWithDevice
          ? uiTheme['color-success-default']
          : uiTheme['color-danger-default']
      }
    />
  );

  if (renderOverlay) {
    Body = (
      <DropShadowWrapper
        style={{ height: 80, padding: 0 }}
        shadowColorTheme={theme}
      >
        <View
          style={[
            styles.container,
            commonStyles.defaultBorder,
            {
              borderWidth: 2,
              borderColor,
            },
          ]}
        >
          {Body}
        </View>
      </DropShadowWrapper>
    );
  }

  if (touchable) {
    Body = (
      <TouchableOpacity
        style={[touchableStyles, styles.touchableBaseStyle]}
        onPress={handleBluetoothStatusPress}
      >
        {Body}
      </TouchableOpacity>
    );
  }

  return Body;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  smallText: {
    fontSize: 12,
    textAlign: 'center',
  },
  touchableBaseStyle: {
    overflow: 'visible',
  },
});

const iconStyles = StyleSheet.create({
  large: {
    height: 28,
    width: 28,
  },
  medium: {
    height: 24,
    width: 24,
  },
  small: {
    height: 21,
    width: 21,
  },
});
