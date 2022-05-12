import { ActivityType } from '@fitly/shared/meta';

type BottomTabParamList = {
	Home: undefined;
	Exercise: undefined;
	ExerciseCounterScreen: { activity: ActivityType };
	ExerciseResultsScreen: { activity: ActivityType };
	Guess: { activity: ActivityType };
	History: undefined;
	Settings: undefined;
	Profile: undefined;
	Service: undefined;
	BluetoothConnection: undefined;
	NotConnectedScreen: undefined;
	NoPreviousActivityScreen: undefined;
};
