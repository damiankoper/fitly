import { ActivitySession, ActivityTrackingMeta } from '@fitly/shared/meta';
import { Divider, Layout } from '@ui-kitten/components';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import { ActivityCardLarge } from '../components/cards/activity-card-large';
import LoadingScreen from '../components/loading-screen/LoadingScreen';
import humanizeDuration from 'humanize-duration';
import { Interval } from 'luxon';
import { commonStyles } from '../assets/common/styles';
import uiControl from '../data';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { BottomTabParamList } from '../interfaces/BottomTabParamList';
import ActivitySessionSummaryCard from '../components/cards/activity-session-summary-card';
const SHOW_DATE_AFTER_DAYS_DIFFERENCE = 34;

export function getReadableDateStringFromInterval(interval: Interval): string {
  const startDate = interval.start;
  const duration = startDate.diffNow();
  const durationInSeconds = Math.abs(duration.shiftTo('seconds').seconds);
  const durationInDays = Math.abs(duration.shiftTo('days').days);
  const durationInDaysRounded = Math.floor(durationInDays);

  if (durationInDaysRounded === 1) return 'Yesterday';
  if (
    durationInDaysRounded >= 2 &&
    durationInDaysRounded < SHOW_DATE_AFTER_DAYS_DIFFERENCE
  ) {
    return `${durationInDaysRounded} days ago`;
  }
  if (durationInDaysRounded >= SHOW_DATE_AFTER_DAYS_DIFFERENCE) {
    return startDate.setLocale('en-gb').toLocaleString({
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  }
  return (
    humanizeDuration(durationInSeconds, {
      largest: 1,
      units: ['mo', 'w', 'd', 'h', 'm', 's'],
      round: true,
    }) + ' ago'
  );
}

export function getTimeDurationFromInterval(interval: Interval): string {
  const duration = interval.toDuration('minutes');

  const roundedHours = Math.floor(duration.shiftTo('hours').hours);
  if (roundedHours >= 1) return duration.toFormat('hh:mm:ss');

  const roundedMinutes = Math.floor(duration.shiftTo('minutes').minutes);
  if (roundedMinutes >= 1) return duration.toFormat('mm:ss');

  return duration.toFormat('ss') + 's';
}

export function getCaloriesFromActivityMetaAndUserWeight(
  { type, interval }: ActivityTrackingMeta,
  userWeight: number
) {
  const minutesOfActivity = interval.toDuration().shiftTo('minutes').minutes;
  const caloriesRaw = uiControl.calculateCalories(
    type,
    userWeight,
    minutesOfActivity
  );

  return Math.round(caloriesRaw);
}

type HistoryScreenProps = BottomTabScreenProps<BottomTabParamList, 'History'>;

export const HistoryScreen: React.FC<HistoryScreenProps> = ({ navigation }) => {
  const [activitySessions, setActivitySessions] = useState<
    ActivitySession[] | null
  >(null);

  useEffect(() => {
    const newActivities = uiControl.getSessions();
    setActivitySessions(newActivities);
  }, []);

  const isFirstItem = (position: number): boolean => position === 0;

  const handleActivityPress = (activitySession: ActivitySession) => () => {
    navigation.navigate('ExerciseResultsScreen', { activitySession });
  };

  if (activitySessions == null)
    return (
      <LoadingScreen subText="Loading previous activites. This might take a while. Please wait..." />
    );

  return (
    <ScrollView style={[styles.container, styles.height100]}>
      <Text style={commonStyles.title}>History</Text>
      {activitySessions.length === 0 ? (
        <View style={styles.loadingContainer}>
          <Text style={styles.headerText}>No exercises has been found!</Text>
          <Text style={styles.subtitleText}>
            We didn't find any previous activities.{'\n'} Wear a MetaWear band,
            select 'Exercise' tab,{'\n'} click desired activity and start
            working out!{'\n'}
            {'\n'}
            All of your exercises' recordings will appear here then!
          </Text>
        </View>
      ) : (
        activitySessions.map((session, index) => {
          return (
            <React.Fragment key={session.id}>
              <View
                style={[
                  styles.textAndDividerContainer,
                  isFirstItem(index) ? undefined : styles.marginTop,
                ]}
              >
                <Text style={styles.dateText}>
                  {getReadableDateStringFromInterval(session.interval)}
                </Text>
                <Divider style={styles.divider} />
              </View>
              <View key={index} style={styles.cardWrapper}>
                <ActivitySessionSummaryCard
                  activitySession={session}
                  onPress={handleActivityPress(session)}
                />
              </View>
            </React.Fragment>
          );
        })
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {},
  height100: {
    height: '100%',
  },
  loadingContainer: {
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textAndDividerContainer: {
    flex: 1,
    alignContent: 'stretch',
    justifyContent: 'center',
    flexWrap: 'nowrap',
    flexDirection: 'row',
    marginBottom: 4,
  },
  headerText: {
    flex: 1,
    fontSize: 20,
    fontFamily: 'RobotoSlab-Medium',
    textAlign: 'center',
    color: '#555',
  },
  divider: {
    flex: 2,
    alignItems: 'center',
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: '#eee',
    marginBottom: 4,
    marginLeft: 8,
    marginRight: 20,
  },
  subtitleText: {
    fontSize: 16,
    fontFamily: 'Roboto-Regular',
    textAlign: 'center',
    color: '#c0c0c0',
  },
  dateText: {
    color: '#a1a1a1',
    fontFamily: 'RobotoSlab-Medium',
    fontSize: 16,
    marginBottom: 8,
    marginLeft: 16,
  },
  marginTop: {
    marginTop: 16,
  },
  cardWrapper: {
    marginBottom: 16,
  },
});
