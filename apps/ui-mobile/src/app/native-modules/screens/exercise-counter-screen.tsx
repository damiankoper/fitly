import React, { useEffect, useState } from 'react';
import { Layout } from '@ui-kitten/components';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { BottomTabParamList } from '../../interfaces/BottomTabParamList';
import { CounterSpinner } from '../../components/spinners/counter-spinner';
import { StyleSheet, View } from 'react-native';
import { ActivityCardSmall } from '../../components/cards/activity-card-small';
import { MetaWearProps } from '../../App';
import { showNotification } from '@fitly/ui-utils';
import { ActivityType, SensorAsyncSample } from '@fitly/shared/meta';
import { useStopwatch } from 'react-timer-hook';

type NavProps = BottomTabScreenProps<
	BottomTabParamList,
	'ExerciseCounterScreen'
>;

export const ExerciseCounterScreen: React.FC<NavProps & MetaWearProps> = ({
	route,
	navigation,
	metawear,
	tracker,
}) => {
	const [activity, setActivity] = useState(route.params.activity);
	const [isPaused, setIsPaused] = useState(false);
	const [isStarted, setIsStarted] = useState(false);
	const [lastRepeats, setLastRepeats] = useState(0);
	const [lastDuration, setLastDuration] = useState(1);

	const stopwatch = useStopwatch({
		autoStart: false,
	});

	function startCapture() {
		console.log('StartCapture');
		metawear.start();
		tracker.startAnalyze();
	}

	function stopCapture() {
		console.log('StopCapture');
		tracker.stop();
		metawear.stop();
	}

	function onStop() {
		setIsStarted(false);
		setIsPaused(false);
		stopCapture();
		setLastDuration(0);
		setLastRepeats(0);
		stopwatch.reset(undefined, false);
		navigation.navigate('ExerciseResultsScreen', { activity: activity });
	}

	function onStart() {
		setIsStarted(true);
		setIsPaused(false);
		stopwatch.reset(undefined, true);
		startCapture();
	}

	function onPause() {
		setIsPaused(!isPaused);
		if (!isPaused) {
			stopCapture();
			stopwatch.pause();
		} else {
			startCapture();
			stopwatch.start();
		}
	}

	useEffect(() => {
		const events: (() => void)[] = [];
		const navigationEvents: (() => void)[] = [];
		navigationEvents.push(
			navigation.addListener('focus', () => {
				events.push(
					metawear.accelerometerData.sub((data) =>
						tracker.addAccelerometerSample(
							new SensorAsyncSample(data)
						)
					),
					metawear.gyroscopeData.sub((data) =>
						tracker.addGyroscopeSample(new SensorAsyncSample(data))
					),
					metawear.magnetometerData.sub((data) =>
						tracker.addMagnetometerSample(
							new SensorAsyncSample(data)
						)
					),
					tracker.onError.sub((error) => {
						showNotification(error.message);
					}),
					tracker.onAnalyze.sub((data) => {
						setActivity(data.type);
						setLastRepeats(data.repeats);
						setLastDuration(
							data.interval.toDuration().as('seconds')
						);
					})
				);
			})
		);
		navigationEvents.push(
			navigation.addListener('blur', () => {
				console.log('lour');
				setActivity(ActivityType.UNKNOWN);
				navigation.setParams({ activity: ActivityType.UNKNOWN });
				events.forEach((t) => t());
				if (isStarted) onStop();
			})
		);

		return () => {
			navigationEvents.forEach((t) => t());
		};
	}, []);

	return (
		<Layout style={styles.container}>
			<View>
				<ActivityCardSmall
					activity={activity}
					subtitle="Current actvity"
				/>
				<View style={styles.spinnerWrapper}>
					<CounterSpinner
						repeats={lastRepeats}
						rate={(lastRepeats / lastDuration) * 60}
						isPaused={isPaused}
						isStarted={isStarted}
						timer={`${stopwatch.minutes
							.toString()
							.padStart(2, '0')}:${stopwatch.seconds
							.toString()
							.padStart(2, '0')}`}
						onStop={onStop}
						onStart={onStart}
						onPause={onPause}
					/>
				</View>
			</View>
		</Layout>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'space-between',
	},
	spinnerWrapper: {
		alignItems: 'center',
		marginTop: 8,
		marginBottom: 8,
	},
});