import React from 'react';
import { View, StyleSheet, StyleProp, ViewStyle, Image } from 'react-native';
import { Text } from '@ui-kitten/components';
import { commonStyles } from '../../assets/common/styles';
import DropShadowWrapper from '../gradients/drop-shadow';
import { Themes } from '../gradients/themes';
import { formatActivityString } from '../../common/utils';
import QuestionIcon from '../../assets/images/question-mark.png';

interface Props {
  data: string | number;
  activity: string;
  theme?: Themes;
  style?: StyleProp<ViewStyle>;
  empty?: boolean;
}

export const DataCardSmall: React.FC<Props> = ({
  data,
  activity,
  theme,
  style,
  empty,
}) => {
  const formattedActivity = formatActivityString(activity, false);

  return (
    <DropShadowWrapper shadowColorTheme={theme} style={style}>
      <View style={[commonStyles.defaultBorder, styles.container]}>
        {!empty && (
          <>
            <Text style={styles.data}>
              {data}
              <Text style={styles.percent}>%</Text>
            </Text>
            <Text style={styles.smallText}>
              of{' '}
              <Text style={styles.primaryText} status="primary">
                {formattedActivity}
              </Text>
            </Text>
          </>
        )}
        {empty && (
          <Image style={{ height: 60, aspectRatio: 1 }} source={QuestionIcon} />
        )}
      </View>
    </DropShadowWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 12,
    backgroundColor: 'white',
  },
  data: {
    fontSize: 24,
    fontWeight: '700',
  },
  smallText: {
    fontSize: 12,
    lineHeight: 12,
    textAlign: 'center',
  },
  primaryText: {
    fontSize: 12,
    textAlign: 'center',
    fontFamily: 'RobotoSlab-Bold',
  },
  percent: {
    fontSize: 20,
  },
});
