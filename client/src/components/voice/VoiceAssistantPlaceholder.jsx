import React, { useState } from 'react';
import { Mic, Volume2 } from 'lucide-react';

export const VoiceAssistantPlaceholder = () => {
  const [listening, setListening] = useState(false);

  return (
    <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4 flex items-center justify-between gap-4">
      <div className="flex items-center gap-3">
        <button
          onClick={() => setListening(!listening)}
          className={`p-3 rounded-full ${listening ? 'bg-rose-600 text-white animate-bounce' : 'bg-emerald-700 text-white hover:bg-emerald-800'}`}
        >
          <Mic className="w-5 h-5" />
        </button>
        <div>
          <h4 className="text-xs font-bold text-emerald-950 uppercase tracking-wide">
            Farmer Bol-Assist (Voice Navigation)
          </h4>
          <p className="text-xs text-emerald-800">
            {listening ? 'Listening... Speak in Tamil or English' : 'Tap microphone for Multilingual Voice Help'}
          </p>
        </div>
      </div>
      <Volume2 className="w-5 h-5 text-emerald-700 hidden sm:block" />
    </div>
  );
};

export default VoiceAssistantPlaceholder;
