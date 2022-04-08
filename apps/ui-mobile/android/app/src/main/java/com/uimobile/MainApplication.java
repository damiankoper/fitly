package com.uimobile;

import android.app.Application;
import android.content.Context;

// import com.facebook.react.BuildConfig;
import com.facebook.react.PackageList;
import com.facebook.react.ReactApplication;
import com.facebook.react.ReactInstanceManager;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.soloader.SoLoader;

import java.lang.reflect.InvocationTargetException;
import java.util.List;

import com.mbientlab.metawear.DeviceInformation;
import com.mbientlab.metawear.MetaWearBoard;
import com.mbientlab.metawear.android.BtleService;
import com.mbientlab.metawear.Route;
import com.mbientlab.metawear.Subscriber;
import com.mbientlab.metawear.data.Acceleration;
import com.mbientlab.metawear.data.AngularVelocity;
import com.mbientlab.metawear.data.MagneticField;
import com.mbientlab.metawear.module.Accelerometer;
import com.mbientlab.metawear.module.Gyro;
import com.mbientlab.metawear.module.MagnetometerBmm150;

import android.os.IBinder;
import android.util.Log;
import android.bluetooth.BluetoothDevice;
import android.bluetooth.BluetoothManager;
import android.content.ComponentName;
import android.content.Intent;
import android.content.ServiceConnection;

import bolts.Continuation;
import bolts.Task;

public class MainApplication extends Application implements ReactApplication, ServiceConnection {

	private BtleService.LocalBinder serviceBinder;
	private MetaWearBoard board;

  public MetaWearBoard getBoard(){
    return this.board;
  }

  public void setBoard(MetaWearBoard MWBoard){
    this.board = MWBoard;
  }

	private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
		@Override
		public boolean getUseDeveloperSupport() {
			return BuildConfig.DEBUG;
		}

		@Override
		protected List<ReactPackage> getPackages() {
			@SuppressWarnings("UnnecessaryLocalVariable")
			List<ReactPackage> packages = new PackageList(this).getPackages();
			// Packages that cannot be auto linked yet can be added manually here, for
			// example: packages.add(new MyReactNativePackage());
			packages.add(new UiMobilePackage());
			return packages;
		}

		@Override
		protected String getJSMainModuleName() {
			return "apps/ui-mobile/src/main";
		}
	};

	@Override
	public ReactNativeHost getReactNativeHost() {
		return mReactNativeHost;
	}

	@Override
	public void onCreate() {
		super.onCreate();
		SoLoader.init(this, /* native exopackage */ false);
		initializeFlipper(this, getReactNativeHost().getReactInstanceManager());

		getApplicationContext().bindService(new Intent(this, BtleService.class),
			this, Context.BIND_AUTO_CREATE);

	}

	@Override
	public void onServiceConnected(ComponentName name, IBinder service) {
		serviceBinder = (BtleService.LocalBinder) service;
	}

	@Override
	public void onServiceDisconnected(ComponentName componentName) {
	}

	public BluetoothManager getBluetoothManager() {
		return (BluetoothManager) getSystemService(Context.BLUETOOTH_SERVICE);
	}

	public BtleService.LocalBinder getBluetoothLocalBinder() {
		return this.serviceBinder;
	}

	public MetaWearBoard getMetaWearBoardFromDevice(BluetoothDevice remoteDevice) {
		if (this.serviceBinder != null) {
			return this.serviceBinder.getMetaWearBoard(remoteDevice);
		}
		Log.i("MainActivity", "ServiceBinder is Null");
		return null;
	}

	/**
	 * Loads Flipper in React Native templates. Call this in the onCreate method
	 * with something like initializeFlipper(this,
	 * getReactNativeHost().getReactInstanceManager());
	 *
	 * @param context
	 * @param reactInstanceManager
	 */
	private static void
	initializeFlipper(Context context,
					  ReactInstanceManager reactInstanceManager) {
		if (BuildConfig.DEBUG) {
			try {
        /*
         We use reflection here to pick up the class that initializes Flipper,
        since Flipper library is not available in release mode
        */
				Class<?> aClass = Class.forName("com.uimobile.ReactNativeFlipper");
				aClass
					.getMethod("initializeFlipper", Context.class,
						ReactInstanceManager.class)
					.invoke(null, context, reactInstanceManager);
			} catch (ClassNotFoundException e) {
				e.printStackTrace();
			} catch (NoSuchMethodException e) {
				e.printStackTrace();
			} catch (IllegalAccessException e) {
				e.printStackTrace();
			} catch (InvocationTargetException e) {
				e.printStackTrace();
			}
		}
	}
}

//public class MainApplication extends Application implements ReactApplication, ServiceConnection{
//
//  private BtleService.LocalBinder serviceBinder;
//  //private final String MW_MAC_ADDRESS = "D3:EB:B1:93:E7:55";
//  //private final String MW_MAC_ADDRESS = "F4:D6:5D:3E:78:D5";
//  private final String MW_MAC_ADDRESS = "F0:86:70:C3:93:87";
//
//  private MetaWearBoard board;
//  private Accelerometer accelerometer;
//  private Gyro gyroscope;
//  private MagnetometerBmm150 magnetometer;
//
//  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
//    @Override
//    public boolean getUseDeveloperSupport() {
//      return BuildConfig.DEBUG;
//    }
//
//    @Override
//    protected List<ReactPackage> getPackages() {
//      @SuppressWarnings("UnnecessaryLocalVariable")
//      List<ReactPackage> packages = new PackageList(this).getPackages();
//      // Packages that cannot be autolinked yet can be added manually here, for
//      // example: packages.add(new MyReactNativePackage());
//      packages.add(new MyAppPackage());
//      return packages;
//    }
//
//    @Override
//    protected String getJSMainModuleName() {
//      return "apps/ui-mobile/src/main";
//    }
//  };
//
//  @Override
//  public ReactNativeHost getReactNativeHost() {
//    return mReactNativeHost;
//  }
//
//  @Override
//  public void onCreate() {
//    super.onCreate();
//    SoLoader.init(this, /* native exopackage */ false);
//    initializeFlipper(this, getReactNativeHost().getReactInstanceManager());
//
//    // Bind the service when the activity is created
//    getApplicationContext().bindService(new Intent(this, BtleService.class),
//      this, Context.BIND_AUTO_CREATE);
//
//  }
//
//  @Override
//  public void onServiceConnected(ComponentName name, IBinder service) {
//    // Typecast the binder to the service's LocalBinder class
//    serviceBinder = (BtleService.LocalBinder) service;
//    //retrieveBoard();
//
//  }
//
//  @Override
//  public void onServiceDisconnected(ComponentName componentName) { }
//
//  public void retrieveBoard(String metaWearMacAddress) {
//    final BluetoothManager btManager=
//      (BluetoothManager) getSystemService(Context.BLUETOOTH_SERVICE);
//    final BluetoothDevice remoteDevice=
//      btManager.getAdapter().getRemoteDevice(metaWearMacAddress);
//
//    // Create a MetaWear board object for the Bluetooth Device
//    board = serviceBinder.getMetaWearBoard(remoteDevice);
//    Log.i("MainActivity", board.toString());
//
//    board.connectAsync().continueWith(new Continuation<Void, Void>() {
//      @Override
//      public Void then(Task<Void> task) throws Exception {
//        if (task.isFaulted()) {
//          Log.i("MainActivity", "Failed to connect");
//        } else {
//          Log.i("MainActivity", "Connected");
//          board.readDeviceInformationAsync()
//            .continueWith(new Continuation<DeviceInformation, Void>() {
//              @Override
//              public Void then(Task<DeviceInformation> task) throws Exception {
//                Log.i("MainActivity", "Device Information: " + task.getResult());
//                return null;
//              }
//            });
//          configModules();
//        }
//        return null;
//      }
//    });
//  }
//
//
//
//  /**
//   * Loads Flipper in React Native templates. Call this in the onCreate method
//   * with something like initializeFlipper(this,
//   * getReactNativeHost().getReactInstanceManager());
//   *
//   * @param context
//   * @param reactInstanceManager
//   */
//
//	public void retrieveBoard(String metaWearMacAddress) {
//		final BluetoothManager btManager =
//			(BluetoothManager) getSystemService(Context.BLUETOOTH_SERVICE);
//		final BluetoothDevice remoteDevice =
//			btManager.getAdapter().getRemoteDevice(metaWearMacAddress);
//
//		// Create a MetaWear board object for the Bluetooth Device
//		board = serviceBinder.getMetaWearBoard(remoteDevice);
//		Log.i("MainActivity", board.toString());
//
//		board.connectAsync().continueWith(new Continuation<Void, Void>() {
//			@Override
//			public Void then(Task<Void> task) throws Exception {
//				if (task.isFaulted()) {
//					Log.i("MainActivity", "Failed to connect");
//				} else {
//					Log.i("MainActivity", "Connected");
//					board.readDeviceInformationAsync()
//						.continueWith(new Continuation<DeviceInformation, Void>() {
//							@Override
//							public Void then(Task<DeviceInformation> task) throws Exception {
//								Log.i("MainActivity", "Device Information: " + task.getResult());
//								return null;
//							}
//						});
//					configModules();
//				}
//				return null;
//			}
//		});
//	}

