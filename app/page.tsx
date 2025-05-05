'use client';

import { useState } from 'react';

export default function Home() {
  const [transcript, setTranscript] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [error, setError] = useState<string | null>(null);

  let recognition: SpeechRecognition | null = null;

  if (typeof window !== 'undefined') {
    const SpeechRecognitionConstructor =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (SpeechRecognitionConstructor) {
      recognition = new SpeechRecognitionConstructor();
      recognition.lang = 'ar';
      recognition.interimResults = true;
      recognition.maxAlternatives = 1;
    }
  }

  const startListening = () => {
    if (!recognition) {
      setError("SpeechRecognition API not supported.");
      return;
    }

    setTranscript('');
    setError(null);
    setIsListening(true);

    recognition.start();

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      const lastResult = event.results[event.results.length - 1];
      if (lastResult && lastResult[0]) {
        setTranscript(lastResult[0].transcript);
      }
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
      setError(`Error: ${event.error}`);
      setIsListening(false);
    };
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-8 bg-gray-50">
      <h1 className="text-2xl font-bold mb-4">🎙️ Real-Time Arabic Voice Transcription</h1>
      <button
        onClick={startListening}
        disabled={isListening}
        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
      >
        {isListening ? 'Listening...' : 'Start Transcribing'}
      </button>

      {error && <p className="text-red-500 mt-4">{error}</p>}

      <div className="mt-6 bg-white rounded shadow p-4 w-full max-w-xl">
        <p className="text-lg">📝 Transcription:</p>
        <p className="mt-2 text-right text-xl font-semibold text-gray-800">{transcript}</p>
      </div>
    </main>
  );
}
