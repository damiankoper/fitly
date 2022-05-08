package com.uimobile.modules;

import android.util.Log;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.WritableNativeMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.mbientlab.metawear.Data;
import com.mbientlab.metawear.Route;
import com.mbientlab.metawear.Subscriber;
import com.mbientlab.metawear.builder.RouteBuilder;
import com.mbientlab.metawear.builder.RouteComponent;
import com.mbientlab.metawear.module.BarometerBosch;
import com.uimobile.MainApplication;

import java.util.HashMap;
import java.util.Map;

import bolts.Continuation;
import bolts.Task;

public class BarometerModule extends ReactContextBaseJavaModule {

	private MainApplication application;
	private ReactApplicationContext reactContext;
	private BarometerBosch barometer;

	final String ON_PRESSURE_DATA_CAPTURE_EVENT_NAME = "onPressureDataCaptureEvent";
	final String ON_ALTITUDE_DATA_CAPTURE_EVENT_NAME = "onAltitudeDataCaptureEvent";

	public BarometerModule(ReactApplicationContext context) {
		super(context);
		reactContext = context;
		application = (MainApplication) context.getApplicationContext();
	}

	@Override
	public String getName() {
		return "BarometerModule";
	}

	public void configureBarometer() {
		barometer.configure()
				.filterCoeff(BarometerBosch.FilterCoeff.AVG_16)
				.pressureOversampling(BarometerBosch.OversamplingMode.ULTRA_HIGH)
				.standbyTime(0.5f)
				.commit();
	}

	public void startModule() {
		if (barometer == null) {
			barometer = application.getBoard().getModule(BarometerBosch.class);
		}
		if (barometer != null) {
			Log.i("MainActivity", "Barometer started");
			configureBarometer();
			barometer.pressure().addRouteAsync(new RouteBuilder() {
				@Override
				public void configure(RouteComponent source) {
					source.stream(new Subscriber() {
						@Override
						public void apply(Data data, Object... env) {
							emitBarometerEvent(Boolean.TRUE, data.value(Float.class));
						}
					});
				}
			}).continueWith(new Continuation<Route, Void>() {
				@Override
				public Void then(Task<Route> task) throws Exception {
					barometer.start();
					return null;
				}
			});

			barometer.altitude().addRouteAsync(new RouteBuilder() {
				@Override
				public void configure(RouteComponent source) {
					source.stream(new Subscriber() {
						@Override
						public void apply(Data data, Object... env) {
							emitBarometerEvent(Boolean.FALSE, data.value(Float.class));
						}
					});
				}
			}).continueWith(new Continuation<Route, Void>() {
				@Override
				public Void then(Task<Route> task) throws Exception {
					barometer.start();
					return null;
				}
			});
		} else {
			Log.i("MainActivity", "Barometer is null");
		}
	}

	public void stopModule() {
		if (barometer != null) {
			barometer.stop();
			barometer.pressure().stop();
			Log.i("MainActivity", "Barometer stoped");

			application.getBoard().tearDown();
		} else {
			Log.i("MainActivity", "Barometer is null");
		}
	}

	public void emitBarometerEvent(Boolean isPressure, Float value) {
		HashMap<String, String> hm = new HashMap<>();
		if (isPressure) {
			hm.put("tag", "Pressure");
			hm.put("unit", "pascal");
		} else {
			hm.put("tag", "Altitude");
			hm.put("unit", "meters");
		}

		hm.put("value", String.valueOf(value));

		WritableMap map = new WritableNativeMap();
		for (Map.Entry<String, String> entry : hm.entrySet()) {
			map.putString(entry.getKey(), entry.getValue());
		}

		reactContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
				.emit(isPressure ? ON_PRESSURE_DATA_CAPTURE_EVENT_NAME : ON_ALTITUDE_DATA_CAPTURE_EVENT_NAME, map);

	}
}
