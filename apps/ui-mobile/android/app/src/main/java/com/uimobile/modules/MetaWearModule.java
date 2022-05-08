package com.uimobile.modules;

import static android.content.Context.MODE_PRIVATE;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.mbientlab.metawear.DeviceInformation;
import com.mbientlab.metawear.MetaWearBoard;
import com.mbientlab.metawear.module.Led;
import com.uimobile.MainApplication;

import android.bluetooth.BluetoothDevice;
import android.bluetooth.BluetoothManager;
import android.content.SharedPreferences;
import android.util.Log;

import bolts.Continuation;
import bolts.Task;

public class MetaWearModule extends ReactContextBaseJavaModule {
	private MainApplication application;
	private MetaWearBoard board;
	private AccelerometerModule accelerometerModule;
	private MagnetometerModule magnetometerModule;
	private GyroscopeModule gyroscopeModule;
	private AmbientLightModule ambientLightModule;
	private EnvironmentDataModule environmentData;
	private AmbientLightModule ambientLight;
	private BarometerModule barometer;

	public MetaWearModule(ReactApplicationContext context, AccelerometerModule acc, MagnetometerModule mag,
			GyroscopeModule gyro, BarometerModule baro, AmbientLightModule ambLight, EnvironmentDataModule envData) {
		super(context);
		application = (MainApplication) context.getApplicationContext();
		accelerometerModule = acc;
		magnetometerModule = mag;
		gyroscopeModule = gyro;
		environmentData = envData;
		barometer = baro;
		ambientLight = ambLight;
	}

	@ReactMethod
	public void setupPreviouslyConnectedMetaWear(Promise promise) {
		SharedPreferences settings = application.getSharedPreferences("bluetooth", MODE_PRIVATE);
		String previousMetaWearMacAddress = settings.getString("lastMetaWearMacAddress", null);

		if (previousMetaWearMacAddress != null) {
			Log.i("MainActivity", "Received device MAC:" + previousMetaWearMacAddress);
			this.retrieveBoard(previousMetaWearMacAddress, promise);
		}
	}

	@Override
	public String getName() {
		return "MetaWearModule";
	}

	@ReactMethod
	public void connectToMetaWearDevice(String deviceAddress, Promise promise) {
		Log.i("MainActivity", "Received device MAC:" + deviceAddress);
		this.retrieveBoard(deviceAddress, promise);
	}

	@ReactMethod
	public void blinkBlueLED(int reapeatTimes) {
		if (this.board.isConnected()) {
			Led led;
			if ((led = board.getModule(Led.class)) != null) {
				led.editPattern(Led.Color.BLUE, Led.PatternPreset.BLINK)
						.repeatCount((byte) reapeatTimes)
						.commit();
				led.play();
			}
		} else {
			Log.i("MainActivity", "Board is not connected");
		}
	}

	private void retrieveBoard(String metaWearMacAddress, Promise promise) {
		final BluetoothManager btManager = this.application.getBluetoothManager();
		final BluetoothDevice remoteDevice = btManager.getAdapter().getRemoteDevice(metaWearMacAddress);

		if (board == null) {
			board = this.application.getMetaWearBoardFromDevice(remoteDevice);
		}
		if (board != null) {
			this.application.setBoard(board);
			Log.i("MainActivity", board.toString());

			board.connectAsync().continueWith(new Continuation<Void, Void>() {
				@Override
				public Void then(Task<Void> task) throws Exception {
					if (task.isFaulted()) {
						Log.i("MainActivity", "Failed to connect");
						promise.reject(task.getError());
					} else {
						Log.i("MainActivity", "Connected");
						promise.resolve(true);
						board.readDeviceInformationAsync()
								.continueWith(new Continuation<DeviceInformation, Void>() {
									@Override
									public Void then(Task<DeviceInformation> task) throws Exception {
										Log.i("MainActivity", "Device Information: " + task.getResult());
										return null;
									}
								});
					}
					return null;
				}
			});
		} else {
			Log.i("MainActivity", "Board is null");
		}
	}

	@ReactMethod
	public void startMetaWearModules() {
		try {
			accelerometerModule.startModule();
			magnetometerModule.startModule();
			gyroscopeModule.startModule();
			ambientLight.startModule();
			barometer.startModule();
		} catch (Exception e) {
			Log.i("MainActivity", "Can't start MetaWearModules. One or more modules are null.");
		}
	}

	@ReactMethod
	public void setupEnvironmentDataReaders() {
		environmentData.setupReaders();
	}

	@ReactMethod
	public void stopMetaWearModules() {
		try {
			accelerometerModule.stopModule();
			magnetometerModule.stopModule();
			gyroscopeModule.stopModule();
			ambientLight.startModule();
			barometer.stopModule();
		} catch (Exception e) {
			Log.i("MainActivity", "Can't stop MetaWearModules. One or more modules are null.");
		}
	}
}
