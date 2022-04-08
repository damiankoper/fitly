import React from 'react';
import { DeviceEventEmitter, StyleSheet } from 'react-native';
import * as eva from '@eva-design/eva';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { AppNavigator } from './components/navigation/app-nav';
import { Provider } from 'react-redux';

import { TopNav } from './components/navigation/top-nav';
import { LogBox } from 'react-native';
import store from './state/store';

LogBox.ignoreLogs([
	"[react-native-gesture-handler] Seems like you're using an old API with gesture components, check out new Gestures system!",
]);

const App: React.FC<{}> = () => {
	React.useEffect(() => {
		// On app close
		return () => {
			DeviceEventEmitter.removeAllListeners();
		};
	}, []);

	return (
		<Provider store={store}>
			<IconRegistry icons={EvaIconsPack} />
			<ApplicationProvider {...eva} theme={eva.light}>
				<TopNav />
				<AppNavigator />
			</ApplicationProvider>
		</Provider>
	);
};

export default App;
