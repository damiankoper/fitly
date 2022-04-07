package com.uimobile.modules;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.mbientlab.metawear.DeviceInformation;
import com.mbientlab.metawear.MetaWearBoard;
import com.mbientlab.metawear.module.Led;
import com.uimobile.MainApplication;

import android.bluetooth.BluetoothDevice;
import android.bluetooth.BluetoothManager;
import android.content.Context;
import android.util.Log;

import bolts.Continuation;
import bolts.Task;

public class MetaWearModule extends ReactContextBaseJavaModule {
  private MainApplication application;
  private MetaWearBoard board;

  public MetaWearModule(ReactApplicationContext context) {
    super(context);
    application = (MainApplication) context.getApplicationContext();
  }

  @Override
  public String getName() {
    return "MetaWearModule";
  }

  @ReactMethod
  public void connectToMetaWearDevice(String deviceAddress, Promise promise) {
    Log.i("MainActivity", "Received device MAC:" + deviceAddress);
    this.retrieveBoard(deviceAddress, promise);
  }

  @ReactMethod
  public void blinkBlueLED(int reapeatTimes) {
    if (this.board.isConnected()) {
      Led led;
      if ((led = board.getModule(Led.class)) != null) {
        led.editPattern(Led.Color.BLUE, Led.PatternPreset.BLINK)
          .repeatCount((byte) reapeatTimes)
          .commit();
        led.play();
      }
    } else {
      Log.i("MainActivity", "Board is not connected");
    }
  }

  private void retrieveBoard(String metaWearMacAddress, Promise promise) {
    final BluetoothManager btManager = this.application.getBluetoothManager();
    final BluetoothDevice remoteDevice =
      btManager.getAdapter().getRemoteDevice(metaWearMacAddress);

    board = this.application.getMetaWearBoardFromDevice(remoteDevice);
    this.application.setBoard(board);
    Log.i("MainActivity", board.toString());

    board.connectAsync().continueWith(new Continuation<Void, Void>() {
      @Override
      public Void then(Task<Void> task) throws Exception {
        if (task.isFaulted()) {
          Log.i("MainActivity", "Failed to connect");
          promise.reject("Failed to connect", task.getError());
        } else {
          Log.i("MainActivity", "Connected");
          promise.resolve("Connected");
          board.readDeviceInformationAsync()
            .continueWith(new Continuation<DeviceInformation, Void>() {
              @Override
              public Void then(Task<DeviceInformation> task) throws Exception {
                Log.i("MainActivity", "Device Information: " + task.getResult());
                return null;
              }
            });
        }
        return null;
      }
    });
  }
  
  @ReactMethod
  public void startMetaWearModules() {    
    application.startModules();
  }

  @ReactMethod
  public void stopMetaWearModules() {
    application.stopModules();
  }

}
