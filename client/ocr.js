/**
 * OCR Module - Client-side handwriting recognition using Tesseract.js
 * Detects and extracts text from images of handwritten math problems
 */

class OCRModule {
  constructor() {
    this.scriptLoaded = false;
  }

  /**
   * Load Tesseract.js library
   */
  async loadTesseract() {
    if (this.scriptLoaded) return;

    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/npm/tesseract.js@v2/dist/tesseract.min.js';
      script.onload = () => {
        this.scriptLoaded = true;
        resolve();
      };
      script.onerror = reject;
      document.head.appendChild(script);
    });
  }

  /**
   * Extract text from image
   * @param {File | Blob | string} imageInput - Image file, blob, or URL
   */
  async extractText(imageInput) {
    try {
      await this.loadTesseract();

      const { createWorker } = Tesseract;
      const worker = await createWorker('eng');

      const result = await worker.recognize(imageInput);
      await worker.terminate();

      return {
        ok: true,
        text: result.data.text,
        confidence: result.data.confidence,
        blocks: result.data.blocks
      };
    } catch (err) {
      return {
        ok: false,
        error: err.message
      };
    }
  }

  /**
   * Process camera capture
   * @param {HTMLCanvasElement} canvas - Canvas with captured image
   */
  async processCanvasCapture(canvas) {
    const imageData = canvas.toDataURL('image/png');
    return this.extractText(imageData);
  }
}

const ocrModule = new OCRModule();
