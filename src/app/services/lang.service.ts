import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class LangService {
  constructor() {}

  getCurLang(): string {
    return sessionStorage.getItem('language') || 'en';
  }
}
