import React from 'react';
import { Text, Icon } from '@ui-kitten/components';
import { StyleSheet, Image, View } from 'react-native';
import { commonStyles } from '../../assets/common/styles';
import ManIcon from '../../assets/images/man.png';
import DropShadowWrapper from '../gradients/drop-shadow';
import { Themes } from '../gradients/themes';

interface Props {
  name: string;
  title?: string;
  theme?: Themes;
}
export const UserCard: React.FC<Props> = ({ name, title, theme }) => {
  return (
    <DropShadowWrapper shadowColorTheme={theme}>
      <View style={[commonStyles.defaultBorder, styles.container]}>
        <Image source={ManIcon} style={[styles.iconUser]} />
        <View>
          <Text style={styles.userFullname}>{name}</Text>
          {!title || (
            <View style={styles.titleContainer}>
              <Icon name="award-outline" style={styles.iconBadge} />
              <Text style={styles.titleText}>{title}</Text>
            </View>
          )}
        </View>
      </View>
    </DropShadowWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: 'white',
  },
  userFullname: {
    textAlign: 'right',
    fontSize: 26,
    fontFamily: 'RobotoSlab-Bold',
    letterSpacing: 1,
  },
  titleContainer: {
    textAlign: 'right',
    justifyContent: 'flex-end',
    flexDirection: 'row',
    height: 25,
  },
  titleText: {
    color: '#C1C1C1',
    top: 3,
    marginLeft: 8,
    fontFamily: 'Roboto',
    letterSpacing: 1,
  },
  iconUser: {
    width: 48,
    aspectRatio: 1,
    marginRight: 8,
  },
  iconBadge: {
    width: 25,
    height: 25,
    shadowColor: 'transparent',
    elevation: 2,
    color: '#3366FF',
    aspectRatio: 1,
  },
});
