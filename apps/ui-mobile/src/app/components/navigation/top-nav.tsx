import React from 'react';
import {
  Icon,
  Layout,
  MenuItem,
  OverflowMenu,
  TopNavigation,
  TopNavigationAction,
} from '@ui-kitten/components';
import { StyleSheet } from 'react-native';

const PeronIcon = (props) => <Icon {...props} name="person-outline" />;

export const TopNav = () => {
  const renderRightActions = () => (
    <>
      <TopNavigationAction icon={PeronIcon} />
    </>
  );

  return (
    <Layout>
      <TopNavigation
        alignment="center"
        title="Fitly"
        style={styles.topnav}
        accessoryRight={renderRightActions}
      />
    </Layout>
  );
};

const styles = StyleSheet.create({
  topnav: {
    borderBottomColor: 'lightgray',
    borderBottomWidth: 1,
    marginBottom: 4,
  },
});
