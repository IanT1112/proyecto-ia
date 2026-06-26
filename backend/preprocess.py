import pandas as pd
from datetime import datetime

# Carga dataset
df = pd.read_csv("data/raw/companies.csv")

print("Columnas cargadas:")
print(df.columns)

# Selecciona columnas útiles
df = df[[
    "funding_total_usd",
    "funding_rounds",
    "founded_at",
    "category_list",
    "status"
]]

# -------------------------
# LIMPIEZA
# -------------------------

df["funding_total_usd"] = df["funding_total_usd"].astype(str)

# limpiar símbolos
df["funding_total_usd"] = df["funding_total_usd"].replace("[$,]", "", regex=True)

# eliminar valores inválidos
df = df[~df["funding_total_usd"].isin(["", "-", "NaN", "nan"])]

# convertir seguro
df["funding_total_usd"] = pd.to_numeric(df["funding_total_usd"], errors="coerce")

# eliminar nulos
df = df.dropna(subset=["funding_total_usd"])

# funding_rounds
df["funding_rounds"] = pd.to_numeric(df["funding_rounds"], errors="coerce")

# fecha → edad
df["founded_at"] = pd.to_datetime(df["founded_at"], errors="coerce")
df["age"] = datetime.now().year - df["founded_at"].dt.year

# feature: es tech o no
df["is_tech"] = df["category_list"].str.contains(
    "software|web|mobile|ai|data|biotech", case=False, na=False
).astype(int)

# target: éxito o fracaso
df = df[df["status"].isin(["acquired", "closed"])]
df["success"] = df["status"].apply(lambda x: 1 if x == "acquired" else 0)

# -------------------------
# DATASET FINAL
# -------------------------

df_final = df[[
    "funding_total_usd",
    "funding_rounds",
    "age",
    "is_tech",
    "success"
]].dropna()

df_final.to_csv("data/startups_clean.csv", index=False)

print("\n✅ Dataset limpio generado")
print(df_final.head())