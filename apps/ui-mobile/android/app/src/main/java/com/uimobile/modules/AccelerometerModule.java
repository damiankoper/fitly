package com.uimobile.modules;

import android.os.Build;
import android.util.Log;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;

import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.WritableNativeMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;

import com.mbientlab.metawear.Route;
import com.mbientlab.metawear.Subscriber;
import com.uimobile.MainApplication;

import java.util.HashMap;
import java.util.Map;
import java.time.LocalDateTime;

import com.mbientlab.metawear.data.Acceleration;
import com.mbientlab.metawear.module.Accelerometer;

import bolts.Continuation;


public class AccelerometerModule extends ReactContextBaseJavaModule {


	private MainApplication application;
	private ReactApplicationContext reactContext;
	private Accelerometer accelerometer;

	public AccelerometerModule(ReactApplicationContext context) {
		super(context);
		reactContext = context;
		application = (MainApplication) context.getApplicationContext();
	}

	@Override
	public String getName() {
		return "AccelerometerModule";
	}

	public void emitAccEvent(Acceleration acc) {

		HashMap<String, String> hm = new HashMap<>();

		hm.put("tag", "Accelerometer");

		if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
			hm.put("timeStamp", LocalDateTime.now().toString());
		}
		hm.put("x", String.valueOf(acc.x()));
		hm.put("y", String.valueOf(acc.y()));
		hm.put("z", String.valueOf(acc.z()));

		WritableMap map = new WritableNativeMap();
		for (Map.Entry<String, String> entry : hm.entrySet()) {
			map.putString(entry.getKey(), entry.getValue());
		}

		reactContext
			.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
			.emit("onAccelerometerDataEmit", map);
	}

	public void startModule() {

		accelerometer = application.getBoard().getModule(Accelerometer.class);
		accelerometer.configure()
			.odr(25f) // Set sampling frequency to 25Hz, or closest valid ODR
			.commit();
		Log.i("MainActivity", "Accelometer started");

		accelerometer.acceleration().addRouteAsync(routeComponent -> routeComponent
			.stream(
				(Subscriber) (data, objects) -> emitAccEvent(data.value(Acceleration.class))
				// Log.i("MainActivity",
				// 	"Acc: " + data.value(Acceleration.class).toString())
			))
			.continueWith((Continuation<Route, Void>) task -> {
				accelerometer.acceleration().start();
				accelerometer.start();
				return null;
			});
	}

	public void stopModule() {
		accelerometer.stop();
		accelerometer.acceleration().stop();
		Log.i("MainActivity", "Accelometer stoped");

		//board.tearDown(); ->mozliwe ze czysci wszystkie polaczenia
	}
}
