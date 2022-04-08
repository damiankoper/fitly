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
import BluetoothConnectionScreen from '../../screens/bluetooth-connection-screen';
import { NotConnectedScreen } from '../../screens/home-not-connected-screen';
import { NoPreviousActivityScreen } from '../../screens/home-no-previous-activity-screen';

const { Navigator, Screen } = createBottomTabNavigator<BottomTabParamList>();

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
		initialRouteName="Home"
		backBehavior="history"
		screenOptions={{
			headerShown: false,
		}}
	>
		<Screen name="Home" component={wrapScreen(HomeScreen)} />
		<Screen name="Exercise" component={wrapScreen(ExerciseScreen)} />
		<Screen name="Guess" component={wrapScreen(GuessScreen)} />
		<Screen name="History" component={wrapScreen(HistoryScreen)} />
		<Screen name="Settings" component={wrapScreen(SettingScreen)} />
		<Screen name="Profile" component={wrapScreen(ProfileScreen)} />
		<Screen name="Service" component={wrapScreen(ServiceModeScreen)} />
		<Screen name="BluetoothConnection" component={wrapScreen(BluetoothConnectionScreen)} />
		<Screen name="NotConnectedScreen" component={wrapScreen(NotConnectedScreen)} />
		<Screen name="NoPreviousActivityScreen" component={wrapScreen(NoPreviousActivityScreen)} />
	</Navigator>
);

export const AppNav = () => (
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
