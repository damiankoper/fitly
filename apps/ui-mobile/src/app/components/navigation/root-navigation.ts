import { NavigationContainerRef } from '@react-navigation/native';
import * as React from 'react';

export const navigationRef =
	React.createRef<NavigationContainerRef<ReactNavigation.RootParamList>>();

export function navigate(name: string) {
	//@ts-ignore
	navigationRef.current?.navigate(name);
}
