import pandas as pd

df = pd.read_csv(
    "data/startup_valuation_dataset.csv",
    low_memory=False
)

print("\n===== SHAPE =====")
print(df.shape)

print("\n===== COLUMNAS =====")
for col in df.columns:
    print(col)

print("\n===== TIPOS =====")
print(df.dtypes)