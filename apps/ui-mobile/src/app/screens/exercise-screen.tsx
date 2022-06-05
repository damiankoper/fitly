import { ActivityType } from '@fitly/shared/meta';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { Layout, Text as TextUi } from '@ui-kitten/components';
import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { ActivityButton } from '../components/cards/activity-button';
import { BottomTabParamList } from '../interfaces/BottomTabParamList';

type NavProps = BottomTabScreenProps<BottomTabParamList, 'Exercise'>;

export const ExerciseScreen: React.FC<NavProps> = ({ navigation }) => {
  const exercises = Object.values(ActivityType).filter(
    (v) => v !== ActivityType.UNKNOWN
  );

  return (
    <Layout style={styles.layoutWrapper}>
      <Text style={styles.title}>Choose activity</Text>
      <Text style={styles.subtitle}>
        Choose activity that you wish to record.
      </Text>
      <Text style={styles.subtitle}>
        You will see Recording View in next view, after you choose type of your
        exercise!
      </Text>
      <View style={styles.divider} />
      <View style={styles.flexLayout}>
        {exercises.map((ex, i) => (
          <View style={styles.cardWrapper} key={i}>
            <ActivityButton
              activity={ex}
              key={ex}
              onPress={() =>
                navigation.navigate('ExerciseCounterScreen', {
                  activity: ex,
                })
              }
            />
          </View>
        ))}
      </View>
    </Layout>
  );
};

const styles = StyleSheet.create({
  layoutWrapper: { alignItems: 'center' },
  title: {
    fontFamily: 'RobotoSlab-Bold',
    fontSize: 32,
    color: 'black',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    textAlign: 'center',
  },
  divider: {
    borderTopColor: '#eaeaea',
    borderTopWidth: 1,
    width: '100%',
    marginBottom: 16,
    marginTop: 16,
  },
  cardWrapper: {
    flex: 1,
    minWidth: '40%',
    margin: 8,
    aspectRatio: 1,
  },
  flexLayout: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
    flexDirection: 'row',
    flexWrap: 'wrap',
    margin: -8,
  },
});
