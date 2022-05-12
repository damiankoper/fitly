import React, { useRef } from 'react';
import * as eva from '@eva-design/eva';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { Provider } from 'react-redux';
import { AppNav } from './components/navigation/app-nav';

import { TopNav } from './components/navigation/top-nav';
import store from './state/store';

import MetaWearModule from './native-modules/MetaWearModule';
import { ActivityTracker, MetaWear } from '@fitly/ui-metawear';

import AppInitScreen from './screens/app-init-screen';

export interface MetaWearProps {
	metawear: MetaWear;
	tracker: ActivityTracker;
}

const App = () => {
	const metawear = useRef(new MetaWear(MetaWearModule));
	const activityTracker = useRef(
		new ActivityTracker(
			process.env.BRIDGE_BASE_URL + '/data',
			process.env.BRIDGE_BASE_URL + '/analyze',
			3000
		)
	);

	return (
		<Provider store={store}>
			<IconRegistry icons={EvaIconsPack} />
			<ApplicationProvider {...eva} theme={eva.light}>
				<AppInitScreen metawear={metawear.current}>
					<TopNav />
					<AppNav
						metawear={metawear.current}
						tracker={activityTracker.current}
					/>
				</AppInitScreen>
			</ApplicationProvider>
		</Provider>
	);
};

export default App;
