import pandas as pd

print("🔄 Cargando dataset...")

df = pd.read_csv("data/raw/companies.csv")

print("\n✅ COLUMNAS:")
print(list(df.columns))

print("\n✅ PRIMERAS FILAS:")
print(df.head())