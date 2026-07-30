CyberSzkoleniaAI

To jest prototyp aplikacji webowej do pracy licencjackiej.
Aplikacja służy do generowania scenariuszy szkoleń, quizów i rekomendacji
dla prowadzącego z wykorzystaniem modelu Gemini.

Aplikacja działa wyłącznie z Gemini:
- użytkownik wpisuje klucz API Gemini w interfejsie,
- dane z formularza są przekształcane w prompt,
- model Gemini zwraca uporządkowaną odpowiedź w formacie JSON,
- wynik jest prezentowany jako scenariusz szkolenia, quiz i rekomendacje.

Jak uruchomić:
1. Rozpakuj archiwum ZIP.
2. Otwórz terminal w folderze projektu.
3. Wpisz:
   npm install
   npm run dev
4. Wklej klucz API Gemini w polu formularza i wygeneruj materiał.

Uwagi:
- W tej wersji klucz API Gemini jest wpisywany w interfejsie i przechowywany lokalnie w przeglądarce.
- To rozwiązanie dobre do prototypu/demo. Do wdrożenia produkcyjnego lepiej użyć backendu, żeby nie ujawniać klucza w przeglądarce.
