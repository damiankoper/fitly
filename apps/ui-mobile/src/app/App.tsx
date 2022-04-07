import React from 'react';
import { StyleSheet } from 'react-native';
import * as eva from '@eva-design/eva';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { AppNav } from './components/navigation/app-nav';

import { TopNav } from './components/navigation/top-nav';
import { LogBox } from 'react-native';

LogBox.ignoreLogs([
  "[react-native-gesture-handler] Seems like you're using an old API with gesture components, check out new Gestures system!",
]);

export default () => (
  <>
    <IconRegistry icons={EvaIconsPack} />
    <ApplicationProvider {...eva} theme={eva.light}>
      <TopNav />
      <AppNav />
    </ApplicationProvider>
  </>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  screenWrapper: {
    flex: 1,
    padding: 16,
  },
});
