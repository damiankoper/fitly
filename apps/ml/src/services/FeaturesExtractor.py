from enums.DeviceEnum import DeviceEnum
from models.DataModels import DataPoint
from models.DataModels import ActivityTracking
from services.FeaturesCalculator import FeaturesCalculator
from pydantic import parse_obj_as


class FeaturesExtractor:
    def parse_all_device_signals_data(
        self, activity: ActivityTracking
    ) -> tuple[list[list[float]], list[list[float]], list[list[float]]]:
        acc_signals = []
        gyr_signals = []
        mag_signals = []

        for device in DeviceEnum:
            device_points: list[DataPoint] = parse_obj_as(
                list[DataPoint], activity.dict()[device.value]
            )

            device_signals = [
                [p.data.x for p in device_points],
                [p.data.y for p in device_points],
                [p.data.z for p in device_points],
            ]

            if device == DeviceEnum.accelerometer:
                acc_signals.extend(device_signals)
            elif device == DeviceEnum.gyroscope:
                gyr_signals.extend(device_signals)
            elif device == DeviceEnum.magnetometer:
                mag_signals.extend(device_signals)

        return acc_signals, gyr_signals, mag_signals

    def calculate_features_for_signals(self, device_signals: list[list[float]]):
        all_features: list[float] = []
        features_calculator = FeaturesCalculator(device_signals)
        calculated_features = [
            features_calculator.get_means(),
            features_calculator.get_variances(),
            features_calculator.get_standard_deviations(),
            features_calculator.get_medians(),
            features_calculator.get_maximums(),
            features_calculator.get_minimums(),
            features_calculator.get_ranges(),
            features_calculator.get_root_mean_squares(),
            features_calculator.get_integrals(),
            features_calculator.get_correlation_coefficients(),
            features_calculator.get_max_differences(),
            features_calculator.get_zero_crossings(),
            features_calculator.get_dc_components(),
            features_calculator.get_spectral_energies(),
            features_calculator.get_spectral_entropies(),
        ]
        for packed_features in calculated_features:
            all_features.extend(packed_features)

        all_features.append(features_calculator.get_cross_correlation())
        all_features.append(features_calculator.get_signal_magnitude_area())
        all_features.append(features_calculator.get_signal_vector_magnitude())

        return all_features
