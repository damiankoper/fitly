package com.uimobile;
import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.uimanager.ViewManager;
import com.uimobile.modules.BluetoothModule;
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

    modules.add(new MetaWearModule(reactContext));
    modules.add(new BluetoothModule(reactContext));
    return modules;
  }

}
