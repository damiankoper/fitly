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
  const bestType = uiControl.getSessionActivityType(activitySession);
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
