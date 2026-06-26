import pandas as pd

files = [
    "data/startup-dataset/D8/Startup_Data.csv",
    "data/startup-dataset/D9/CAX_Startup_Data.csv",
    "data/startup-dataset/D9/final_clean_data.csv",
    "data/startup-dataset/D5/CompleteSet.csv"
]

for file in files:
    try:
        print("\n" + "="*80)
        print("ARCHIVO:", file)

        df = pd.read_csv(file)

        print("Shape:", df.shape)
        print("\nColumnas:")
        print(df.columns.tolist())

        print("\nPrimeras 3 filas:")
        print(df.head(3))

    except Exception as e:
        print("ERROR:", e)