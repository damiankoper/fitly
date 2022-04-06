import { NativeModules } from 'react-native';
import { NativeModulesInterface } from '../interfaces/NativeModulesInterface';

const { MetaWearModule } = NativeModules as NativeModulesInterface;
export default MetaWearModule;
