import pickle
import numpy as np


class Model:
    def __init__(self, scaler_model_path: str, random_forest_model_path: str) -> None:
        with open(scaler_model_path, "rb") as scaler_f, open(
            random_forest_model_path, "rb"
        ) as model_f:
            self.standard_scaler = pickle.load(scaler_f)
            self.random_forest = pickle.load(model_f)

    def predict_highest_probable_class(self, acc_data, gyr_data, mag_data) -> str:
        # reshaping
        transformed_acc = np.array(acc_data).reshape(1, -1)
        transformed_gyr = np.array(gyr_data).reshape(1, -1)
        transformed_mag = np.array(mag_data).reshape(1, -1)

        # standarization
        standarized_acc_features = self.standard_scaler.transform(transformed_acc)
        standarized_gyr_features = self.standard_scaler.transform(transformed_gyr)
        standarized_mag_features = self.standard_scaler.transform(transformed_mag)

        # Get probabilities from classification on each data
        acc_class_prob = self.random_forest.predict_proba(standarized_acc_features)
        gyr_class_prob = self.random_forest.predict_proba(standarized_gyr_features)
        mag_class_prob = self.random_forest.predict_proba(standarized_mag_features)

        # First let's see what are the highest probable classes from each classifier
        class_names = self.random_forest.classes_
        pred_class_count = {class_name: 0 for class_name in class_names}

        pred_class_count[class_names[np.argmax(acc_class_prob)]] += 1
        pred_class_count[class_names[np.argmax(gyr_class_prob)]] += 1
        pred_class_count[class_names[np.argmax(mag_class_prob)]] += 1

        # If one class is already dominating, we classify the signal as it
        if any(v > 2 for v in iter(pred_class_count.values())):
            return max(pred_class_count, key=lambda x: pred_class_count[x])

        # Else we choose the class, from the most sure classifier
        # Get biggest probabilities from each of the models
        all_probabilities = acc_class_prob + gyr_class_prob + mag_class_prob
        max_prob = max(all_probabilities)
        max_prob_index = list(max_prob).index(max_prob) % 5
        return class_names[max_prob_index]
