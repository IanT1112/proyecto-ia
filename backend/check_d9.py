import pandas as pd

df = pd.read_csv("data/startup-dataset/D9/final_clean_data.csv")

print("========== ESTADO DE LAS EMPRESAS ==========")
print(df["Dependent.Company.Status"].value_counts())

print("\n========== COLUMNAS ==========")

for col in df.columns:
    print(f"\n--- {col} ---")
    print(df[col].dropna().unique()[:10])