from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import joblib
import pandas as pd
from pathlib import Path
import numpy as np

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

BASE_DIR = Path(__file__).resolve().parent
INVESTOR_MODEL_PATH = BASE_DIR.parent / "model" / "investor_model.pkl"
VALUATION_MODEL_PATH = BASE_DIR.parent / "model" / "valuation_model.pkl"

investor_model = joblib.load(INVESTOR_MODEL_PATH)
valuation_model = joblib.load(VALUATION_MODEL_PATH)


class InvestmentInput(BaseModel):
    investment_amount: float
    equity_percentage: float

    number_of_cofounders: int
    number_of_advisors: int
    senior_leadership_team_size: int
    repeat_investors: int

    average_company_size_experience: str
    product_or_service: str
    private_or_public_data: str
    cloud_or_platform: str
    local_or_global: str

    worked_in_top_companies: str
    focus_on_consumer_data: str
    crowdfunding_based_business: str
    machine_learning_based_business: str

    founded_year: int
    country: str
    region: str
    industry: str
    funding_round: str
    funding_amount_usd: float
    lead_investor: str
    employee_count: int
    estimated_revenue_usd: float
    exited: bool
    exit_type: str
    tags: str


@app.get("/")
def home():
    return {
        "msg": "Investor Startup Analysis API OK"
    }


@app.post("/predict-investment")
def predict_investment(data: InvestmentInput):
    input_data = pd.DataFrame([{
        "Number.of.Co.founders": data.number_of_cofounders,
        "Number.of.of.advisors": data.number_of_advisors,
        "Team.size.Senior.leadership": data.senior_leadership_team_size,
        "Number.of.of.repeat.investors": data.repeat_investors,
        "Average.size.of.companies.worked.for.in.the.past": data.average_company_size_experience,
        "Product.or.service.company.": data.product_or_service,
        "Focus.on.private.or.public.data.": data.private_or_public_data,
        "Cloud.or.platform.based.serive.product.": data.cloud_or_platform,
        "Local.or.global.player": data.local_or_global,
        "Worked.in.top.companies": data.worked_in_top_companies,
        "Focus.on.consumer.data.": data.focus_on_consumer_data,
        "Crowdfunding.based.business": data.crowdfunding_based_business,
        "Machine.Learning.based.business": data.machine_learning_based_business,
    }])

    prediction = investor_model.predict(input_data)[0]
    probabilities = investor_model.predict_proba(input_data)[0]

    failure_probability = round(float(probabilities[0]) * 100, 2)
    success_probability = round(float(probabilities[1]) * 100, 2)

    if success_probability >= 75:
        risk_level = "Bajo"
        multiplier = 4
        recommendation = "Invertir"
    elif success_probability >= 55:
        risk_level = "Medio"
        multiplier = 2.5
        recommendation = "Evaluar con más información"
    else:
        risk_level = "Alto"
        multiplier = 1.2
        recommendation = "No invertir por ahora"

    valuation_input = pd.DataFrame([{
        "country": data.country,
        "region": data.region,
        "industry": data.industry,
        "funding_round": data.funding_round,
        "funding_amount_usd": data.funding_amount_usd,
        "lead_investor": data.lead_investor,
        "employee_count": data.employee_count,
        "estimated_revenue_usd": data.estimated_revenue_usd,
        "exited": data.exited,
        "exit_type": data.exit_type,
        "tags": data.tags,
        "startup_age": 2026 - data.founded_year
    }])

    predicted_valuation_log = valuation_model.predict(valuation_input)[0]
    predicted_valuation_usd = np.expm1(predicted_valuation_log)
    predicted_valuation_usd = round(float(predicted_valuation_usd), 2)

    estimated_startup_value = predicted_valuation_usd
    expected_exit_value = estimated_startup_value * multiplier
    expected_return = expected_exit_value * (data.equity_percentage / 100)
    expected_profit = expected_return - data.investment_amount
    roi = (expected_profit / data.investment_amount) * 100

    return {
    "prediction": int(prediction),
    "result": "Startup con potencial de éxito" if prediction == 1 else "Startup de alto riesgo",
    "success_probability": success_probability,
    "failure_probability": failure_probability,
    "risk_level": risk_level,
    "recommendation": recommendation,
    "investment_amount": round(data.investment_amount, 2),
    "equity_percentage": round(data.equity_percentage, 2),
    "estimated_startup_value": round(estimated_startup_value, 2),
    "estimated_multiplier": multiplier,
    "expected_exit_value": round(expected_exit_value, 2),
    "expected_return": round(expected_return, 2),
    "expected_profit": round(expected_profit, 2),
    "roi_percentage": round(roi, 2)
}