package com.uimobile.modules.forceddata;

import android.util.Log;

import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.WritableNativeMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.mbientlab.metawear.Data;
import com.mbientlab.metawear.MetaWearBoard;
import com.mbientlab.metawear.Route;
import com.mbientlab.metawear.Subscriber;
import com.mbientlab.metawear.builder.RouteBuilder;
import com.mbientlab.metawear.builder.RouteComponent;
import com.mbientlab.metawear.module.Settings;
import com.mbientlab.metawear.module.Temperature;

import java.util.HashMap;
import java.util.Map;
import java.util.Set;

import bolts.Continuation;
import bolts.Task;

public class BatteryModule extends ForcedDataModule {

	Settings settings;
	ReactContext context;

	final String ON_BATTERY_DATA_CAPTURE_EVENT_NAME = "onBatteryDataCaptureEvent";

	public BatteryModule(ReactContext context) {
		super(context);
		this.context = context;
	}

	@Override
	public void setupDataRoutes(MetaWearBoard board) {
		settings = board.getModule(Settings.class);

		if(settings != null){
			settings.battery().addRouteAsync(new RouteBuilder() {
				@Override
				public void configure(RouteComponent source) {
					source.stream(new Subscriber() {
						@Override
						public void apply(Data data, Object... objects) {
							emitReturnData(data.value(Settings.BatteryState.class));
							Log.i("BatteryModule", "temp: " + data.value(Settings.BatteryState.class));
						}
					});
				}
			}).continueWith(new Continuation<Route, Void>() {
				@Override
				public Void then(Task<Route> task) throws Exception {
					Log.i("BatteryModule","Successfully added subscriber to sensor!");
					return null;
				}
			});
		}else{
			Log.i("BatteryModule", "ERROR: Temperature Sensor is null, NRF_SOC is not present on device");
		}
	}

	@Override
	public void read() {
		Log.i("BatteryModule","Started reading");
		settings.battery().read();
	}

	public void emitReturnData(Settings.BatteryState value) {
		HashMap<String, String> hm = new HashMap<>();

		hm.put("percentage", value.toString());

		WritableMap map = new WritableNativeMap();
		for (Map.Entry<String, String> entry : hm.entrySet()) {
			map.putString(entry.getKey(), entry.getValue());
		}

		reactContext
			.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
			.emit(ON_BATTERY_DATA_CAPTURE_EVENT_NAME, map);
	}
}
