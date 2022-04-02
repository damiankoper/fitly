import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { SettingScreen } from '../../screens/settings-screen';
import { ExerciseScreen } from '../../screens/exercise-screen';
import { GuessScreen } from '../../screens/guess-screen';
import { HomeScreen } from '../../screens/home-screen';
import { HistoryScreen } from '../../screens/history-screen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { BottomNav } from './bottom-nav';
import { StyleSheet } from 'react-native';

const { Navigator, Screen } = createBottomTabNavigator();

const TabNavigator = () => (
  <Navigator
    tabBar={(props) => <BottomNav {...props} />}
    screenOptions={{
      headerShown: false,
    }}
  >
    <Screen name="Home" component={HomeScreen} />
    <Screen name="Exercise" component={ExerciseScreen} />
    <Screen name="Guess" component={GuessScreen} />
    <Screen name="History" component={HistoryScreen} />
    <Screen name="Settings" component={SettingScreen} />
  </Navigator>
);

export const AppNavigator = () => (
  <NavigationContainer>
    <TabNavigator />
  </NavigationContainer>
);

const styles = StyleSheet.create({
  screenWrapper: {
    flex: 1,
    padding: 16,
  },
});
