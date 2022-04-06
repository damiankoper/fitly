import { Text, Icon, useTheme } from '@ui-kitten/components';
import React from 'react';
import { StyleSheet, Image, View } from 'react-native';

interface Props {
  name: string;
  title: string;
}

export const UserCard: React.FC<Props> = ({ name, title }) => {
  const theme = useTheme();

  return (
    <View style={styles.container}>
      <Image source={require('../../assets/images/user-avatar.png')} />
      <View>
        <Text style={styles.name}>{name}</Text>
        <View style={styles.titleContainer}>
          <Icon
            name="award-outline"
            style={styles.icon}
            fill={theme['color-primary-default']}
          />
          <Text>{title}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    height: 80,
    borderRadius: 4,
    borderColor: 'lightgray',
    borderWidth: 1,
  },
  name: {
    fontSize: 20,
    fontWeight: '700',
  },
  titleContainer: {
    flexDirection: 'row',
  },
  icon: {
    width: 24,
    height: 24,
  },
});
