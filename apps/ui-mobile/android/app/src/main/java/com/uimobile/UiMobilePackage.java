package com.uimobile;

import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.uimanager.ViewManager;
import com.uimobile.modules.AccelerometerModule;
import com.uimobile.modules.BluetoothModule;
import com.uimobile.modules.GyroscopeModule;
import com.uimobile.modules.MagnetometerModule;
import com.uimobile.modules.MetaWearModule;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class UiMobilePackage implements ReactPackage {

	@Override
	public List<ViewManager> createViewManagers(ReactApplicationContext reactContext) {
		return Collections.emptyList();
	}

	@Override
	public List<NativeModule> createNativeModules(ReactApplicationContext reactContext) {
		List<NativeModule> modules = new ArrayList<>();
		GyroscopeModule gyro = new GyroscopeModule(reactContext);
		MagnetometerModule mag= new MagnetometerModule(reactContext);
		AccelerometerModule acc = new AccelerometerModule(reactContext);

		modules.add(new BluetoothModule(reactContext));
		modules.add(acc);
		modules.add(mag);
		modules.add(gyro);
		modules.add(new MetaWearModule(reactContext, acc, mag, gyro));
		return modules;
	}

}
