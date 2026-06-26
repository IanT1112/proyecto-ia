import { useState } from "react";
import "./App.css";

function App() {
  const [formData, setFormData] = useState({
    investment_amount: "",
    equity_percentage: "",
    projection_months: "36",

    number_of_cofounders: "2",
    number_of_advisors: "3",
    senior_leadership_team_size: "5",
    repeat_investors: "2",

    average_company_size_experience: "MEDIUM",
    product_or_service: "PRODUCT",
    private_or_public_data: "BOTH",
    cloud_or_platform: "PLATFORM",
    local_or_global: "GLOBAL",
    worked_in_top_companies: "YES",
    focus_on_consumer_data: "YES",
    crowdfunding_based_business: "NO",
    machine_learning_based_business: "YES",

    founded_year: "2018",
    country: "United States",
    region: "North America",
    industry: "AI/ML",
    funding_round: "Series A",
    funding_amount_usd: "5000000",
    lead_investor: "Andreessen Horowitz",
    employee_count: "45",
    estimated_revenue_usd: "1200000",
    exited: "false",
    exit_type: "None",
    tags: "AI, SaaS, B2B",
  });

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const formatMoney = (value) =>
    new Intl.NumberFormat("es-PE", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(value || 0);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handlePredict = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);

    try {
      const response = await fetch("http://127.0.0.1:8000/predict-investment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          investment_amount: Number(formData.investment_amount),
          equity_percentage: Number(formData.equity_percentage),

          number_of_cofounders: Number(formData.number_of_cofounders),
          number_of_advisors: Number(formData.number_of_advisors),
          senior_leadership_team_size: Number(
            formData.senior_leadership_team_size
          ),
          repeat_investors: Number(formData.repeat_investors),

          average_company_size_experience:
            formData.average_company_size_experience,
          product_or_service: formData.product_or_service,
          private_or_public_data: formData.private_or_public_data,
          cloud_or_platform: formData.cloud_or_platform,
          local_or_global: formData.local_or_global,
          worked_in_top_companies: formData.worked_in_top_companies,
          focus_on_consumer_data: formData.focus_on_consumer_data,
          crowdfunding_based_business: formData.crowdfunding_based_business,
          machine_learning_based_business:
            formData.machine_learning_based_business,

          founded_year: Number(formData.founded_year),
          country: formData.country,
          region: formData.region,
          industry: formData.industry,
          funding_round: formData.funding_round,
          funding_amount_usd: Number(formData.funding_amount_usd),
          lead_investor: formData.lead_investor,
          employee_count: Number(formData.employee_count),
          estimated_revenue_usd: Number(formData.estimated_revenue_usd),
          exited: formData.exited === "true",
          exit_type: formData.exit_type,
          tags: formData.tags,
        }),
      });

      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.error(error);
      alert("No se pudo conectar con el backend.");
    } finally {
      setLoading(false);
    }
  };

  const buildProjection = () => {
    if (!result) return [];

    const months = Number(formData.projection_months);
    const base = result.investment_amount;
    const expected = result.expected_return;

    const data = [];

    for (let month = 0; month <= months; month += 3) {
      const progress = month / months;

      const pessimistic = base * (1 - 0.45 * progress);
      const moderate = base + (expected - base) * progress;
      const optimistic = base + (expected * 1.6 - base) * progress;

      data.push({
        month,
        pessimistic,
        moderate,
        optimistic,
      });
    }

    return data;
  };

  const projectionData = buildProjection();

  const chartConfig = {
    width: 900,
    height: 320,
    paddingLeft: 75,
    paddingRight: 25,
    paddingTop: 25,
    paddingBottom: 45,
  };

  const getChartValues = () => {
    if (!projectionData.length) {
      return { min: 0, max: 1 };
    }

    const allValues = projectionData.flatMap((item) => [
      item.pessimistic,
      item.moderate,
      item.optimistic,
    ]);

    return {
      min: Math.min(...allValues),
      max: Math.max(...allValues),
    };
  };

  const getPointCoords = (item, index, key) => {
    const { width, height, paddingLeft, paddingRight, paddingTop, paddingBottom } =
      chartConfig;

    const { min, max } = getChartValues();

    const x =
      paddingLeft +
      (index / (projectionData.length - 1 || 1)) *
        (width - paddingLeft - paddingRight);

    const y =
      height -
      paddingBottom -
      ((item[key] - min) / (max - min || 1)) *
        (height - paddingTop - paddingBottom);

    return { x, y };
  };

  const getLinePoints = (key) => {
    if (!projectionData.length) return "";

    return projectionData
      .map((item, index) => {
        const { x, y } = getPointCoords(item, index, key);
        return `${x},${y}`;
      })
      .join(" ");
  };

  const moneyLabels = () => {
    if (!projectionData.length) return [];

    const { min, max } = getChartValues();

    return [max, (max + min) / 2, min];
  };

  return (
    <main className="page">
      <section className="hero">
        <span className="badge">IA para Venture Capital</span>
        <h1>Evaluador Inteligente de Inversión en Startups</h1>
        <p>
          Analiza riesgo, probabilidad de éxito, valuación estimada, ROI y
          escenarios de retorno usando modelos de Machine Learning.
        </p>
      </section>

      <section className="dashboard">
        <aside className="input-panel">
          <div className="panel-header">
            <h2>Datos de análisis</h2>
            <p>Completa los datos principales de inversión y startup.</p>
          </div>

          <form onSubmit={handlePredict} className="form">
            <div className="form-grid">
              <div className="field">
                <label>Monto a invertir</label>
                <input
                  type="number"
                  name="investment_amount"
                  placeholder="50000"
                  value={formData.investment_amount}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="field">
                <label>Participación (%)</label>
                <input
                  type="number"
                  name="equity_percentage"
                  placeholder="10"
                  value={formData.equity_percentage}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="field">
                <label>Proyección</label>
                <select
                  name="projection_months"
                  value={formData.projection_months}
                  onChange={handleChange}
                >
                  <option value="6">6 meses</option>
                  <option value="12">12 meses</option>
                  <option value="24">24 meses</option>
                  <option value="36">36 meses</option>
                  <option value="60">60 meses</option>
                  <option value="120">120 meses</option>
                </select>
              </div>

              <div className="field">
                <label>Cofundadores</label>
                <input
                  type="number"
                  name="number_of_cofounders"
                  value={formData.number_of_cofounders}
                  onChange={handleChange}
                />
              </div>

              <div className="field">
                <label>Asesores</label>
                <input
                  type="number"
                  name="number_of_advisors"
                  value={formData.number_of_advisors}
                  onChange={handleChange}
                />
              </div>

              <div className="field">
                <label>Equipo senior</label>
                <input
                  type="number"
                  name="senior_leadership_team_size"
                  value={formData.senior_leadership_team_size}
                  onChange={handleChange}
                />
              </div>

              <div className="field">
                <label>Inversores repetidos</label>
                <input
                  type="number"
                  name="repeat_investors"
                  value={formData.repeat_investors}
                  onChange={handleChange}
                />
              </div>

              <div className="field">
                <label>Experiencia</label>
                <select
                  name="average_company_size_experience"
                  value={formData.average_company_size_experience}
                  onChange={handleChange}
                >
                  <option value="SMALL">Pequeñas empresas</option>
                  <option value="MEDIUM">Medianas empresas</option>
                  <option value="LARGE">Grandes empresas</option>
                </select>
              </div>

              <div className="field">
                <label>Empresas top</label>
                <select
                  name="worked_in_top_companies"
                  value={formData.worked_in_top_companies}
                  onChange={handleChange}
                >
                  <option value="YES">Sí</option>
                  <option value="NO">No</option>
                </select>
              </div>

              <div className="field">
                <label>Año fundación</label>
                <input
                  type="number"
                  name="founded_year"
                  value={formData.founded_year}
                  onChange={handleChange}
                />
              </div>

              <div className="field">
                <label>País</label>
                <input
                  type="text"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                />
              </div>

              <div className="field">
                <label>Región</label>
                <select
                  name="region"
                  value={formData.region}
                  onChange={handleChange}
                >
                  <option value="North America">Norteamérica</option>
                  <option value="Latin America">Latinoamérica</option>
                  <option value="Europe">Europa</option>
                  <option value="Asia">Asia</option>
                  <option value="Africa">África</option>
                  <option value="Oceania">Oceanía</option>
                </select>
              </div>

              <div className="field">
                <label>Industria</label>
                <select
                  name="industry"
                  value={formData.industry}
                  onChange={handleChange}
                >
                  <option value="AI/ML">AI / Machine Learning</option>
                  <option value="Fintech">Fintech</option>
                  <option value="EdTech">EdTech</option>
                  <option value="HealthTech">HealthTech</option>
                  <option value="E-commerce">E-commerce</option>
                  <option value="SaaS">SaaS</option>
                  <option value="Cybersecurity">Cybersecurity</option>
                </select>
              </div>

              <div className="field">
                <label>Ronda</label>
                <select
                  name="funding_round"
                  value={formData.funding_round}
                  onChange={handleChange}
                >
                  <option value="Seed">Seed</option>
                  <option value="Series A">Series A</option>
                  <option value="Series B">Series B</option>
                  <option value="Series C">Series C</option>
                  <option value="Series D">Series D</option>
                  <option value="IPO">IPO</option>
                </select>
              </div>

              <div className="field">
                <label>Monto levantado</label>
                <input
                  type="number"
                  name="funding_amount_usd"
                  value={formData.funding_amount_usd}
                  onChange={handleChange}
                />
              </div>

              <div className="field">
                <label>Inversor líder</label>
                <select
                  name="lead_investor"
                  value={formData.lead_investor}
                  onChange={handleChange}
                >
                  <option value="Andreessen Horowitz">Andreessen Horowitz</option>
                  <option value="SoftBank">SoftBank</option>
                  <option value="Sequoia Capital">Sequoia Capital</option>
                  <option value="Accel">Accel</option>
                  <option value="Tiger Global">Tiger Global</option>
                  <option value="Y Combinator">Y Combinator</option>
                  <option value="Other">Otro</option>
                </select>
              </div>

              <div className="field">
                <label>Empleados</label>
                <input
                  type="number"
                  name="employee_count"
                  value={formData.employee_count}
                  onChange={handleChange}
                />
              </div>

              <div className="field">
                <label>Ingresos anuales</label>
                <input
                  type="number"
                  name="estimated_revenue_usd"
                  value={formData.estimated_revenue_usd}
                  onChange={handleChange}
                />
              </div>

              <div className="field">
                <label>Tipo</label>
                <select
                  name="product_or_service"
                  value={formData.product_or_service}
                  onChange={handleChange}
                >
                  <option value="PRODUCT">Producto</option>
                  <option value="SERVICE">Servicio</option>
                  <option value="BOTH">Ambos</option>
                </select>
              </div>

              <div className="field">
                <label>Datos</label>
                <select
                  name="private_or_public_data"
                  value={formData.private_or_public_data}
                  onChange={handleChange}
                >
                  <option value="PRIVATE">Privados</option>
                  <option value="PUBLIC">Públicos</option>
                  <option value="BOTH">Ambos</option>
                  <option value="NO">No aplica</option>
                </select>
              </div>

              <div className="field">
                <label>Cloud / plataforma</label>
                <select
                  name="cloud_or_platform"
                  value={formData.cloud_or_platform}
                  onChange={handleChange}
                >
                  <option value="PLATFORM">Plataforma</option>
                  <option value="CLOUD">Cloud</option>
                  <option value="BOTH">Ambos</option>
                  <option value="NONE">Ninguno</option>
                </select>
              </div>

              <div className="field">
                <label>Alcance</label>
                <select
                  name="local_or_global"
                  value={formData.local_or_global}
                  onChange={handleChange}
                >
                  <option value="LOCAL">Local</option>
                  <option value="GLOBAL">Global</option>
                </select>
              </div>

              <div className="field">
                <label>Datos consumidores</label>
                <select
                  name="focus_on_consumer_data"
                  value={formData.focus_on_consumer_data}
                  onChange={handleChange}
                >
                  <option value="YES">Sí</option>
                  <option value="NO">No</option>
                </select>
              </div>

              <div className="field">
                <label>Crowdfunding</label>
                <select
                  name="crowdfunding_based_business"
                  value={formData.crowdfunding_based_business}
                  onChange={handleChange}
                >
                  <option value="YES">Sí</option>
                  <option value="NO">No</option>
                </select>
              </div>

              <div className="field">
                <label>Machine Learning</label>
                <select
                  name="machine_learning_based_business"
                  value={formData.machine_learning_based_business}
                  onChange={handleChange}
                >
                  <option value="YES">Sí</option>
                  <option value="NO">No</option>
                </select>
              </div>

              <div className="field">
                <label>¿Tuvo exit?</label>
                <select
                  name="exited"
                  value={formData.exited}
                  onChange={handleChange}
                >
                  <option value="false">No</option>
                  <option value="true">Sí</option>
                </select>
              </div>

              <div className="field">
                <label>Tipo de exit</label>
                <select
                  name="exit_type"
                  value={formData.exit_type}
                  onChange={handleChange}
                >
                  <option value="None">Ninguno</option>
                  <option value="Acquisition">Adquisición</option>
                  <option value="IPO">IPO</option>
                  <option value="Merger">Fusión</option>
                </select>
              </div>

              <div className="field full">
                <label>Etiquetas / tecnologías</label>
                <input
                  type="text"
                  name="tags"
                  value={formData.tags}
                  onChange={handleChange}
                />
              </div>
            </div>

            <button type="submit" disabled={loading}>
              {loading ? "Analizando..." : "Evaluar inversión"}
            </button>
          </form>
        </aside>

        <section className="results-panel">
          {!result && (
            <div className="empty-state">
              <p className="eyebrow">Resultado pendiente</p>
              <h2>Ingresa los datos y ejecuta el análisis</h2>
              <p>
                Aquí aparecerán la recomendación, métricas principales y la
                proyección financiera por escenarios.
              </p>
            </div>
          )}

          {result && (
            <>
              <div
                className={`result-banner ${
                  result.risk_level === "Bajo"
                    ? "success"
                    : result.risk_level === "Medio"
                    ? "warning"
                    : "failure"
                }`}
              >
                <div>
                  <p className="eyebrow">Recomendación del sistema</p>
                  <h2>{result.recommendation}</h2>
                  <p>{result.result}</p>
                </div>
              </div>

              <div className="metrics">
                <div className="metric-card">
                  <p>Probabilidad</p>
                  <h3>{result.success_probability}%</h3>
                </div>

                <div className="metric-card">
                  <p>Riesgo</p>
                  <h3>{result.risk_level}</h3>
                </div>

                <div className="metric-card">
                  <p>ROI</p>
                  <h3>{result.roi_percentage}%</h3>
                </div>

                <div className="metric-card">
                  <p>Valuación IA</p>
                  <h3>{formatMoney(result.estimated_startup_value)}</h3>
                </div>

                <div className="metric-card">
                  <p>Valor futuro</p>
                  <h3>{formatMoney(result.expected_exit_value)}</h3>
                </div>

                <div className="metric-card">
                  <p>Ganancia</p>
                  <h3>{formatMoney(result.expected_profit)}</h3>
                </div>
              </div>

              <div className="minimal-chart-card">
                <div className="chart-top">
                  <div>
                    <p className="eyebrow">Proyección financiera</p>
                    <h2>Retorno estimado por escenarios</h2>
                  </div>

                  <div className="legend">
                    <span>
                      <i className="dot red"></i> Pesimista
                    </span>
                    <span>
                      <i className="dot blue"></i> Esperado
                    </span>
                    <span>
                      <i className="dot green"></i> Optimista
                    </span>
                  </div>
                </div>

                <div className="chart-wrapper">
                  <div className="y-axis">
                    {moneyLabels().map((value, index) => (
                      <span key={index}>{formatMoney(value)}</span>
                    ))}
                  </div>

                  <svg
                    viewBox="0 0 900 320"
                    preserveAspectRatio="none"
                    className="main-line-chart"
                  >
                    <line
                      x1="75"
                      y1="25"
                      x2="75"
                      y2="275"
                      className="axis-line"
                    />
                    <line
                      x1="75"
                      y1="275"
                      x2="875"
                      y2="275"
                      className="axis-line"
                    />

                    <polyline
                      className="line pessimistic"
                      points={getLinePoints("pessimistic")}
                    />
                    <polyline
                      className="line moderate"
                      points={getLinePoints("moderate")}
                    />
                    <polyline
                      className="line optimistic"
                      points={getLinePoints("optimistic")}
                    />

                    {projectionData.map((item, index) => {
                      const p1 = getPointCoords(item, index, "pessimistic");
                      const p2 = getPointCoords(item, index, "moderate");
                      const p3 = getPointCoords(item, index, "optimistic");

                      return (
                        <g key={item.month}>
                          <circle
                            className="point pessimistic-point"
                            cx={p1.x}
                            cy={p1.y}
                            r="5"
                          />
                          <circle
                            className="point moderate-point"
                            cx={p2.x}
                            cy={p2.y}
                            r="5"
                          />
                          <circle
                            className="point optimistic-point"
                            cx={p3.x}
                            cy={p3.y}
                            r="5"
                          />
                        </g>
                      );
                    })}
                  </svg>

                  <div className="x-axis">
                    {projectionData.map((item) => (
                      <span key={item.month}>{item.month}</span>
                    ))}
                  </div>
                </div>

                <p className="axis-note">Meses de proyección</p>
              </div>

              <div className="investor-card">
                <h2>Lectura para el inversor</h2>
                <p>
                  El modelo estima una valuación actual de{" "}
                  <strong>{formatMoney(result.estimated_startup_value)}</strong>.
                  Con una inversión de{" "}
                  <strong>{formatMoney(result.investment_amount)}</strong>, el
                  retorno esperado sería{" "}
                  <strong>{formatMoney(result.expected_return)}</strong>, con
                  una ganancia estimada de{" "}
                  <strong>{formatMoney(result.expected_profit)}</strong>.
                </p>
              </div>
            </>
          )}
        </section>
      </section>
    </main>
  );
}

export default App;