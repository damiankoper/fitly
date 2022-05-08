package com.uimobile.modules;

import android.util.Log;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.WritableNativeMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.mbientlab.metawear.Data;
import com.mbientlab.metawear.MetaWearBoard;
import com.mbientlab.metawear.Route;
import com.mbientlab.metawear.Subscriber;
import com.mbientlab.metawear.builder.RouteBuilder;
import com.mbientlab.metawear.builder.RouteComponent;
import com.mbientlab.metawear.module.AmbientLightLtr329;
import com.uimobile.MainApplication;

import java.util.HashMap;
import java.util.Locale;
import java.util.Map;

import bolts.Continuation;
import bolts.Task;

public class AmbientLightModule extends ReactContextBaseJavaModule {
	MainApplication application;
	ReactApplicationContext reactContext;
	AmbientLightLtr329 ambientLightSensor;
	final String ON_AMBIENT_LIGHT_DATA_CAPTURE_EVENT_NAME = "onAmbientLightdataCapture";

	@NonNull
	@Override
	public String getName() {
		return "AmbientLightModule";
	}

	public AmbientLightModule(ReactApplicationContext context) {
		super(context);
		reactContext = context;
		application = (MainApplication) context.getApplicationContext();
	}

	private void configureSensor() {
		ambientLightSensor.configure()
				.gain(AmbientLightLtr329.Gain.LTR329_8X)
				.integrationTime(AmbientLightLtr329.IntegrationTime.LTR329_TIME_250MS)
				.measurementRate(AmbientLightLtr329.MeasurementRate.LTR329_RATE_50MS)
				.commit();
	}

	public void startModule() {
		if (ambientLightSensor == null) {
			ambientLightSensor = application.getBoard().getModule(AmbientLightLtr329.class);
		}

		if (ambientLightSensor != null) {
			configureSensor();
			ambientLightSensor.illuminance().addRouteAsync(new RouteBuilder() {
				@Override
				public void configure(RouteComponent source) {
					source.stream(new Subscriber() {
						@Override
						public void apply(Data data, Object... env) {
							Log.i("MainActivity",
									String.format(Locale.US, "illuminance = %.3f lx", data.value(Float.class)));
							emitBarometerEvent(data.value(Float.class));
						}
					});
				}
			}).continueWith(new Continuation<Route, Void>() {
				@Override
				public Void then(Task<Route> task) throws Exception {
					Log.i("MainActivity", "Ambient Light started");
					ambientLightSensor.illuminance().start();
					return null;
				}
			});
		} else {
			Log.i("MainActivity", "Ambient Light is null");
		}
	}

	public void stopModule() {
		if (ambientLightSensor != null) {
			ambientLightSensor.illuminance().stop();
			Log.i("MainActivity", "Ambient Light stopped");

			application.getBoard().tearDown();
		} else {
			Log.i("MainActivity", "Ambient Light is null");
		}
	}

	public void emitBarometerEvent(Float value) {
		HashMap<String, String> hm = new HashMap<>();
		hm.put("tag", "AmbientLight");
		hm.put("unit", "Unknown");

		hm.put("value", String.valueOf(value));

		WritableMap map = new WritableNativeMap();
		for (Map.Entry<String, String> entry : hm.entrySet()) {
			map.putString(entry.getKey(), entry.getValue());
		}

		reactContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
				.emit(ON_AMBIENT_LIGHT_DATA_CAPTURE_EVENT_NAME, map);

	}

}
