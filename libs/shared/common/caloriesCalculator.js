import ActivityType from '../meta/src/lib/enums/activityType.enum'

function calculateCalories(activityType, weight, duration) {

    // Metabolic equivalent for task
    let met = 0;

    switch(activityType)
    {
        case ActivityType.SITUPS:
            met = 8;
            break;
        case ActivityType.SQUATS:
            met = 7.5;
            break;
        case ActivityType.PUSHUPS:
            met = 8.5;
            break;
        case ActivityType.STAR_JUMPS:
            met = 5;
            break;
        default:
            met = 0;
            break;
    }

    let calories = duration * (met * 3.5 * weight) / 200;

    return calories;
}