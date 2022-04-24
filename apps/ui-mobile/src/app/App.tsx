import React from 'react';
import { DeviceEventEmitter, StyleSheet } from 'react-native';
import * as eva from '@eva-design/eva';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { Provider } from 'react-redux';
import { AppNav } from './components/navigation/app-nav';

import { TopNav } from './components/navigation/top-nav';
import { LogBox } from 'react-native';
import store from './state/store';

import { ActivityTrackingMeta } from '@fitly/shared/meta';

import { instanceToPlain } from 'class-transformer';
import MetaWearModule from './native-modules/MetaWearModule';
import { showNotification } from './utils/notifications';

LogBox.ignoreLogs([
	"[react-native-gesture-handler] Seems like you're using an old API with gesture components, check out new Gestures system!",
]);

console.log(instanceToPlain(new ActivityTrackingMeta()));

const App: React.FC<{}> = () => {
	React.useEffect(() => {
		MetaWearModule.setupPreviouslyConnectedMetaWear()
			.then(() => {
				showNotification('Przywrócono połączenie z urządzeniem MetaWear!');
				MetaWearModule.blinkBlueLED(1 + 1);
			})
			.catch(() => {
				showNotification('Niw wykryto urządzenia MetaWear, połącz się ponownie!');
			});
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
				<AppNav />
			</ApplicationProvider>
		</Provider>
	);
};

export default App;
