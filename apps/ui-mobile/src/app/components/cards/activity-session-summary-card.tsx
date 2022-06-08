import { ActivitySession, ActivityType } from '@fitly/shared/meta';
import { DateTime } from 'luxon';
import React from 'react';
import uiControl from '../../data';
import { getTimeDurationFromInterval } from '../../screens/history-screen';
import { ActivityCardLarge } from './activity-card-large';

export interface ActivitySessionSummaryCardProps {
  activitySession: ActivitySession;
  onPress?: () => void;
  subtitle?: string;
}

const ActivitySessionSummaryCard: React.FC<ActivitySessionSummaryCardProps> = ({
  activitySession,
  onPress,
  subtitle,
}) => {
  const map = activitySession.activities.reduce(
    (acc, e) => acc.set(e.type, (acc.get(e.type) || 0) + 1),
    new Map<ActivityType, number>()
  );
  let bestType = ActivityType.UNKNOWN;
  let bestTypeCount = 0;
  [...map.entries()].forEach(([type, count]) => {
    if (bestTypeCount < count) {
      bestTypeCount = count;
      bestType = type;
    }
  });

  const sessionSummary = uiControl.getSessionSummary(activitySession);

  return (
    <ActivityCardLarge
      activity={bestType}
      count={sessionSummary?.repeats || 0}
      time={getTimeDurationFromInterval(activitySession.interval)}
      kcal={sessionSummary?.calories || 0}
      date={(sessionSummary?.timestamp || new Date()).toLocaleString(
        'pl',
        DateTime.DATETIME_SHORT
      )}
      onPress={onPress}
      subtitle={subtitle}
    />
  );
};

export default ActivitySessionSummaryCard;
