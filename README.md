# Sistema Inteligente de Predicción de Éxito o Fracaso en Inversiones en Startups basado en Inteligencia Artificial

## Descripción

Este proyecto consiste en el desarrollo de un sistema basado en Inteligencia Artificial que permite estimar la probabilidad de éxito o fracaso de una startup a partir de información relacionada con la empresa y la inversión. Para ello se emplean técnicas de Machine Learning, permitiendo apoyar la toma de decisiones de inversionistas mediante predicciones y escenarios de análisis.

## Tecnologías utilizadas

### Backend
- Python
- FastAPI
- Scikit-learn
- Pandas
- NumPy
- Joblib

### Frontend
- React
- Vite
- JavaScript
- CSS

### Control de versiones
- Git
- GitHub

## Funcionalidades

- Predicción del éxito o fracaso de una startup.
- Estimación del nivel de riesgo.
- Cálculo de escenarios de inversión.
- Interfaz web para ingresar los datos de la startup.
- Comunicación entre frontend y backend mediante API REST.

## Modelo de Inteligencia Artificial

El sistema utiliza un modelo de aprendizaje supervisado basado en Random Forest, entrenado con datos históricos de startups.

Entre las variables empleadas se encuentran:

- Funding total
- Número de rondas de inversión
- Antigüedad de la startup
- Sector tecnológico
- Variables financieras
- Indicadores empresariales

El modelo genera una predicción sobre la probabilidad de éxito de la startup evaluada.

## Flujo de funcionamiento

1. El usuario ingresa la información de una startup.
2. El frontend envía los datos al backend.
3. El modelo de Machine Learning procesa la información.
4. Se obtiene la predicción correspondiente.
5. El sistema muestra los resultados y escenarios de inversión.

## Resultados

El modelo fue entrenado utilizando un algoritmo Random Forest obteniendo las siguientes métricas aproximadas:

- Accuracy: 67.23%
- Precision: 66.58%
- Recall: 73.84%
- F1-Score: 70.03%

Estos resultados permiten utilizar el sistema como herramienta de apoyo para la evaluación preliminar de inversiones en startups.

## Estado del proyecto

Proyecto desarrollado como parte del curso de Inteligencia Artificial de la Universidad Privada Antenor Orrego (UPAO).

Actualmente el sistema cuenta con:

- Modelo de Machine Learning entrenado.
- Backend funcional mediante FastAPI.
- Frontend desarrollado en React.
- Integración entre frontend y backend.
- Control de versiones mediante GitHub.

## Licencia

Proyecto desarrollado con fines académicos.