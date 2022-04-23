package com.uimobile.modules;

import android.util.Log;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.mbientlab.metawear.Data;
import com.mbientlab.metawear.MetaWearBoard;
import com.mbientlab.metawear.Route;
import com.mbientlab.metawear.Subscriber;
import com.mbientlab.metawear.builder.RouteBuilder;
import com.mbientlab.metawear.builder.RouteComponent;
import com.mbientlab.metawear.module.AmbientLightLtr329;
import com.mbientlab.metawear.module.BarometerBme280;
import com.mbientlab.metawear.module.BarometerBmp280;
import com.mbientlab.metawear.module.BarometerBosch;
import com.mbientlab.metawear.module.HumidityBme280;
import com.mbientlab.metawear.module.Settings;
import com.uimobile.MainApplication;
import com.uimobile.modules.forceddata.ForcedDataModule;

import java.util.List;
import java.util.Locale;

import bolts.Continuation;
import bolts.Task;

public class EnvironmentDataModule extends ReactContextBaseJavaModule {
	MainApplication application;
	ReactApplicationContext reactContext;
	List<ForcedDataModule> forcedDataModuleList;

	@NonNull
	@Override
	public String getName() {
		return "EnvironmentDataModule";
	}

	public EnvironmentDataModule(ReactApplicationContext context, List<ForcedDataModule> dataModules){
		super(context);
		reactContext = context;
		application = (MainApplication) context.getApplicationContext();
		forcedDataModuleList = dataModules;
	}

	public void setupReaders(){
		MetaWearBoard board = application.getBoard();
		if(board != null){
			for(ForcedDataModule dataModule : forcedDataModuleList){
				dataModule.setupDataRoutes(board);
			}
		}else{
			Log.i("MainActivity", "MetaWearBoard is null");
		}
	}

	@ReactMethod
	public void getAllEnvironmentData(){
		for(ForcedDataModule dataModule : forcedDataModuleList) {
			dataModule.read();
		}
	}




}
