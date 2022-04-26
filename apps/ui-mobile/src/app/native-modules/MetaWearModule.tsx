import { IMetaMearModule } from '@fitly/ui-metawear';
import { NativeModules } from 'react-native';

const { MetaWearModule } = NativeModules;
export default MetaWearModule as IMetaMearModule;
