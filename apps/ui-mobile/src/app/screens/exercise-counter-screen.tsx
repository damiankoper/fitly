import React from 'react';
import { ActivityType } from '@fitly/shared/meta';
import { Layout, Text } from '@ui-kitten/components';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { BottomTabParamList } from '../interfaces/BottomTabParamList';


type NavProps = BottomTabScreenProps<BottomTabParamList, 'ExerciseCounterScreen'>;

export const ExerciseCounterScreen: React.FC<NavProps> = ({ route }) => {
  const { activity } = route.params;

  return (
    <Layout>
      <Text>{activity}</Text>
    </Layout>
  );
};
