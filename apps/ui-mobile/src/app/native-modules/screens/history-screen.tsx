import { ActivitySession, ActivityType } from '@fitly/shared/meta';
import { Divider, Layout, Text as TextUI } from '@ui-kitten/components';
import uiControl from 'apps/ui-mobile/data';
import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, View, Text } from 'react-native';
import { ActivityCardLarge } from '../../components/cards/activity-card-large';
import LoadingScreen from '../../components/loading-screen/LoadingScreen';
import humanizeDuration from 'humanize-duration';
import { DateTime, Duration } from 'luxon';
const SHOW_DATE_AFTER_DAYS_DIFFERENCE = 34;

function getDateOrDateDurationString(
  duration: Duration,
  date?: DateTime
): string {
  const absDuration = Duration.fromMillis(
    Math.abs(duration.milliseconds)
  ).shiftTo('days');
  const differenceInDays = Math.floor(absDuration.days);

  console.log(differenceInDays);

  if (differenceInDays === 1) return 'Yesterday';

  if (
    differenceInDays >= SHOW_DATE_AFTER_DAYS_DIFFERENCE &&
    date !== undefined
  ) {
    return date.setLocale('en-gb').toLocaleString({
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  }
  return (
    humanizeDuration(absDuration, {
      largest: 1,
      units: ['mo', 'w', 'd', 'h'],
      round: true,
    }) + ' ago'
  );
}

function getTimeDuration(duration: Duration): string {
  const roundedHours = Math.floor(duration.shiftTo('hours').hours);
  if (roundedHours >= 1) return duration.toFormat('hh:mm:ss');

  const roundedMinutes = Math.floor(duration.shiftTo('minutes').minutes);
  if (roundedMinutes >= 1) return duration.toFormat('mm:ss');

  return duration.toFormat('ss') + 's';
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

  if (activities == null)
    return (
      <LoadingScreen subText="Loading previous activites. This might take a while. Please wait..." />
    );

  return (
    <Layout style={styles.container}>
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
                    index !== 0 ? styles.marginTop : undefined,
                  ]}
                >
                  <Text style={styles.dateText}>
                    {getDateOrDateDurationString(
                      interval.start.diffNow(),
                      interval.start
                    )}
                  </Text>
                  <Divider style={styles.divider} />
                </View>
                {activities.map(({ interval, repeats, type }, index) => {
                  const calories = Math.round(
                    uiControl.calculateCalories(
                      type,
                      userWeight,
                      interval.toDuration().shiftTo('minutes').minutes
                    )
                  );
                  return (
                    <View key={index} style={styles.cardWrapper}>
                      <ActivityCardLarge
                        activity={type}
                        count={repeats}
                        time={getTimeDuration(interval.toDuration('seconds'))}
                        kcal={calories}
                        date={getDateOrDateDurationString(
                          interval.start.diffNow(),
                          interval.start
                        )}
                        theme="primary"
                      />
                    </View>
                  );
                })}
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
