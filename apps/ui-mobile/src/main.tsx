import * as PopoverView from '@ui-kitten/components/ui/popover/popoverView.component';
import * as Components from '@ui-kitten/components';
import { AppRegistry } from 'react-native';
import App from './app/App';

AppRegistry.registerComponent('main', () => App);

// reflect-metadata and ui-kitten incompatibility workaround
// import * as Components from '@ui-kitten/components'; has to be before import of
// reflect metadata. Line below prevents from tree shaking import.
/* eslint-disable  @typescript-eslint/no-unused-expressions */
//console.log(PopoverView);
Components;
PopoverView;
