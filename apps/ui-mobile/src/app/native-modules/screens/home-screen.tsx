import { Icon, Layout, useTheme } from '@ui-kitten/components';
import React from 'react';
import { UserCard } from '../../components/cards/user-card';
import { StyleSheet, View, ScrollView, Text } from 'react-native';
import { DataCardLarge } from '../../components/cards/data-card-large';
import { BluetoothStatus } from '../../components/icons/bluetooth-status';
import { DataCardSmall } from '../../components/cards/data-card-small';
import { ActivityCardLarge } from '../../components/cards/activity-card-large';
import { ActivityType } from '@fitly/shared/meta';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { BottomTabParamList } from '../../interfaces/BottomTabParamList';
import ActivityLineChart from '../../components/charts/ActivityLineChart';
import DropShadowWrapper from '../../components/gradients/drop-shadow';

export const StepsIcon = () => {
  const theme = useTheme();

  return (
    <Icon
      name="pin-outline"
      style={styles.icon}
      fill={theme['color-primary-default']}
    />
  );
};

export const CaloriesIcon = () => {
  const theme = useTheme();

  return (
    <Icon
      name="flash-outline"
      style={styles.icon}
      fill={theme['color-danger-default']}
    />
  );
};

export const TimeIcon = () => {
  const theme = useTheme();

  return (
    <Icon
      name="clock-outline"
      style={styles.icon}
      fill={theme['color-basic-700']}
    />
  );
};

export const HomeScreen: React.FC<{}> = () => {
  return (
    <Layout>
      <ScrollView contentContainerStyle={styles.defaultPadding}>
        <UserCard name="Jan Nikodem" title="Master of squats" />
        <ActivityLineChart />
        <View style={[styles.cardRow, styles.overflowVisible]}>
          <View
            style={[
              styles.cardColumn,
              styles.leftColumn,
              styles.overflowVisible,
            ]}
          >
            <DataCardLarge
              Icon={StepsIcon}
              name="Steps"
              quantity={2137}
              theme="primary"
            />
            <DataCardLarge
              Icon={CaloriesIcon}
              name="Calories"
              quantity={1690}
              theme="danger"
            />
          </View>
          <View style={[styles.cardColumn, styles.rightColumn]}>
            <View style={styles.smallCardRow}>
              <BluetoothStatus
                touchable
                touchableStyles={styles.bluetoothWrapper}
                renderOverlay
                renderSubText
                iconSize="large"
              />
              <View style={styles.separator} />
              <DataCardSmall
                data="45"
                activity="Running"
                style={styles.activitiesWrapper}
              />
            </View>
            <DataCardLarge
              Icon={TimeIcon}
              name="Time spent"
              quantity={3723}
              theme="basic"
            />
            <View style={styles.separator} />
          </View>
        </View>

        <View style={styles.bottomCard}>
          <ActivityCardLarge
            theme={'primary'}
            activity={ActivityType.SQUATS}
            date="Yesterday, 8 Mar"
            kcal={231}
            time="2:32"
            count={31}
          />
        </View>
      </ScrollView>
    </Layout>
  );
};

const styles = StyleSheet.create({
  defaultPadding: {
    padding: 16,
    overflow: 'visible',
  },
  placeholder: {
    marginVertical: 16,
    height: 170,
  },
  cardColumn: {
    flex: 1,
    height: 170,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  bluetoothWrapper: {
    flex: 1,
    width: '50%',
    padding: 0,
  },
  activitiesWrapper: {
    width: '50%',
  },
  leftColumn: {
    marginRight: 4,
  },
  rightColumn: {
    marginLeft: 4,
  },
  cardRow: {
    flexDirection: 'row',
    flex: 1,
    height: 170,
  },
  icon: {
    height: 40,
    width: 40,
  },
  smallCardRow: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  separator: {
    width: 8,
  },
  bottomCard: {
    marginVertical: 21,
  },
  overflowVisible: {
    overflow: 'visible',
  },
});
