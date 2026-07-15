function Landing({ onStart }) {
  return (
    <main className="landing-page">
      <nav className="landing-nav">
        <div className="landing-brand">
          <span className="brand-icon">IA</span>
          <span>IA Startup</span>
        </div>

        <button className="landing-nav-button" onClick={onStart}>
          Probar sistema
        </button>
      </nav>

      <section className="landing-hero-clean">
        <div className="landing-copy">
          <span className="badge">IA para análisis de inversión</span>

          <h1>Evalúa startups con inteligencia artificial</h1>

          <p>
            IA Startup ayuda a estimar el potencial de éxito, nivel de riesgo,
            valuación aproximada y retorno esperado de una inversión en startups
            usando modelos de Machine Learning.
          </p>

          <div className="landing-actions">
            <button className="landing-main-button" onClick={onStart}>
              Probar IA Startup
            </button>

            <span>Modelo predictivo + análisis financiero</span>
          </div>
        </div>

        <div className="landing-preview-card">
          <div className="preview-header">
            <div>
              <p>Proyección estimada</p>
              <h2>Retorno por escenarios</h2>
            </div>

            <span className="preview-status">Bajo riesgo</span>
          </div>

          <div className="preview-metrics">
            <div>
              <p>Probabilidad</p>
              <strong>94.3%</strong>
            </div>

            <div>
              <p>Valuación IA</p>
              <strong>$4.17M</strong>
            </div>

            <div>
              <p>ROI</p>
              <strong>38%</strong>
            </div>
          </div>

          <div className="preview-chart">
            <svg viewBox="0 0 520 220" preserveAspectRatio="none">
              <line x1="40" y1="20" x2="40" y2="185" className="preview-axis" />
              <line x1="40" y1="185" x2="500" y2="185" className="preview-axis" />

              <polyline
                className="preview-line preview-line-soft"
                points="40,155 130,148 220,138 310,128 400,118 500,108"
              />

              <polyline
                className="preview-line preview-line-main"
                points="40,145 130,126 220,105 310,82 400,60 500,38"
              />

              <polyline
                className="preview-line preview-line-risk"
                points="40,160 130,162 220,166 310,170 400,176 500,182"
              />

              {[40, 130, 220, 310, 400, 500].map((x, index) => {
                const points = [145, 126, 105, 82, 60, 38];

                return (
                  <circle
                    key={x}
                    cx={x}
                    cy={points[index]}
                    r="5"
                    className="preview-point"
                  />
                );
              })}
            </svg>

            <div className="preview-months">
              <span>0</span>
              <span>6</span>
              <span>12</span>
              <span>18</span>
              <span>24</span>
              <span>36</span>
            </div>
          </div>
        </div>
      </section>

      <section className="landing-sections">
        <article className="landing-info-card">
          <span>01</span>
          <h2>¿Por qué fue creado?</h2>
          <p>
            Fue creado para aplicar inteligencia artificial al análisis de
            startups, apoyando decisiones de inversión con datos, predicción y
            criterios financieros.
          </p>
        </article>

        <article className="landing-info-card">
          <span>02</span>
          <h2>Misión</h2>
          <p>
            Brindar una herramienta clara y accesible que permita evaluar el
            potencial de una startup, su nivel de riesgo y la rentabilidad de una
            inversión.
          </p>
        </article>

        <article className="landing-info-card">
          <span>03</span>
          <h2>Visión</h2>
          <p>
            Convertirse en una plataforma de referencia para el análisis
            preliminar de startups mediante IA, valuación y proyecciones
            financieras.
          </p>
        </article>
      </section>

      <section className="tech-section">

  <div className="section-title">
    <span className="badge">Arquitectura tecnológica</span>
    <h2>Tecnologías utilizadas</h2>

    <p>
      IA Startup integra modelos de Machine Learning, una API desarrollada
      con FastAPI y una interfaz web construida en React para realizar
      análisis predictivos y financieros de startups.
    </p>
  </div>

  <div className="tech-grid">

    <article className="tech-card">
      <h3>Frontend</h3>

      <h4>React + Vite</h4>

      <p>
        Se utiliza React para construir una interfaz moderna e interactiva
        que permite ingresar información de startups y visualizar
        gráficamente los resultados obtenidos por los modelos de IA.
      </p>
    </article>

    <article className="tech-card">
      <h3>Backend</h3>

      <h4>FastAPI</h4>

      <p>
        FastAPI expone los modelos entrenados mediante servicios REST,
        procesando las solicitudes del frontend y devolviendo predicciones
        en tiempo real.
      </p>
    </article>

    <article className="tech-card">
      <h3>Clasificación</h3>

      <h4>Random Forest</h4>

      <p>
        El modelo Random Forest analiza múltiples variables de una startup
        para estimar su probabilidad de éxito, nivel de riesgo y apoyar la
        recomendación de inversión.
      </p>
    </article>

    <article className="tech-card">
      <h3>Red neuronal</h3>

      <h4>MLPRegressor</h4>

      <p>
        Se emplea una Red Neuronal Artificial tipo Perceptrón Multicapa
        (MLPRegressor) para estimar la valuación económica de la startup a
        partir de información financiera y empresarial.
      </p>
    </article>

    <article className="tech-card">
      <h3>Preprocesamiento</h3>

      <h4>Scikit-Learn Pipeline</h4>

      <p>
        Antes de realizar la predicción, los datos son transformados mediante
        OneHotEncoder, StandardScaler y ColumnTransformer para garantizar
        consistencia durante la inferencia del modelo.
      </p>
    </article>

    <article className="tech-card">
      <h3>Visualización</h3>

      <h4>Análisis financiero</h4>

      <p>
        El sistema presenta probabilidad de éxito, ROI, valuación, retorno
        esperado y proyecciones mediante gráficos comparativos por escenarios
        para facilitar la interpretación de resultados.
      </p>
    </article>

  </div>

</section>
    </main>
  );
}

export default Landing;