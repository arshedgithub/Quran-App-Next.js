'use client';

import { useEffect, useState } from 'react';


export default function Home() {
  const [transcript, setTranscript] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const ua = navigator.userAgent;
  
      const isNotChrome =
        !/Chrome/.test(ua) ||
        /Brave|Edg|OPR|Opera|Firefox|Safari(?!.*Chrome)|MSIE|Trident/.test(ua);
  
      if (isNotChrome) {
        setShowModal(true);
      }
    }
  }, []);

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

      {/* inaccurate browser warning */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg max-w-md text-center">
            <h2 className="text-xl font-bold mb-2 text-red-600">⚠️ Browser Warning</h2>
            <p className="mb-4">This app may not work properly or accurately in browsers other than Chrome.</p>
            <p className="mb-4 font-medium">Please use <span className="text-blue-600">Google Chrome</span> for the best experience.</p>
            
            <p className="mb-4">Or <br /> Download our mobile app for a better experience</p>
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 underline font-semibold"
            >Download</a>
            <div className="mt-4">
              <button
                onClick={() => setShowModal(false)}
                className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-700"
              >
                Continue Anyway
              </button>
            </div>
          </div>
        </div>
      )}

    </main>
  );
}
