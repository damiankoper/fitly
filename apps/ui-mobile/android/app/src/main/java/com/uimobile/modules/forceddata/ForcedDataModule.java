package com.uimobile.modules.forceddata;

import com.facebook.react.bridge.ReactContext;
import com.mbientlab.metawear.MetaWearBoard;

public abstract class ForcedDataModule {

	ReactContext reactContext;
	public ForcedDataModule(ReactContext context){
		this.reactContext = context;
	}
	public abstract void setupDataRoutes(MetaWearBoard board);

	public abstract void read();
}
