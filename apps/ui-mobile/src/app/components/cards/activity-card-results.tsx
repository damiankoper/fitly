import React from 'react';
import { ActivityType } from '@fitly/shared/meta';
import { StyleSheet, View } from 'react-native';
import { commonStyles } from '../../assets/common/styles';
import DropShadowWrapper from '../gradients/drop-shadow';
import { Themes } from '../gradients/themes';
import { ActivityCardSmall } from './activity-card-small';
import LinearGradient from 'react-native-linear-gradient';
import { useTheme } from '@ui-kitten/components';

interface Props {
  activity: ActivityType;
  theme?: Themes;
  subtitle?: string;
}

export const ActivityCardResults: React.FC<Props> = ({
  activity,
  subtitle,
}) => {
  const theme = useTheme();
  return (
    <DropShadowWrapper>
      <View
        style={[
          commonStyles.defaultBorder,
          styles.container,
          { backgroundColor: theme['color-primary-400'] },
        ]}
      >
        <ActivityCardSmall
          activity={activity}
          subtitle={subtitle}
          color="white"
        />
      </View>
    </DropShadowWrapper>
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
