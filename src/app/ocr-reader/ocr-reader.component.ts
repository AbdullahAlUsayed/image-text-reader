import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-ocr-reader',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './ocr-reader.component.html',
  styleUrls: ['./ocr-reader.component.css']
})
export class OcrReaderComponent {

  private isBrowser: boolean;

  selectedImage: File | null = null;
  imagePreview: string | ArrayBuffer | null = null;
  extractedText = '';
  loading = false;
  errorMessage = '';

  constructor(@Inject(PLATFORM_ID) platformId: object) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  onFileSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (!file || !file.type.startsWith('image/')) {
      this.errorMessage = 'Please upload a valid image';
      return;
    }


    this.selectedImage = file;
    const reader = new FileReader();
    reader.onload = () => this.imagePreview = reader.result;
    reader.readAsDataURL(file);
  }

  async extractText() {
    if (!this.selectedImage || !this.isBrowser) return;

    this.loading = true;

    // ✅ Dynamic import (browser only)
    const Tesseract = await import('tesseract.js');

    try {
      const result = await Tesseract.recognize(this.selectedImage, 'eng');
      this.extractedText = result.data.text;
    } catch {
      this.errorMessage = 'OCR failed';
    } finally {
      this.loading = false;
    }
  }

  copyText() {
    navigator.clipboard.writeText(this.extractedText);
  }
}
