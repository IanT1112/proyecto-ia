import pandas as pd
import numpy as np
import joblib

from sklearn.model_selection import train_test_split
from sklearn.preprocessing import OneHotEncoder, StandardScaler, FunctionTransformer
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
from sklearn.metrics import mean_absolute_error, mean_squared_error, r2_score
from sklearn.neural_network import MLPRegressor

df = pd.read_csv("data/startup_valuation_dataset.csv", low_memory=False)

df = df.drop(columns=[
    "startup_id",
    "startup_name",
    "funding_date",
    "co_investors"
], errors="ignore")

df = df.dropna(subset=["estimated_valuation_usd"])

df["startup_age"] = 2026 - df["founded_year"]
df = df.drop(columns=["founded_year"])

target = "estimated_valuation_usd"

X = df.drop(columns=[target])
y = np.log1p(df[target])

categorical_columns = X.select_dtypes(include=["object", "string", "bool"]).columns.tolist()
numeric_columns = X.select_dtypes(include=["int64", "float64"]).columns.tolist()

preprocessor = ColumnTransformer(
    transformers=[
        ("cat", OneHotEncoder(handle_unknown="ignore"), categorical_columns),
        ("num", StandardScaler(), numeric_columns)
    ]
)

model = MLPRegressor(
    hidden_layer_sizes=(128, 64, 32),
    activation="relu",
    solver="adam",
    max_iter=300,
    random_state=42,
    early_stopping=True
)

pipeline = Pipeline(steps=[
    ("preprocessor", preprocessor),
    ("model", model)
])

X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.2,
    random_state=42
)

pipeline.fit(X_train, y_train)

y_pred_log = pipeline.predict(X_test)

y_test_real = np.expm1(y_test)
y_pred_real = np.expm1(y_pred_log)

mae = mean_absolute_error(y_test_real, y_pred_real)
rmse = np.sqrt(mean_squared_error(y_test_real, y_pred_real))
r2 = r2_score(y_test_real, y_pred_real)

print("===== MÉTRICAS MODELO DE VALUACIÓN =====")
print("MAE :", round(mae, 2))
print("RMSE:", round(rmse, 2))
print("R2  :", round(r2, 4))

joblib.dump(pipeline, "model/valuation_model.pkl")

print("\nModelo guardado en: model/valuation_model.pkl")