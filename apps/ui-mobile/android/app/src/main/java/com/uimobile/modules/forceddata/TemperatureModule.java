package com.uimobile.modules.forceddata;

import android.util.Log;

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
import com.mbientlab.metawear.module.BarometerBosch;
import com.mbientlab.metawear.module.Temperature;
import com.uimobile.MainApplication;

import java.util.HashMap;
import java.util.Map;

import bolts.Continuation;
import bolts.Task;

public class TemperatureModule extends ForcedDataModule {

	Temperature temperature;
	Temperature.Sensor sensor;
	ReactContext context;

	final String ON_TEMPERATURE_DATA_CAPTURE_EVENT_NAME = "onTemperatureDataCaptureEvent";

	public TemperatureModule(ReactContext context) {
		super(context);
		this.context = context;
	}

	@Override
	public void setupDataRoutes(MetaWearBoard board) {
		if (temperature == null) {
			temperature = board.getModule(Temperature.class);
		}
		if (sensor == null) {
			sensor = temperature.findSensors(Temperature.SensorType.NRF_SOC)[0];
		}

		if (sensor != null) {
			sensor.addRouteAsync(new RouteBuilder() {
				@Override
				public void configure(RouteComponent source) {
					source.stream(new Subscriber() {
						@Override
						public void apply(Data data, Object... objects) {
							emitReturnData(data.value(Float.class));
							Log.i("TemperatureModule", "temp: " + data.value(Float.class).toString() + "'C");
						}
					});
				}
			}).continueWith(new Continuation<Route, Void>() {
				@Override
				public Void then(Task<Route> task) throws Exception {
					Log.i("TemperatureModule", "Successfully added subscriber to sensor!");
					return null;
				}
			});
		} else {
			Log.i("TemperatureModule", "ERROR: Temperature Sensor is null, NRF_SOC is not present on device");
		}
	}

	@Override
	public void read() {
		Log.i("TemperatureModule", "Started reading");
		sensor.read();
	}

	public void emitReturnData(Float value) {
		HashMap<String, String> hm = new HashMap<>();

		hm.put("temperature", value.toString());
		hm.put("unit", "Celsius");

		WritableMap map = new WritableNativeMap();
		for (Map.Entry<String, String> entry : hm.entrySet()) {
			map.putString(entry.getKey(), entry.getValue());
		}

		reactContext
				.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
				.emit(ON_TEMPERATURE_DATA_CAPTURE_EVENT_NAME, map);
	}
}
