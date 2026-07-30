# CyberSzkoleniaAI

Prototyp aplikacji webowej stworzony w ramach pracy licencjackiej. Aplikacja wspiera prowadzących w projektowaniu **szkoleń z cyberbezpieczeństwa dla studentów** — generuje gotowe scenariusze szkoleń, quizy oraz rekomendacje, wykorzystując model **Gemini AI**.

## Opis

CyberSzkoleniaAI pozwala prowadzącemu w kilka sekund przygotować kompletny materiał szkoleniowy dopasowany do:

- **tematu** (np. phishing i socjotechnika, hasła i uwierzytelnianie, ochrona danych, bezpieczna poczta uczelniana, złośliwe oprogramowanie),
- **grupy docelowej** (studenci I roku, kierunki techniczne, biznesowe, grupa mieszana),
- **poziomu trudności** (podstawowy / średni / zaawansowany),
- **czasu trwania** i **formy zajęć** (np. warsztat z analizą przypadku),
- **liczby pytań w quizie**.

Na podstawie tych parametrów aplikacja buduje prompt, wysyła go do modelu Gemini i prezentuje wynik jako uporządkowany **scenariusz szkolenia**, **quiz** oraz **rekomendacje** dla prowadzącego.

## Technologie

- [React 18](https://react.dev/)
- [Vite](https://vitejs.dev/) — szybki build i serwer developerski
- [Google Gemini API](https://ai.google.dev/) — generowanie treści szkoleniowych

## Instalacja i uruchomienie

### Wymagania
- [Node.js](https://nodejs.org/) (wersja 18 lub nowsza)

### Kroki

1. Sklonuj repozytorium:
   ```bash
   git clone https://github.com/ameli4sz/CyberSzkoleniaAI.git
   cd CyberSzkoleniaAI
   ```

2. Zainstaluj zależności:
   ```bash
   npm install
   ```

3. Uruchom aplikację w trybie deweloperskim:
   ```bash
   npm run dev
   ```

4. Otwórz w przeglądarce adres wyświetlony w terminalu (zwykle `http://localhost:5173`).

5. Wklej swój **klucz API Gemini** w formularzu aplikacji, aby móc generować materiały szkoleniowe. Klucz możesz uzyskać na [aistudio.google.com/apikey](https://aistudio.google.com/apikey).

## Dostępne skrypty

| Komenda | Opis |
|---|---|
| `npm run dev` | Uruchamia serwer developerski |
| `npm run build` | Buduje wersję produkcyjną do folderu `dist/` |
| `npm run preview` | Podgląd zbudowanej wersji produkcyjnej |

## Uwagi dotyczące klucza API

W obecnej wersji prototypu klucz API Gemini jest wpisywany bezpośrednio w interfejsie i przechowywany **lokalnie w przeglądarce użytkownika** (`localStorage`). To rozwiązanie jest wystarczające na potrzeby prototypu w pracy licencjackiej.


<<<<<<< HEAD
## 🎓 Kontekst
=======
## Kontekst
>>>>>>> 78b623d4459363093106c148a1c1b0db0ecd6f1a

Projekt powstał jako element pracy licencjackiej dotyczącej wykorzystania sztucznej inteligencji we wspieraniu edukacji z zakresu cyberbezpieczeństwa.


