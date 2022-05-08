import React, { useEffect, useState } from 'react';
import {
	BottomNavigation,
	BottomNavigationTab,
	Icon,
} from '@ui-kitten/components';

const HomeIcon = (props) => <Icon {...props} name="home-outline" />;

const ExerciseIcon = (props) => <Icon {...props} name="activity-outline" />;

const GuessIcon = (props) => <Icon {...props} name="radio-button-on-outline" />;

const HistoryIcon = (props) => <Icon {...props} name="bar-chart-outline" />;

const SettingsIcon = (props) => <Icon {...props} name="settings-outline" />;

export const BottomNav = ({ navigation, state }) => {
  const [customNavState, setCustomNavState] = useState<number>(state.index);
  useEffect(() => {
    if (state.index !== customNavState) {
      if (state.index > 3 && state.index < 10) {
        setCustomNavState(4);
      } else if (state.index == 10 || state.index == 11){
        setCustomNavState(1);
      }
      else {
        setCustomNavState(state.index);
      }
    }
  }, [state.index]);
  return (
    <BottomNavigation
      selectedIndex={customNavState}
      onSelect={(index) => navigation.navigate(state.routeNames[index])}
    >
      <BottomNavigationTab icon={HomeIcon} title="Home" />
      <BottomNavigationTab icon={ExerciseIcon} title="Exercise" />
      <BottomNavigationTab icon={GuessIcon} title="Guess" />
      <BottomNavigationTab icon={HistoryIcon} title="History" />
      <BottomNavigationTab icon={SettingsIcon} title="Settings" />
    </BottomNavigation>
  );
};
