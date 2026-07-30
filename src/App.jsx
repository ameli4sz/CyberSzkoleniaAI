import React, { useMemo, useState, useEffect } from "react";
import { generateWithGemini } from "./gemini";

const TOPICS = [
  "Phishing i socjotechnika",
  "Hasła i uwierzytelnianie",
  "Ochrona danych i prywatność",
  "Bezpieczne korzystanie z poczty uczelnianej",
  "Złośliwe oprogramowanie",
];

const AUDIENCES = [
  "studenci pierwszego roku",
  "studenci kierunków biznesowych",
  "studenci kierunków technicznych",
  "grupa mieszana",
];

const DIFFICULTIES = ["podstawowy", "średni", "zaawansowany"];

function Field({ label, children, hint }) {
  return (
    <div className="field">
      <label>{label}</label>
      {children}
      {hint ? <small>{hint}</small> : null}
    </div>
  );
}

function SectionCard({ title, children }) {
  return (
    <section className="card">
      <h3>{title}</h3>
      {children}
    </section>
  );
}

export default function App() {
  const [apiKey, setApiKey] = useState(localStorage.getItem("gemini_api_key") || "");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState(null);

  const [form, setForm] = useState({
    topic: TOPICS[0],
    audience: AUDIENCES[0],
    difficulty: DIFFICULTIES[0],
    duration: 45,
    form: "warsztat z analizą przypadku",
    quizCount: 5,
    notes: "",
  });

  useEffect(() => {
    if (apiKey) {
      localStorage.setItem("gemini_api_key", apiKey);
    } else {
      localStorage.removeItem("gemini_api_key");
    }
  }, [apiKey]);

  const input = useMemo(() => ({
    topicLabel: form.topic,
    audienceLabel: form.audience,
    difficultyLabel: form.difficulty,
    duration: Number(form.duration),
    form: form.form,
    quizCount: Number(form.quizCount),
    notes: form.notes,
  }), [form]);

  async function handleGenerate() {
    setLoading(true);
    setError("");
    try {
      if (!apiKey.trim()) {
        throw new Error("Wpisz klucz API Gemini, aby wygenerować materiał.");
      }

      const data = await generateWithGemini(apiKey.trim(), input);
      setResult(data);
    } catch (e) {
      setError(e.message || "Wystąpił nieznany błąd.");
    } finally {
      setLoading(false);
    }
  }

  function update(key, value) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  return (
    <div className="app">
      <header className="hero">
        <div className="pill">Prototyp aplikacji licencjackiej</div>
        <h1>CyberSzkoleniaAI</h1>
        <p>
          Aplikacja wspiera projektowanie szkoleń z cyberbezpieczeństwa studentów
          z wykorzystaniem modelu Gemini.
        </p>
      </header>

      <main className="layout">
        <section className="card">
          <h2>Konfiguracja</h2>

          <Field
            label="Gemini API Key"
            hint="Klucz jest zapisywany lokalnie w przeglądarce. Aplikacja korzysta wyłącznie z modelu Gemini, dlatego klucz jest wymagany."
          >
            <input
              type="password"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="Wklej klucz API Gemini"
            />
          </Field>

          <div className="stackedFields">
            <Field label="Temat">
              <select value={form.topic} onChange={(e) => update("topic", e.target.value)}>
                {TOPICS.map((topic) => <option key={topic}>{topic}</option>)}
              </select>
            </Field>

            <Field label="Grupa docelowa">
              <select value={form.audience} onChange={(e) => update("audience", e.target.value)}>
                {AUDIENCES.map((audience) => <option key={audience}>{audience}</option>)}
              </select>
            </Field>

            <Field label="Poziom trudności">
              <select value={form.difficulty} onChange={(e) => update("difficulty", e.target.value)}>
                {DIFFICULTIES.map((difficulty) => <option key={difficulty}>{difficulty}</option>)}
              </select>
            </Field>

            <Field label="Czas szkolenia (min)">
              <input
                type="number"
                min="15"
                max="180"
                value={form.duration}
                onChange={(e) => update("duration", e.target.value)}
              />
            </Field>

            <Field label="Liczba pytań w quizie">
              <input
                type="number"
                min="3"
                max="10"
                value={form.quizCount}
                onChange={(e) => update("quizCount", e.target.value)}
              />
            </Field>

            <Field label="Forma zajęć">
              <input
                type="text"
                value={form.form}
                onChange={(e) => update("form", e.target.value)}
                placeholder="np. miniwarsztat, quiz, case study"
              />
            </Field>
          </div>

          <Field label="Dodatkowe uwagi">
            <textarea
              rows="4"
              value={form.notes}
              onChange={(e) => update("notes", e.target.value)}
              placeholder="np. szkolenie ma być krótkie, praktyczne i skierowane do studentów nietechnicznych"
            />
          </Field>

          <button className="primaryButton" onClick={handleGenerate} disabled={loading || !apiKey.trim()}>
            {loading ? "Generowanie..." : "Wygeneruj materiał z Gemini"}
          </button>

          {error ? <div className="errorBox">{error}</div> : null}
        </section>

        <section className="results">
          <SectionCard title="O aplikacji">
            <p>
              Aplikacja działa wyłącznie z wykorzystaniem modelu Gemini. Dane z formularza są zamieniane
              na uporządkowany prompt, a następnie przesyłane do modelu w celu wygenerowania scenariusza,
              quizu oraz rekomendacji.
            </p>
          </SectionCard>

          {result ? (
            <>
              <SectionCard title={result.scenarioTitle}>
                <p><strong>Grupa docelowa:</strong> {result.targetGroup}</p>
                <h4>Cele szkolenia</h4>
                <ul>
                  {result.learningGoals?.map((goal) => <li key={goal}>{goal}</li>)}
                </ul>

                <h4>Plan szkolenia</h4>
                <div className="planList">
                  {result.trainingPlan?.map((item, idx) => (
                    <div key={`${item.module}-${idx}`} className="planItem">
                      <strong>{item.module}</strong>
                      <span>{item.durationMin} min</span>
                      <p>{item.description}</p>
                    </div>
                  ))}
                </div>

                <h4>Ćwiczenie praktyczne</h4>
                <p>{result.practicalExercise}</p>
              </SectionCard>

              <SectionCard title="Quiz">
                {result.quiz?.map((q, idx) => (
                  <div key={idx} className="quizItem">
                    <p><strong>{q.question}</strong></p>
                    <ol type="A">
                      {q.options?.map((option, i) => <li key={i}>{option}</li>)}
                    </ol>
                    <p><strong>Poprawna odpowiedź:</strong> {q.correctAnswer}</p>
                    <p><strong>Uzasadnienie:</strong> {q.explanation}</p>
                  </div>
                ))}
              </SectionCard>

              <SectionCard title="Rekomendacje dla prowadzącego">
                <ul>
                  {result.teacherRecommendations?.map((item) => <li key={item}>{item}</li>)}
                </ul>
                <p><strong>Uwaga:</strong> {result.riskNote}</p>
              </SectionCard>
            </>
          ) : null}
        </section>
      </main>
    </div>
  );
}
