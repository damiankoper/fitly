import React from 'react';
import { ActivityType } from '@fitly/shared/meta';
import { StyleSheet, View } from 'react-native';
import { ActivityIcon } from '../icons/activity-icon';
import { commonStyles } from '../../assets/common/styles';
import DropShadowWrapper from '../gradients/drop-shadow';
import LinearGradientCard from '../gradients/linear-gradient-card';
import { Themes } from '../gradients/themes';
import { Text } from 'react-native';
import { DataCardLarge } from './data-card-large';
import { CaloriesIcon } from '../../native-modules/screens/home-screen';
import { ActivityCardSmall } from './activity-card-small';
import LinearGradient from 'react-native-linear-gradient';

interface Props {
  activity: ActivityType;
  theme?: Themes;
}

function capitalize(str: string) {
  return `${str.substring(0, 1).toUpperCase()}${str
    .substring(1)
    .toLowerCase()}`;
}

export const ActivityCardResults: React.FC<Props> = ({ activity, theme }) => {
  return (
    <LinearGradient
      locations={[0, 1]}
      colors={['#9EB6FF', '#6B90FF']}
      style={[commonStyles.defaultBorder]}
    >
      <View style={[commonStyles.defaultBorder, styles.container]}>
        <View style={styles.resultContainer}>
          <Text style={styles.resultsText}>{capitalize(activity)}</Text>
          <Text style={styles.subtitle}>Type of activity</Text>
        </View>
        <ActivityIcon activity={activity} large={false} />
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  resultsText: {
    fontFamily: 'RobotoSlab-Bold',
    letterSpacing: 1,
    fontSize: 28,
    color: 'white',
  },
  chartContainer: {},
  container: {
    flexDirection: 'row',
    padding: 16,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  subtitle: {
    fontSize: 16,
    fontFamily: 'Roboto-Regular',
    color: '#F0F0F0',
  },
  resultContainer: {
    flexWrap: 'nowrap',
    flexDirection: 'column',
  },
});
