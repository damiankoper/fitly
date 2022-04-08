package com.uimobile.modules;

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;
import android.os.Build;
import android.util.Log;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.WritableNativeMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.mbientlab.metawear.MetaWearBoard;
import com.mbientlab.metawear.Route;
import com.mbientlab.metawear.Subscriber;
import com.uimobile.MainApplication;

import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;

import com.mbientlab.metawear.data.Acceleration;
import com.mbientlab.metawear.data.AngularVelocity;
import com.mbientlab.metawear.data.MagneticField;
import com.mbientlab.metawear.module.Accelerometer;
import com.mbientlab.metawear.module.Gyro;
import com.mbientlab.metawear.module.MagnetometerBmm150;

import bolts.Continuation;

public class MagnetometerModule extends ReactContextBaseJavaModule {

	private static final MagnetometerBmm150.OutputDataRate magnetometerDataRate = MagnetometerBmm150.OutputDataRate.ODR_25_HZ;

	private MainApplication application;
	private ReactApplicationContext reactContext;
	private MagnetometerBmm150 magnetometer;

	public MagnetometerModule(ReactApplicationContext context) {
		super(context);
		reactContext = context;
		application = (MainApplication) context.getApplicationContext();
	}

	@Override
	public String getName() {
		return "MagnetometerModule";
	}

	public void emitMagEvent(MagneticField mag) {
		HashMap<String, String> hm = new HashMap<>();
        hm.put("tag", "Magnetometer");

		if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
			hm.put("timeStamp", LocalDateTime.now().toString());
		}
		hm.put("x", String.valueOf(mag.x()));
		hm.put("y", String.valueOf(mag.y()));
		hm.put("z", String.valueOf(mag.z()));

		WritableMap map = new WritableNativeMap();
		for (Map.Entry<String, String> entry : hm.entrySet()) {
			map.putString(entry.getKey(), entry.getValue());
		}

		reactContext
			.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
			.emit("onMagnetometerDataEmit", map);
	}

	public void startModule() {

		magnetometer = application.getBoard().getModule(MagnetometerBmm150.class);
		magnetometer.configure()
			.outputDataRate(magnetometerDataRate)
			.commit();
		Log.i("MainActivity", "Magnetometer started");

		magnetometer.magneticField().addRouteAsync(routeComponent -> routeComponent
			.stream(
				(Subscriber) (data, objects) -> emitMagEvent(data.value(MagneticField.class))
			))
			.continueWith((Continuation<Route, Void>) task -> {
				magnetometer.magneticField().start();
				magnetometer.start();
				return null;
			});
	}

	public void stopModule() {
		magnetometer.stop();
		magnetometer.magneticField().stop();
		Log.i("MainActivity", "Magnetometer stoped");

		application.getBoard().tearDown();
	}
}
