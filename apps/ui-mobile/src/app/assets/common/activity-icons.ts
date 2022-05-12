import { ActivityType } from '@fitly/shared/meta';
import SquatIcon from '../images/002-squat.png';
import PushupIcon from '../images/001-workout.png';
import SitupIcon from '../images/004-sit-up.png';
import StarJumpIcon from '../images/003-workout-1.png';
import QuestionIcon from '../images/question-mark.png';

export const ActivityIcons: { [key in ActivityType]: typeof import('*.png') } =
	{
		[ActivityType.UNKNOWN]: QuestionIcon,
		[ActivityType.PUSHUPS]: PushupIcon,
		[ActivityType.SITUPS]: SitupIcon,
		[ActivityType.SQUATS]: SquatIcon,
		[ActivityType.STAR_JUMPS]: StarJumpIcon,
	};
