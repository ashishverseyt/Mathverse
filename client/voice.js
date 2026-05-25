/**
 * Voice Input Module - Client-side speech-to-text using Web Speech API
 * Converts spoken math problems to text that can be sent to AI solver
 */

class VoiceInputModule {
  constructor() {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    this.recognition = SpeechRecognition ? new SpeechRecognition() : null;
    this.isListening = false;
    this.transcript = '';

    if (this.recognition) {
      this.recognition.continuous = false;
      this.recognition.interimResults = true;
      this.recognition.lang = 'en-US';

      this.recognition.onstart = () => {
        this.isListening = true;
      };

      this.recognition.onend = () => {
        this.isListening = false;
      };

      this.recognition.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
      };
    }
  }

  /**
   * Check if browser supports Web Speech API
   */
  isSupported() {
    return this.recognition !== null;
  }

  /**
   * Start listening for speech
   * @param {Function} onResult - Callback for interim results
   * @param {Function} onFinal - Callback for final transcript
   */
  startListening(onResult, onFinal) {
    if (!this.recognition) {
      console.error('Speech Recognition not supported');
      return;
    }

    this.transcript = '';

    this.recognition.onresult = (event) => {
      let interim = '';
      
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;
        
        if (event.results[i].isFinal) {
          this.transcript += transcript + ' ';
        } else {
          interim += transcript;
        }
      }

      if (interim) {
        onResult?.(interim);
      }
      
      if (event.results[event.results.length - 1].isFinal) {
        onFinal?.(this.transcript.trim());
      }
    };

    this.recognition.start();
  }

  /**
   * Stop listening
   */
  stopListening() {
    if (this.recognition && this.isListening) {
      this.recognition.stop();
    }
  }

  /**
   * Get current transcript
   */
  getTranscript() {
    return this.transcript.trim();
  }

  /**
   * Clear transcript
   */
  clearTranscript() {
    this.transcript = '';
  }

  /**
   * Set language for recognition
   * @param {string} lang - Language code (e.g., 'en-US', 'es-ES', 'fr-FR')
   */
  setLanguage(lang) {
    if (this.recognition) {
      this.recognition.lang = lang;
    }
  }
}

const voiceModule = new VoiceInputModule();
