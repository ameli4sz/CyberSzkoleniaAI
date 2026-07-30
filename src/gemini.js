const GEMINI_URL =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent";

function buildPrompt(input) {
  return `
Jesteś asystentem dydaktycznym wspierającym projektowanie edukacji cyberbezpieczeństwa studentów.
Przygotuj odpowiedź w języku polskim.
Zwróć WYŁĄCZNIE poprawny JSON bez komentarzy i bez markdownu.

Wymagany format JSON:
{
  "scenarioTitle": "string",
  "targetGroup": "string",
  "learningGoals": ["string", "string", "string"],
  "trainingPlan": [
    {"module": "string", "description": "string", "durationMin": number}
  ],
  "practicalExercise": "string",
  "quiz": [
    {
      "question": "string",
      "options": ["A", "B", "C", "D"],
      "correctAnswer": "A|B|C|D",
      "explanation": "string"
    }
  ],
  "teacherRecommendations": ["string", "string", "string"],
  "riskNote": "string"
}

Dane wejściowe:
- temat: ${input.topicLabel}
- grupa docelowa: ${input.audienceLabel}
- poziom trudności: ${input.difficultyLabel}
- czas szkolenia w minutach: ${input.duration}
- forma zajęć: ${input.form}
- liczba pytań quizowych: ${input.quizCount}
- dodatkowe uwagi: ${input.notes || "brak"}

Wymagania:
- scenariusz ma dotyczyć edukacji cyberbezpieczeństwa studentów,
- plan ma być realistyczny i spójny czasowo,
- quiz ma mieć dokładnie ${input.quizCount} pytań,
- rekomendacje mają być praktyczne dla prowadzącego,
- nie twórz treści nieetycznych ani instrukcji ataku.
`.trim();
}

export async function generateWithGemini(apiKey, input) {
  const prompt = buildPrompt(input);

  const response = await fetch(
    `${GEMINI_URL}?key=${encodeURIComponent(apiKey)}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [
          {
            role: "user",
            parts: [{ text: prompt }],
          },
        ],
        generationConfig: {
          temperature: 0.7,
          responseMimeType: "application/json",
        },
      }),
    },
  );

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Błąd Gemini: ${response.status} ${text}`);
  }

  const data = await response.json();
  const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;

  if (!text) {
    throw new Error("Gemini nie zwróciło treści.");
  }

  try {
    return JSON.parse(text);
  } catch (error) {
    throw new Error("Nie udało się odczytać odpowiedzi JSON z Gemini.");
  }
}
