"use client";

import React, { useState, useRef } from "react";
import { Mic, Send } from "lucide-react";

export default function AIInput({
  value,
  onChange,
  onSubmit,
  placeholder = "Ask AI to find the perfect tutor...",
  submitButtonText, // If provided, shows text button. If not, shows send icon button.
  className = "",
  mockFallbackText = "Need a qualified tutor near me",
  variant = "capsule" // "capsule" or "inline"
}) {
  const [isRecording, setIsRecording] = useState(false);
  const recognitionRef = useRef(null);

  const toggleMic = () => {
    if (isRecording) {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      setIsRecording(false);
    } else {
      setIsRecording(true);
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (!SpeechRecognition) {
        // Fallback for unsupported browsers
        setTimeout(() => {
          onChange(mockFallbackText);
          setIsRecording(false);
        }, 3000);
        return;
      }

      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = navigator.language || "en-US";

      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        if (transcript.trim()) {
          onChange(transcript);
        }
      };

      recognition.onerror = (e) => {
        console.error("Speech recognition error:", e.error);
        setIsRecording(false);
      };

      recognition.onend = () => {
        setIsRecording(false);
      };

      recognitionRef.current = recognition;
      recognition.start();
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (isRecording) return;
    if (onSubmit) onSubmit(value);
  };

  const containerClasses =
    variant === "inline"
      ? `p-4 pr-6 border-t border-color3/5 bg-white flex items-center gap-2 ${className}`
      : `relative flex items-center bg-white border border-color3/10 rounded-full p-1.5 pr-3.5 focus-within:border-color2 focus-within:ring-2 focus-within:ring-color2/20 transition-all duration-300 shadow-sm w-full ${className}`;

  const inputClasses =
    variant === "inline"
      ? "flex-1 min-w-0 text-sm text-color3 outline-none py-2 placeholder-color3/40 font-medium bg-transparent"
      : "flex-1 min-w-0 bg-transparent text-sm text-color3 outline-none px-3 py-2 placeholder-color3/40 font-medium";

  return (
    <form onSubmit={handleFormSubmit} className={containerClasses}>
      {/* Microphone Icon Button */}
      <button
        type="button"
        onClick={toggleMic}
        className={`p-2.5 rounded-full transition-all duration-200 flex-shrink-0 ${
          isRecording
            ? "bg-red-50 text-red-500 animate-pulse scale-105"
            : "text-color3/50 hover:text-color4 hover:bg-color1"
        }`}
        title={isRecording ? "Stop Recording" : "Voice Search"}
      >
        <Mic className="w-5 h-5" />
      </button>

      {isRecording ? (
        /* Sound Wave animation in place of input */
        <div className="flex-1 flex items-center gap-2.5 px-2 py-1 select-none">
          <span className="w-2 h-2 rounded-full bg-red-500 animate-ping"></span>
          <span className="text-xs font-semibold text-color3/60">Listening... Speak now</span>
          {/* Staggered bouncing waveform bars */}
          <div className="flex items-end gap-0.5 h-4 ml-auto pr-2">
            <span className="w-0.5 bg-color4 rounded-full animate-bounce [animation-duration:0.6s] h-2.5"></span>
            <span className="w-0.5 bg-color4 rounded-full animate-bounce [animation-duration:0.8s] h-4"></span>
            <span className="w-0.5 bg-color4 rounded-full animate-bounce [animation-duration:0.5s] h-3"></span>
            <span className="w-0.5 bg-color4 rounded-full animate-bounce [animation-duration:0.7s] h-2"></span>
          </div>
        </div>
      ) : (
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={inputClasses}
        />
      )}

      {isRecording && (
        <button
          type="button"
          onClick={toggleMic}
          className="text-xs bg-red-50 hover:bg-red-100 text-red-600 px-3.5 py-2 rounded-full font-bold transition-all shadow-sm flex-shrink-0"
        >
          Cancel
        </button>
      )}

      {!isRecording && (
        <>
          {submitButtonText ? (
            <button
              type="submit"
              disabled={!value.trim()}
              className="bg-color2 text-color1 hover:bg-color2/90 disabled:bg-color3/5 disabled:text-color3/30 transition-all font-semibold rounded-full px-5 py-2.5 text-xs shadow-sm flex-shrink-0 active:scale-95"
            >
              {submitButtonText}
            </button>
          ) : (
            <button
              type="submit"
              disabled={!value.trim()}
              className="p-2.5 rounded-full bg-color2 text-color1 hover:bg-color2/90 disabled:bg-color3/5 disabled:text-color3/30 transition-colors shadow-sm flex-shrink-0"
              aria-label="Send query"
            >
              <Send className="w-4 h-4" />
            </button>
          )}
        </>
      )}
    </form>
  );
}
