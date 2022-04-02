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

const { Navigator, Screen } = createBottomTabNavigator();

// TODO: padding only for screens
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
    <Screen name="Profile" component={ProfileScreen} />
    <Screen name="Service" component={ServiceModeScreen} />
  </Navigator>
);

export const AppNavigator = () => (
  <NavigationContainer>
    <TabNavigator />
  </NavigationContainer>
);
