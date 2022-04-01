import React, { useState } from 'react';
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

export const BottomNav: React.FC = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  return (
    <BottomNavigation
      selectedIndex={selectedIndex}
      onSelect={(index) => setSelectedIndex(index)}
    >
      <BottomNavigationTab icon={HomeIcon} title="Home" />
      <BottomNavigationTab icon={ExerciseIcon} title="Exercise" />
      <BottomNavigationTab icon={GuessIcon} title="Guess" />
      <BottomNavigationTab icon={HistoryIcon} title="History" />
      <BottomNavigationTab icon={SettingsIcon} title="Settings" />
    </BottomNavigation>
  );
};
