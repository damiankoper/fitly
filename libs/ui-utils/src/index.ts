import {
  ActivitySession,
  ActivityTrackingMeta,
  ActivityType,
} from '@fitly/shared/meta';
import { Interval } from 'luxon';
import { ToastAndroid } from 'react-native';

export function showNotification(message: string) {
  ToastAndroid.show(message, ToastAndroid.SHORT);
}

export interface ActivityTrackingMetaRaw {
  interval: string;
  uuid: string;
  type: ActivityType;
  repeats: number;
}

export interface ActivitySessionRaw {
  interval: string;
  activities: ActivityTrackingMetaRaw[];
  id: number;
}

export function serializeMeta(
  meta: ActivityTrackingMeta
): ActivityTrackingMetaRaw {
  return {
    ...meta,
    interval: meta.interval.toISO(),
  };
}

export function parseMeta(meta: ActivityTrackingMetaRaw): ActivityTrackingMeta {
  return new ActivityTrackingMeta(
    meta.uuid,
    Interval.fromISO(meta.interval),
    meta.type,
    meta.repeats
  );
}

export function serializeSession(session: ActivitySession): ActivitySessionRaw {
  return {
    ...session,
    interval: session.interval.toISO(),
    activities: session.activities.map((meta) => serializeMeta(meta)),
  };
}

export function parseSession(session: ActivitySessionRaw): ActivitySession {
  console.log(session.interval);

  return new ActivitySession(
    Interval.fromISO(session.interval),
    session.activities.map((meta) => parseMeta(meta)),
    session.id
  );
}
