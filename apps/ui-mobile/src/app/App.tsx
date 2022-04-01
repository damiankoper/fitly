import React from 'react';
import { StyleSheet } from 'react-native';
import * as eva from '@eva-design/eva';
import {
  ApplicationProvider,
  IconRegistry,
  Layout,
} from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { BottomNav } from './components/navigation/bottom-nav';

import { ServiceModeScreen } from './screens/service-mode-screen';
import { TopNav } from './components/navigation/top-nav';

export default () => (
  <>
    <IconRegistry icons={EvaIconsPack} />
    <ApplicationProvider {...eva} theme={eva.light}>
      <Layout style={styles.container}>
        <TopNav />
        <Layout style={styles.screenWrapper} level="1">
          <ServiceModeScreen />
        </Layout>
        <BottomNav />
      </Layout>
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
