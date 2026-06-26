import pandas as pd
import joblib

from sklearn.model_selection import train_test_split
from sklearn.preprocessing import OneHotEncoder
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score, precision_score, recall_score, f1_score, classification_report, confusion_matrix

df = pd.read_csv("data/startup-dataset/D9/final_clean_data.csv")

df = df.drop(columns=[
    "Unnamed: 0",
    "Company_Name",
    "Focus.functions.of.company"
])

df["Dependent.Company.Status"] = df["Dependent.Company.Status"].map({
    "SUCCESS": 1,
    "FAILED": 0
})

X = df.drop(columns=["Dependent.Company.Status"])
y = df["Dependent.Company.Status"]

categorical_columns = X.select_dtypes(include=["object", "string"]).columns.tolist()
numeric_columns = X.select_dtypes(include=["int64", "float64"]).columns.tolist()

preprocessor = ColumnTransformer(
    transformers=[
        ("cat", OneHotEncoder(handle_unknown="ignore"), categorical_columns),
        ("num", "passthrough", numeric_columns)
    ]
)

model = RandomForestClassifier(
    n_estimators=300,
    random_state=42,
    class_weight="balanced"
)

pipeline = Pipeline(steps=[
    ("preprocessor", preprocessor),
    ("model", model)
])

X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.2,
    random_state=42,
    stratify=y
)

pipeline.fit(X_train, y_train)

y_pred = pipeline.predict(X_test)

print("===== MÉTRICAS DEL MODELO DE INVERSIÓN =====")
print("Accuracy :", round(accuracy_score(y_test, y_pred), 4))
print("Precision:", round(precision_score(y_test, y_pred), 4))
print("Recall   :", round(recall_score(y_test, y_pred), 4))
print("F1 Score :", round(f1_score(y_test, y_pred), 4))

print("\n===== MATRIZ DE CONFUSIÓN =====")
print(confusion_matrix(y_test, y_pred))

print("\n===== REPORTE =====")
print(classification_report(y_test, y_pred))

joblib.dump(pipeline, "model/investor_model.pkl")

print("\nModelo guardado en: model/investor_model.pkl")