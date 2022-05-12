import {
	ActivityTracking,
	ActivityTrackingMeta,
	ActivityType,
	SensorAsyncSample,
} from '@fitly/shared/meta';
import axios from 'axios';
import { DateTime, Interval } from 'luxon';
import { SimpleEventDispatcher } from 'strongly-typed-events';

export class ActivityTracker {
	private intervalId: NodeJS.Timer | null = null;
	private meta: ActivityTrackingMeta = new ActivityTrackingMeta(
		Interval.fromDateTimes(DateTime.now(), DateTime.now())
	);

	private accelerometerData: SensorAsyncSample[] = [];
	private gyroscopeData: SensorAsyncSample[] = [];
	private magnetometerData: SensorAsyncSample[] = [];

	private _onError = new SimpleEventDispatcher<Error>();
	public get onError() {
		return this._onError.asEvent();
	}

	private _onAnalyze = new SimpleEventDispatcher<ActivityTrackingMeta>();
	public get onAnalyze() {
		return this._onAnalyze.asEvent();
	}

	private _onSuccess = new SimpleEventDispatcher<string>();
	public get onSuccess() {
		return this._onSuccess.asEvent();
	}

	constructor(
		private serviceUrl: string,
		private analyzeUrl: string,
		private duration: number
	) {}

	public startService() {
		this.start(this.serviceUrl, false);
	}

	public startAnalyze(type?: ActivityType) {
		if (type) this.meta.type = type;
		this.start(this.analyzeUrl, true);
	}

	private start(url: string, emitAnalyse: boolean) {
		this.reset();
		if (!this.intervalId)
			this.intervalId = setInterval(
				() => this.loop(url, emitAnalyse),
				this.duration
			);
	}

	public async loop(url: string, emitAnalyse: boolean) {
		this.meta.interval = this.meta.interval.set({ end: DateTime.now() });

		const data = new ActivityTracking(
			this.meta,
			this.accelerometerData,
			this.gyroscopeData,
			this.magnetometerData
		);

		try {
			const result = await axios.post(url, this.instanceToPlain(data));
			if (result.data != null) {
				this._onSuccess.dispatch('Sent');
			}
			if (emitAnalyse)
				this._onAnalyze.dispatch(this.plainToInstance(result.data));
		} catch (e) {
			this._onError.dispatch(e as Error);
		} finally {
			this.reset();
		}
	}

	public stop() {
		if (this.intervalId) clearInterval(this.intervalId);
		this.intervalId = null;
	}

	public setActivityType(type: ActivityType) {
		this.meta.type = type;
	}

	public addAccelerometerSample(sample: SensorAsyncSample) {
		this.accelerometerData.push(sample);
	}

	public addGyroscopeSample(sample: SensorAsyncSample) {
		this.gyroscopeData.push(sample);
	}

	public addMagnetometerSample(sample: SensorAsyncSample) {
		this.magnetometerData.push(sample);
	}

	public addRepeats(n = 1) {
		this.meta.repeats += n;
	}

	/**
	 * ! Note: these methods are a workaround since ui-kitten has problems
	 * !       with decorators and complex types are not transformed correctly.
	 */
	private instanceToPlain(at: ActivityTracking): Record<string, unknown> {
		return {
			meta: {
				...at.meta,
				interval: at.meta.interval.toISO(),
			},
			accelerometer: at.accelerometer.map((s) => ({
				timestamp: s.timestamp.toISO(),
				data: s.data,
			})),
			gyroscope: at.gyroscope.map((s) => ({
				timestamp: s.timestamp.toISO(),
				data: s.data,
			})),
			magnetometer: at.accelerometer.map((s) => ({
				timestamp: s.timestamp.toISO(),
				data: s.data,
			})),
		};
	}

	private plainToInstance(
		atm: Record<keyof ActivityTrackingMeta, any>
	): ActivityTrackingMeta {
		return new ActivityTrackingMeta(
			Interval.fromISO(atm.interval),
			atm.type,
			atm.repeats
		);
	}

	private reset() {
		this.meta.interval = this.meta.interval.set({
			start: DateTime.now(),
			end: DateTime.now(),
		});
		this.meta.repeats = 0;
		this.accelerometerData = [];
		this.gyroscopeData = [];
		this.magnetometerData = [];
	}
}
