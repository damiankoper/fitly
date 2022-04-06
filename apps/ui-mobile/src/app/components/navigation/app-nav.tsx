import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { SettingScreen } from '../../screens/settings-screen';
import { ExerciseScreen } from '../../screens/exercise-screen';
import { GuessScreen } from '../../screens/guess-screen';
import { HomeScreen } from '../../screens/home-screen';
import { HistoryScreen } from '../../screens/history-screen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ProfileScreen } from '../../screens/profile-screen';
import { ServiceModeScreen } from '../../screens/service-mode-screen';
import { BottomNav } from './bottom-nav';
import { Layout } from '@ui-kitten/components';
import { StyleSheet } from 'react-native';
import { NotConnectedScreen } from '../../screens/not-connected-screen';
import { NoPreviousActivityScreen } from '../../screens/no-previous-activity-screen';

const { Navigator, Screen } = createBottomTabNavigator();

const wrapScreen = (Component) => (props) => {
  return (
    <Layout style={styles.wrapper}>
      <Component {...props} />
    </Layout>
  );
};

const TabNavigator = () => (
  <Navigator
    tabBar={(props) => <BottomNav {...props} />}
    screenOptions={{
      headerShown: false,
    }}
  >
    <Screen name="Home" component={wrapScreen(NoPreviousActivityScreen)} />
    <Screen name="Exercise" component={wrapScreen(ExerciseScreen)} />
    <Screen name="Guess" component={wrapScreen(GuessScreen)} />
    <Screen name="History" component={wrapScreen(HistoryScreen)} />
    <Screen name="Settings" component={wrapScreen(SettingScreen)} />
    <Screen name="Profile" component={wrapScreen(ProfileScreen)} />
    <Screen name="Service" component={wrapScreen(ServiceModeScreen)} />
  </Navigator>
);

export const AppNavigator = () => (
  <NavigationContainer>
    <TabNavigator />
  </NavigationContainer>
);

const styles = StyleSheet.create({
  wrapper: {
    padding: 8,
    flex: 1,
  },
});
