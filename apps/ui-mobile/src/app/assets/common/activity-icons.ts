import { ActivityType } from '@fitly/shared/meta';
import SquatIcon from '../images/squats.png';

export const ActivityIcons: { [key in ActivityType]: typeof import('*.png') } =
  {
    [ActivityType.UNKNOWN]: SquatIcon,
    [ActivityType.PUSHUPS]: SquatIcon,
    [ActivityType.SITUPS]: SquatIcon,
    [ActivityType.SQUATS]: SquatIcon,
    [ActivityType.STAR_JUMPS]: SquatIcon,
  };
