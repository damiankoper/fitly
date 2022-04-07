import { NativeModules } from 'react-native';
import { NativeModulesInterface } from '../interfaces/NativeModulesInterface';
const { BluetoothModule } = NativeModules as NativeModulesInterface;

export default BluetoothModule;
