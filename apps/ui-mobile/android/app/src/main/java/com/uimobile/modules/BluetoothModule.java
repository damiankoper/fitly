package com.uimobile.modules;

import android.bluetooth.BluetoothAdapter;
import android.bluetooth.BluetoothDevice;
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;
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
import com.uimobile.MainApplication;

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

  public BluetoothModule(ReactApplicationContext context) {
    super(context);
    reactContext = context;
    application = (MainApplication) context.getApplicationContext();
    bluetoothAdapter = BluetoothAdapter.getDefaultAdapter();
  }

  @Override
  public String getName() {
    return "BluetoothModule";
  }


  @ReactMethod
  public void startSearchingForBluetoothDevices() {
    IntentFilter filter = new IntentFilter(BluetoothDevice.ACTION_FOUND);
    application.registerReceiver(receiver, filter);
    bluetoothAdapter.startDiscovery();
  }

  @ReactMethod
  public void cancelSearchingForBluetoothDevices() {
    bluetoothAdapter.cancelDiscovery();
    application.unregisterReceiver(receiver);
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
