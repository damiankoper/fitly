import React from 'react';
import {
  Icon,
  Layout,
  TopNavigation,
  TopNavigationAction,
} from '@ui-kitten/components';
import { ImageProps, StyleSheet, TouchableOpacity } from 'react-native';
import { RenderProp } from '@ui-kitten/components/devsupport';
import { BluetoothStatus } from '../icons/bluetooth-status';
import * as RootNavigation from '../navigation/root-navigation';

type IconProp = RenderProp<Partial<ImageProps>>;
const PersonIcon: IconProp = (props) => (
  <TouchableOpacity onPress={() => RootNavigation.navigate('Settings')}>
    <Icon {...props} name="person-outline" />
  </TouchableOpacity>
);

export const TopNav = () => {
  const renderRightActions = () => <TopNavigationAction icon={PersonIcon} />;
  const renderLeftActions = () => (
    <TopNavigationAction
      icon={() => <BluetoothStatus touchable iconSize="small" />}
    />
  );

  return (
    <Layout>
      <TopNavigation
        alignment="center"
        title="Fitly"
        style={styles.topnav}
        accessoryLeft={renderLeftActions}
        accessoryRight={renderRightActions}
      />
    </Layout>
  );
};

const styles = StyleSheet.create({
  topnav: {
    borderBottomColor: 'lightgray',
    borderBottomWidth: 1,
  },
});
