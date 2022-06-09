import { ActivitySession, ActivityTrackingMeta } from '@fitly/shared/meta';
import { Divider } from '@ui-kitten/components';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import LoadingScreen from '../components/loading-screen/LoadingScreen';
import { Interval } from 'luxon';
import { commonStyles } from '../assets/common/styles';
import uiControl from '../data';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { BottomTabParamList } from '../interfaces/BottomTabParamList';
import ActivitySessionSummaryCard from '../components/cards/activity-session-summary-card';
import { useIsFocused } from '@react-navigation/native';

export function getReadableDateStringFromInterval(interval: Interval): string {
  const startDate = interval.start;
  return startDate.toRelative() || '';
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
  const isFocused = useIsFocused();
  const [activitySessions, setActivitySessions] = useState<
    ActivitySession[] | null
  >(null);

  useEffect(() => {
    if (isFocused) {
      const newActivities = uiControl.getSessions();
      console.log(newActivities.length);

      setActivitySessions(newActivities);
    } else setActivitySessions(null);
  }, [isFocused]);

  if (activitySessions == null)
    return (
      <LoadingScreen subText="Loading previous activites. This might take a while. Please wait..." />
    );

  const dateMap = new Map<string, ActivitySession[]>();
  activitySessions.forEach((session) => {
    const key = session.interval.start.toRelativeCalendar() || '';
    const sessions = dateMap.get(key) || [];
    sessions.push(session);
    dateMap.set(key, sessions);
  });

  return (
    <View style={[styles.container]}>
      <Text style={commonStyles.title}>History</Text>
      {activitySessions.length === 0 ? (
        <View style={styles.loadingContainer}>
          <Text style={styles.headerText}>No exercises have been found!</Text>
          <Text style={styles.subtitleText}>
            We didn't find any previous activities.{'\n'} Wear a MetaWear band,
            select 'Exercise' tab,{'\n'} click desired activity and start
            working out!{'\n'}
            {'\n'}
            All of your exercises' recordings will appear here then!
          </Text>
        </View>
      ) : (
        [...dateMap.entries()].map(([key, sessions]) => (
          <React.Fragment key={key}>
            <View style={[styles.textAndDividerContainer, styles.marginTop]}>
              <Text style={styles.dateText}>{key}</Text>
              <Divider style={styles.divider} />
            </View>
            {sessions.map((session) => (
              <View key={session.id} style={styles.cardWrapper}>
                <ActivitySessionSummaryCard
                  activitySession={session}
                  onPress={() =>
                    navigation.navigate('ExerciseResultsScreen', {
                      activitySession: session,
                    })
                  }
                />
              </View>
            ))}
          </React.Fragment>
        ))
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  loadingContainer: {
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textAndDividerContainer: {
    flex: 1,
    alignItems: 'flex-start',
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
