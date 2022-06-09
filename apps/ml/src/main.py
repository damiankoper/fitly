from models.DataModels import DataPoint
from enums.ActivityTypeEnum import ActivityType
from models.DataModels import ActivityTracking, ActivityTrackingMeta
from services.RepetitionCounter import RepetitionCounter
from services.FeaturesExtractor import FeaturesExtractor
from services.Utilities import utilities
from services.Model import Model
from config.Config import Config

from pydantic import parse_obj_as
from fastapi import FastAPI

app = FastAPI()

repetition_counter = RepetitionCounter()
feature_extractor = FeaturesExtractor()
model = Model(
    f"{Config.MODELS_PATH}/standard_scaler.pickle",
    f"{Config.MODELS_PATH}/random_forest.pickle",
)


@app.post("/api/v1/classify_data", response_model=ActivityTrackingMeta)
async def classify_data(activity: ActivityTracking):

    # Resampling (used both in classification and counting)
    activity = utilities.resample_all_signals(activity)

    # Classification
    if activity.meta.type == ActivityType.UNKNOWN:

        (
            acc_signals,
            gyr_signals,
            mag_signals,
        ) = feature_extractor.parse_all_device_signals_data(activity)

        # calculate features for each of the above devices
        acc_sig_features = feature_extractor.calculate_features_for_signals(acc_signals)
        gyr_sig_features = feature_extractor.calculate_features_for_signals(gyr_signals)
        mag_sig_features = feature_extractor.calculate_features_for_signals(mag_signals)

        # standarization + classification
        classification_restult = model.predict_highest_probable_class(
            acc_sig_features, gyr_sig_features, mag_sig_features
        )

        # activity type based on classification
        activity.meta.type = ActivityType(classification_restult)

    # Counting repetitions

    # Only if type != unknown
    if activity.meta.type != ActivityType.UNKNOWN:

        # Extract signal & config data

        exercise_info = utilities.get_signal_config(activity.meta.type)

        signal_for_counting: list[DataPoint] = parse_obj_as(
            list[DataPoint], activity.dict()[exercise_info.device.value]
        )

        # Count repeats
        activity.meta.repeats = await repetition_counter.count_repetitions(
            exercise_info, signal_for_counting, activity.meta.uuid
        )

    return activity.meta
