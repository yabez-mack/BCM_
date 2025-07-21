import { Injectable } from '@angular/core';
import Quill from 'quill';

@Injectable({
  providedIn: 'root' // Makes it available app-wide
})
export class QuillConfigService {

  constructor() {
    this.registerFonts();
  }

  private registerFonts(): void {
    const Font = Quill.import('formats/font');
    Font.whitelist = ['sans-serif', 'monospace', 'Bamini'];
    Quill.register(Font, true);
  }
}
