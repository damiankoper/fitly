from collections import defaultdict
from numbers import Number

import numpy as np

from utils.feature_extraction_functions import get_means, get_variances, get_standard_deviations, \
    get_medians, get_maximums, get_minimums, get_ranges, get_root_mean_squares, get_integrals, \
    get_correlation_coefficients, get_cross_correlation, get_max_differences, get_zero_crossings, \
    get_signal_magnitude_area, get_signal_vector_magnitude
from models.DataModels import DataPoint
from enums.ActivityTypeEnum import ActivityType
from models.DataModels import ActivityTracking, ActivityTrackingMeta
from services.RepetitionCounter import RepetitionCounter
from services.Utilities import utilities
from pydantic import parse_obj_as
from fastapi import FastAPI
from dateutil import parser
from datetime import datetime
from sklearn.preprocessing import  StandardScaler

app = FastAPI()

repetition_counter = RepetitionCounter()

def fitly_resample(signal_data, target_freq, target_len):
    target_ms = target_len * 1000
    step_ms = 1000 / target_freq
    resampled = []
    current_time_ms = 0
    current_src_sample = 0
    timestamps_ms = []

    first_value = datetime.timestamp(parser.parse(signal_data.accelerometer[0].timestamp))


    for sample in signal_data.accelerometer:
        timestamps_ms.append((datetime.timestamp(parser.parse(sample.timestamp)) - first_value) * 1000)

    while current_time_ms <= target_ms:
        while current_src_sample < len(timestamps_ms) - 1 and current_time_ms >= timestamps_ms[current_src_sample + 1]:
            current_src_sample += 1
        resampled.append(signal_data.accelerometer[current_src_sample].data)
        current_time_ms += step_ms
    return resampled


def load_single_json(activity_data):
    signals = []
    for device in ["accelerometer", "gyroscope", "magnetometer"]:
        # empty points
        # if not activity_data[device]:
        #     return None
        # points which don't have samples array
        # if not isinstance(activity_data[device], list):
        #     return None


        resampled = fitly_resample(activity_data, 25, 10)

        for axis in ["x", "y", "z"]:
            converted = {}
            # metadata
            # converted["file_name"] = path
            converted["type"] = activity_data.meta.type
            converted["repeats"] = activity_data.meta.repeats
            converted["interval"] = activity_data.meta.interval
            # signal
            converted["device"] = device
            converted["axis"] = axis


            for i in range(len(resampled)):
                converted[i] = getattr(resampled[i], axis)

            signals.append(converted)
    return signals


@app.post("/api/v1/classify_data", response_model=ActivityTrackingMeta)
async def classify_data(activity: ActivityTracking):
    # Classification
    # TODO: if type != UNKNOWN do not overwrite it!!!
    if activity.meta.type == ActivityType.UNKNOWN:
        activity.meta.type = ActivityType.SQUATS

    # Counting repetitions

    # Extract signal & config data
    exercise_info = utilities.get_signal_config(activity.meta.type)
    signal_for_counting: list[DataPoint] = parse_obj_as(
        list[DataPoint], activity.dict()[exercise_info.device.value]
    )

    loaded_data = load_single_json(activity)

    # Count repeats
    activity.meta.repeats = await repetition_counter.count_repetitions(
        exercise_info, signal_for_counting, activity.meta.uuid
    )

    all_activity_files = load_single_json(activity)

    ##################################################################################
    # Create alll the features

    all_features = defaultdict(list)

    for i in range(0, len(all_activity_files), 3):
        all_features["device"].append(all_activity_files[i]["device"])
        all_features["interval"].append(all_activity_files[i]["interval"])
        all_features["repeats"].append(all_activity_files[i]["repeats"])
        all_features["type"].append(all_activity_files[i]["type"])

        signals = [
            [v for k, v in all_activity_files[i].items() if isinstance(k, Number)],
            [v for k, v in all_activity_files[i + 1].items() if isinstance(k, Number)],
            [v for k, v in all_activity_files[i + 2].items() if isinstance(k, Number)]]

        means = get_means(signals)
        all_features["x_mean"].append(means[0])
        all_features["y_mean"].append(means[1])
        all_features["z_mean"].append(means[2])

        variances = get_variances(signals)
        all_features["x_variance"].append(variances[0])
        all_features["y_variance"].append(variances[1])
        all_features["z_variance"].append(variances[2])

        stds = get_standard_deviations(signals)
        all_features["x_std"].append(stds[0])
        all_features["y_std"].append(stds[1])
        all_features["z_std"].append(stds[2])

        medians = get_medians(signals)
        all_features["x_median"].append(medians[0])
        all_features["y_median"].append(medians[1])
        all_features["z_median"].append(medians[2])

        maximums = get_maximums(signals)
        all_features["x_max"].append(maximums[0])
        all_features["y_max"].append(maximums[1])
        all_features["z_max"].append(maximums[2])

        minimums = get_minimums(signals)
        all_features["x_min"].append(minimums[0])
        all_features["y_min"].append(minimums[1])
        all_features["z_min"].append(minimums[2])

        ranges = get_ranges(signals)
        all_features["x_range"].append(ranges[0])
        all_features["y_range"].append(ranges[1])
        all_features["z_range"].append(ranges[2])

        root_mean_squares = get_root_mean_squares(signals)
        all_features["x_rms"].append(root_mean_squares[0])
        all_features["y_rms"].append(root_mean_squares[1])
        all_features["z_rms"].append(root_mean_squares[2])

        integrals = get_integrals(signals)
        all_features["x_integral"].append(integrals[0])
        all_features["y_integral"].append(integrals[1])
        all_features["z_integral"].append(integrals[2])

        correlation_coefficients = get_correlation_coefficients(signals)
        all_features["x_cor_coef"].append(correlation_coefficients[0])
        all_features["y_cor_coef"].append(correlation_coefficients[1])
        all_features["z_cor_coef"].append(correlation_coefficients[2])

        cross_correlation = get_cross_correlation(signals)
        all_features["cross_cor"].append(cross_correlation)

        max_differences = get_max_differences(signals)
        all_features["x_max_dif"].append(max_differences[0])
        all_features["y_max_dif"].append(max_differences[1])
        all_features["z_max_dif"].append(max_differences[2])

        zero_crossings = get_zero_crossings(signals)
        all_features["x_0_cross"].append(zero_crossings[0])
        all_features["y_0_cross"].append(zero_crossings[1])
        all_features["z_0_cross"].append(zero_crossings[2])

        signal_magnitude_area = get_signal_magnitude_area(signals)
        all_features["sig_magnitude_area"].append(signal_magnitude_area)

        signal_vector_magnitude = get_signal_vector_magnitude(signals)
        all_features["svm"].append(signal_vector_magnitude)

    return activity.meta
