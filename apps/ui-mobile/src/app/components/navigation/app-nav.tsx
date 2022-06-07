import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { SettingScreen } from '../../screens/settings-screen';
import { ExerciseScreen } from '../../screens/exercise-screen';
import { HomeScreen } from '../../screens/home-screen';
import { HistoryScreen } from '../../screens/history-screen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ServiceModeScreen } from '../../screens/service-mode-screen';
import { BottomNav } from './bottom-nav';
import { Layout } from '@ui-kitten/components';
import { ScrollView, StyleSheet, View } from 'react-native';
import BluetoothConnectionScreen from '../../screens/bluetooth-connection-screen';
import { NotConnectedScreen } from '../../screens/home-not-connected-screen';
import { NoPreviousActivityScreen } from '../../screens/home-no-previous-activity-screen';
import { ExerciseCounterScreen } from '../../screens/exercise-counter-screen';
import { MetaWearProps } from '../../App';
import { BottomTabParamList } from '../../interfaces/BottomTabParamList';
import { ExerciseResultsScreen } from '../../screens/exercise-results-screen';
import * as RootNavigation from './root-navigation';
import { ActivityType } from '@fitly/shared/meta';
import { ProfileScreen } from '../../screens/profile-screen';

const { Navigator, Screen } = createBottomTabNavigator<BottomTabParamList>();

function wrapScroll(Component: any, outerProps: MetaWearProps) {
  return (props: MetaWearProps) => {
    return (
      <ScrollView
        style={styles.wrapper}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <View style={{ padding: 16 }}>
          <Component {...props} {...outerProps} />
        </View>
      </ScrollView>
    );
  };
}

function wrapScreen(Component: any, outerProps: MetaWearProps) {
  return (props: MetaWearProps) => {
    return (
      <Layout style={[styles.wrapper, { padding: 16 }]}>
        <Component {...props} {...outerProps} />
      </Layout>
    );
  };
}

const TabNavigator = (props: MetaWearProps) => (
  <Navigator
    tabBar={(props) => <BottomNav {...props} />}
    initialRouteName="Home"
    backBehavior="history"
    screenOptions={{
      headerShown: false,
    }}
  >
    <Screen name="Home" component={HomeScreen} />
    <Screen name="Exercise" component={wrapScroll(ExerciseScreen, props)} />
    <Screen
      name="Guess"
      component={wrapScreen(ExerciseCounterScreen, props)}
      initialParams={{
        activity: ActivityType.UNKNOWN,
      }}
    />
    <Screen name="History" component={wrapScroll(HistoryScreen, props)} />
    <Screen name="Settings" component={wrapScroll(SettingScreen, props)} />
    <Screen name="Profile" component={wrapScroll(ProfileScreen, props)} />
    <Screen name="Service" component={wrapScroll(ServiceModeScreen, props)} />
    <Screen
      name="BluetoothConnection"
      component={wrapScreen(BluetoothConnectionScreen, props)}
    />
    <Screen
      name="NotConnectedScreen"
      component={wrapScroll(NotConnectedScreen, props)}
    />
    <Screen
      name="NoPreviousActivityScreen"
      component={wrapScroll(NoPreviousActivityScreen, props)}
    />
    <Screen
      name="ExerciseCounterScreen"
      component={wrapScreen(ExerciseCounterScreen, props)}
    />
    <Screen name="ExerciseResultsScreen" component={ExerciseResultsScreen} />
  </Navigator>
);

export const AppNav = (props: MetaWearProps) => (
  <NavigationContainer ref={RootNavigation.navigationRef}>
    <TabNavigator {...props} />
  </NavigationContainer>
);

const styles = StyleSheet.create({
  wrapper: {
    padding: 0,
    flex: 1,
    backgroundColor: 'white',
  },
});
