import { aiConfig } from "./ai-config.js";

export function aiSolver() {
  const aiInput = document.getElementById("ai-input");
  const aiResult = document.getElementById("ai-result");
  const micBtn = document.getElementById("mic-btn");
  const speakerBtn = document.getElementById("speaker-btn");
  const langSelect = document.getElementById("lang-select");

  if (!aiInput) return;

  // --- Speech Synthesis (Text to Speech) ---
  const synth = window.speechSynthesis;
  let autoSpeak = aiConfig.autoSpeak; // Auto-speak AI responses

  const speak = (text) => {
    if (synth.speaking) {
      synth.cancel(); // Stop current speech if any
    }
    if (text) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = langSelect.value;
      synth.speak(utterance);
    }
  };

  speakerBtn.addEventListener("click", () => {
    autoSpeak = !autoSpeak;
    speakerBtn.style.opacity = autoSpeak ? "1" : "0.5";
    if (!autoSpeak) {
      synth.cancel(); // Stop any ongoing speech
    }
  });

  // --- Speech Recognition (Voice to Text) ---
  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;
  if (SpeechRecognition) {
    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;

    micBtn.addEventListener("click", () => {
      recognition.lang = langSelect.value;
      recognition.start();
    });
    recognition.onstart = () => micBtn.classList.add("listening");
    recognition.onend = () => micBtn.classList.remove("listening");
    recognition.onerror = (event) => {
      console.error("Speech recognition error:", event.error);
      micBtn.classList.remove("listening");
    };
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      aiInput.value = transcript;
      processQuery(transcript);
    };
  } else {
    micBtn.style.display = "none"; // Hide mic button if not supported
  }

  let lastResult = null;
  const apiKey = aiConfig.apiKey;
  const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${aiConfig.model}:generateContent?key=${apiKey}`;

  const processQuery = async (query) => {
    query = query.trim();
    if (!query) return;
    aiResult.textContent = "Thinking...";

    let prompt =
      "You are a powerful calculator and math solver. Solve the following query concisely and return only the final answer without any explanation or preamble. If the query is a simple calculation, just return the number. For equations, provide the solution (e.g., x = 5). For conversions, give the converted value with units.";

    if (lastResult != null) {
      prompt += ` The previous result was: ${lastResult}. Use this context if the new query refrs to it (e.g., 'add 10 to that').`;
    }

    prompt += `\n\nQuery: ${query}`;

    try {
        fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`)
  .then(response => response.json())
  .then(data => console.log(data.models))
  .catch(error => console.error(error));
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] }),
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status} ${response.statusText}`);
      }
      const data = await response.json();
      const answer = data.candidates[0].content.parts[0].text.trim();
      aiResult.textContent = answer;
      lastResult = answer;
      if (window.historyManager) window.historyManager.add(query, answer);
      if (autoSpeak) speak(answer);
    } catch (error) {
      const errorMessage = `Error: ${error.message}`;
      aiResult.textContent = errorMessage;
      console.error("AI Solver error:", error);
      if (autoSpeak) speak(errorMessage);
    }
  };

  aiInput.addEventListener("keyup", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      processQuery(aiInput.value);
      aiInput.value = ""; // Clear input after processing
    }
  });
}
