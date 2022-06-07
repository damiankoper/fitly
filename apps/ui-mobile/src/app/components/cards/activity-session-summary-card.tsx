import { ActivitySession } from '@fitly/shared/meta';
import React from 'react';
import uiControl from '../../data';
import { prettyPrintDateString } from '../../screens/exercise-results-screen';
import { getTimeDurationFromInterval } from '../../screens/history-screen';
import { ActivityCardLarge } from './activity-card-large';

export interface ActivitySessionSummaryCardProps {
  activitySession: ActivitySession;
  onPress?: () => void;
}

const ActivitySessionSummaryCard: React.FC<ActivitySessionSummaryCardProps> = ({
  activitySession,
  onPress,
}) => {
  const firstActivity = activitySession.activities[0];
  const sessionSummary = uiControl.getSessionSummary(activitySession);

  return (
    <ActivityCardLarge
      activity={firstActivity.type}
      count={sessionSummary?.repeats || 0}
      time={getTimeDurationFromInterval(activitySession.interval)}
      kcal={sessionSummary?.calories || 0}
      date={prettyPrintDateString(sessionSummary?.timestamp || new Date())}
      onPress={onPress}
    />
  );
};

export default ActivitySessionSummaryCard;
