package com.uimobile;

import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.uimanager.ViewManager;
import com.uimobile.modules.AccelerometerModule;
import com.uimobile.modules.AmbientLightModule;
import com.uimobile.modules.BarometerModule;
import com.uimobile.modules.BluetoothModule;
import com.uimobile.modules.GyroscopeModule;
import com.uimobile.modules.EnvironmentDataModule;
import com.uimobile.modules.MagnetometerModule;
import com.uimobile.modules.MetaWearModule;
import com.uimobile.modules.forceddata.BatteryModule;
import com.uimobile.modules.forceddata.ForcedDataModule;
import com.uimobile.modules.forceddata.TemperatureModule;

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
		AmbientLightModule ambLight = new AmbientLightModule(reactContext);
		BarometerModule barometer = new BarometerModule(reactContext);

		modules.add(new BluetoothModule(reactContext));
		modules.add(acc);
		modules.add(mag);
		modules.add(gyro);
		modules.add(ambLight);
		modules.add(barometer);

		List<ForcedDataModule> forcedDataModuleList = new ArrayList<>();

		forcedDataModuleList.add(new TemperatureModule(reactContext));
		forcedDataModuleList.add(new BatteryModule(reactContext));

		EnvironmentDataModule envData = new EnvironmentDataModule(reactContext, forcedDataModuleList);
		modules.add(envData);

		modules.add(new MetaWearModule(reactContext, acc, mag, gyro, barometer, ambLight, envData));

		return modules;
	}

}
