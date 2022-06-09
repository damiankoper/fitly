import pickle
import numpy as np


class Model:
    def __init__(self, scaler_model_path: str, random_forest_model_path: str) -> None:
        with open(scaler_model_path, "rb") as scaler_f, open(
            random_forest_model_path, "rb"
        ) as model_f:
            self.standard_scaler = pickle.load(scaler_f)
            self.random_forest = pickle.load(model_f)

    def standarize_data(self, data) -> str:
        return self.standard_scaler.transform(np.array(data).reshape(1, -1))

    def predict_type(self, data) -> str:
        transformed_data = data.reshape(1, -1)
        return self.random_forest.predict(transformed_data)[0]
