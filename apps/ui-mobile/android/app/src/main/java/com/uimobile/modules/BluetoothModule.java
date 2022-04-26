package com.uimobile.modules;

import static android.content.Context.MODE_PRIVATE;

import android.bluetooth.BluetoothAdapter;
import android.bluetooth.BluetoothDevice;
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;
import android.content.SharedPreferences;
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
import com.uimobile.MainApplication;
import com.uimobile.modules.forceddata.ForcedDataModule;

import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;

public class BluetoothModule extends ReactContextBaseJavaModule {

  private BroadcastReceiver receiver = new BroadcastReceiver() {
	public void onReceive(Context context, Intent intent) {
	  String action = intent.getAction();
	  if (BluetoothDevice.ACTION_FOUND.equals(action)) {
		BluetoothDevice device = intent.getParcelableExtra(BluetoothDevice.EXTRA_DEVICE);

		String deviceName = device.getName();
		String deviceHardwareAddress = device.getAddress();
		Log.i("BluetoothModule", "DeviceName " + deviceName);
		Log.i("BluetoothModule", "DeviceAddress " + deviceHardwareAddress);

		emitNewDeviceEvent(deviceName, deviceHardwareAddress);
	  }
	}
  };
  private MainApplication application;
  private BluetoothAdapter bluetoothAdapter;
  private ReactApplicationContext reactContext;
  private SharedPreferences.Editor editor;
  private SharedPreferences settings;

  public BluetoothModule(ReactApplicationContext context) {
		super(context);
		reactContext = context;
		application = (MainApplication) context.getApplicationContext();
		bluetoothAdapter = BluetoothAdapter.getDefaultAdapter();

    settings = application.getSharedPreferences("bluetooth",MODE_PRIVATE);
    editor = settings.edit();
  }

  @Override
  public String getName() {
		return "BluetoothModule";
  }


  @ReactMethod
  public void startSearchingForBluetoothDevices(Promise promise) {
	IntentFilter filter = new IntentFilter(BluetoothDevice.ACTION_FOUND);
	application.registerReceiver(receiver, filter);
	promise.resolve(bluetoothAdapter.startDiscovery());
  }

  @ReactMethod
  public void cancelSearchingForBluetoothDevices() {
	receiver.clearAbortBroadcast();
	bluetoothAdapter.cancelDiscovery();
	application.unregisterReceiver(receiver);
  }


  @ReactMethod
  public void saveConnectedBluetoothDevice(String deviceAddress){
	  editor.putString("lastMetaWearMacAddress", deviceAddress);
	  editor.apply();
  }

  @ReactMethod
	public void getSavedConnectedBluetoothDevice(Promise promise) {
		promise.resolve(settings.getString("lastMetaWearMacAddress", null));
	}

  private void emitNewDeviceEvent(String deviceName, String deviceAddress) {
	HashMap<String, String> hm = new HashMap<>();
	hm.put("deviceName", deviceName);
	hm.put("deviceAddress", deviceAddress);

	WritableMap map = new WritableNativeMap();
	for (Map.Entry<String, String> entry : hm.entrySet()) {
	  map.putString(entry.getKey(), entry.getValue());
	}

	reactContext
	  .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
	  .emit("onBluetoothFoundNewDevice", map);
  }
}
