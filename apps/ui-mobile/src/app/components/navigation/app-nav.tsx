import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { SettingScreen } from '../../native-modules/screens/settings-screen';
import { ExerciseScreen } from '../../native-modules/screens/exercise-screen';
import { HomeScreen } from '../../native-modules/screens/home-screen';
import { HistoryScreen } from '../../native-modules/screens/history-screen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ServiceModeScreen } from '../../native-modules/screens/service-mode-screen';
import { BottomNav } from './bottom-nav';
import { Layout } from '@ui-kitten/components';
import { StyleSheet } from 'react-native';
import BluetoothConnectionScreen from '../../native-modules/screens/bluetooth-connection-screen';
import { NotConnectedScreen } from '../../native-modules/screens/home-not-connected-screen';
import { NoPreviousActivityScreen } from '../../native-modules/screens/home-no-previous-activity-screen';
import { ExerciseCounterScreen } from '../../native-modules/screens/exercise-counter-screen';
import { MetaWearProps } from '../../App';
import { BottomTabParamList } from '../../interfaces/BottomTabParamList';
import { ExerciseResultsScreen } from '../../native-modules/screens/exercise-results-screen';
import * as RootNavigation from './root-navigation';
import { ActivityType } from '@fitly/shared/meta';
import { ProfileScreen } from '../../native-modules/screens/profile-screen';

const { Navigator, Screen } = createBottomTabNavigator<BottomTabParamList>();

function wrapScreen(Component: any, outerProps: MetaWearProps) {
	return (props: MetaWearProps) => {
		return (
			<Layout style={styles.wrapper}>
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
		<Screen name="Exercise" component={wrapScreen(ExerciseScreen, props)} />
		<Screen
			name="Guess"
			component={wrapScreen(ExerciseCounterScreen, props)}
			initialParams={{
				activity: ActivityType.UNKNOWN,
			}}
		/>
		<Screen name="History" component={wrapScreen(HistoryScreen, props)} />
		<Screen name="Settings" component={wrapScreen(SettingScreen, props)} />
		<Screen name="Profile" component={wrapScreen(ProfileScreen, props)} />
		<Screen
			name="Service"
			component={wrapScreen(ServiceModeScreen, props)}
		/>
		<Screen
			name="BluetoothConnection"
			component={wrapScreen(BluetoothConnectionScreen, props)}
		/>
		<Screen
			name="NotConnectedScreen"
			component={wrapScreen(NotConnectedScreen, props)}
		/>
		<Screen
			name="NoPreviousActivityScreen"
			component={wrapScreen(NoPreviousActivityScreen, props)}
		/>
		<Screen
			name="ExerciseCounterScreen"
			component={wrapScreen(ExerciseCounterScreen, props)}
		/>
		<Screen
			name="ExerciseResultsScreen"
			component={wrapScreen(ExerciseResultsScreen, props)}
		/>
	</Navigator>
);

export const AppNav = (props: MetaWearProps) => (
	<NavigationContainer ref={RootNavigation.navigationRef}>
		<TabNavigator {...props} />
	</NavigationContainer>
);

const styles = StyleSheet.create({
	wrapper: {
		padding: 16,
		flex: 1,
	},
});
