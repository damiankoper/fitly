import {
  ActivitySession,
  ActivityTrackingMeta,
  ActivityType,
} from '@fitly/shared/meta';
import { Divider, Layout, Text as TextUI } from '@ui-kitten/components';
import uiControl from 'apps/ui-mobile/data';
import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, View, Text } from 'react-native';
import { ActivityCardLarge } from '../../components/cards/activity-card-large';
import LoadingScreen from '../../components/loading-screen/LoadingScreen';
import humanizeDuration from 'humanize-duration';
import { Interval } from 'luxon';
const SHOW_DATE_AFTER_DAYS_DIFFERENCE = 34;

export function getReadableDateStringFromInterval(interval: Interval): string {
  const startDate = interval.start;
  const duration = startDate.diffNow();
  const durationInSeconds = Math.abs(duration.shiftTo('seconds').seconds);
  const durationInDays = Math.abs(duration.shiftTo('days').days);
  const durationInDaysRounded = Math.floor(durationInDays);

  if (durationInDaysRounded === 1) return 'Yesterday';

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
  console.log(interval.start, interval.end);

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

export const HistoryScreen = () => {
  const [activities, setActivities] = useState<ActivitySession[] | null>(null);
  const [userWeight, setUserWeight] = useState<number>(0);

  useEffect(() => {
    const newActivities = uiControl.getSessions();
    const newUserWeight = uiControl.getUser()?.weight;
    setActivities(newActivities);
    setUserWeight(newUserWeight || 0);
  }, []);

  const isFirstItem = (position: number): boolean => position === 0;

  if (activities == null)
    return (
      <LoadingScreen subText="Loading previous activites. This might take a while. Please wait..." />
    );

  return (
    <Layout style={[styles.container, styles.height100]}>
      {activities.length === 0 ? (
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
        <ScrollView contentContainerStyle={styles.container}>
          {activities.map(({ id, interval, activities }, index) => {
            return (
              <React.Fragment key={id}>
                <View
                  style={[
                    styles.textAndDividerContainer,
                    isFirstItem(index) ? undefined : styles.marginTop,
                  ]}
                >
                  <Text style={styles.dateText}>
                    {getReadableDateStringFromInterval(interval)}
                  </Text>
                  <Divider style={styles.divider} />
                </View>
                {activities.map((activity, index) => (
                  <View key={index} style={styles.cardWrapper}>
                    <ActivityCardLarge
                      activity={activity.type}
                      count={activity.repeats}
                      time={getTimeDurationFromInterval(interval)}
                      kcal={getCaloriesFromActivityMetaAndUserWeight(
                        activity,
                        userWeight
                      )}
                      date={getReadableDateStringFromInterval(
                        activity.interval
                      )}
                      theme="primary"
                    />
                  </View>
                ))}
              </React.Fragment>
            );
          })}
        </ScrollView>
      )}
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 8,
    paddingRight: 12,
    paddingLeft: 12,
    overflow: 'visible',
  },
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
  },
  headerText: {
    flex: 1,
    fontSize: 21,
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
    marginLeft: 10,
    marginRight: 15,
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
    fontSize: 18,
    marginBottom: 8,
    marginLeft: 14,
  },
  marginTop: {
    marginTop: 15,
  },
  cardWrapper: {
    marginBottom: 8,
  },
});
