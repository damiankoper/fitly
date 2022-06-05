import { UiControl } from '@fitly/ui-control';
import { DeviceInfo } from '../../events/bluetooth-module.listener';
import uiControl from 'apps/ui-mobile/src/app/data';

export interface AppState {
  status: {
    isRestoringConnection: boolean;
  };
  connectedDevice: DeviceInfo | null;
}

export const initialAppState: AppState = {
  connectedDevice: null,
  status: {
    isRestoringConnection: true,
  },
};
