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

public class GyroscopeModule extends ReactContextBaseJavaModule {

	private MainApplication application;
	private ReactApplicationContext reactContext;
	private Gyro gyroscope;

	public GyroscopeModule(ReactApplicationContext context) {
		super(context);
		reactContext = context;
		application = (MainApplication) context.getApplicationContext();
	}

	@Override
	public String getName() {
		return "GyroscopeModule";
	}

	public void emitGyroEvent(AngularVelocity gyro) {
		HashMap<String, String> hm = new HashMap<>();
        hm.put("tag", "Gyroscope");
		
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
			hm.put("timeStamp", LocalDateTime.now().toString());
		}
		hm.put("x", String.valueOf(gyro.x()));
		hm.put("y", String.valueOf(gyro.y()));
		hm.put("z", String.valueOf(gyro.z()));

		WritableMap map = new WritableNativeMap();
		for (Map.Entry<String, String> entry : hm.entrySet()) {
			map.putString(entry.getKey(), entry.getValue());
		}

		reactContext
			.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
			.emit("onGyroscopeDataEmit", map);
	}

	public void startModule(){

		gyroscope = application.getBoard().getModule(Gyro.class);
		gyroscope.configure()
			.odr(Gyro.OutputDataRate.ODR_25_HZ)
			.commit();
		Log.i("MainActivity", "Gyroscope started");

		gyroscope.angularVelocity().addRouteAsync(routeComponent -> routeComponent
			.stream((Subscriber) (data, objects) -> emitGyroEvent(data.value(AngularVelocity.class))
			))
			.continueWith((Continuation<Route, Void>) task -> {
				gyroscope.angularVelocity().start();
				gyroscope.start();
				return null;
			});
	}

	public void stopModule() {
		gyroscope.stop();
		gyroscope.angularVelocity().stop();
		Log.i("MainActivity", "Gyroscope stoped");

		application.getBoard().tearDown();
	}
}
