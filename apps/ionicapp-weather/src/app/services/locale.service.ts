import { Injectable } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localeEn from '@angular/common/locales/en';
import localeDe from '@angular/common/locales/de';
import localeSi from '@angular/common/locales/si';
import { Language } from '@shared/config';

@Injectable({
  providedIn: 'root',
})
export class LocaleService {
  private registeredLocales: Set<Language> = new Set();

  private availableLocales = {
    [Language.English]: localeEn,
    [Language.German]: localeDe,
    [Language.Slovenian]: localeSi
  };

  registerLocale(language: Language): void {
    // TODO could also load them lazily
    if (this.registeredLocales.has(language)) {
      return;
    }

    const localeData = this.availableLocales[language];
    if (localeData) {
      registerLocaleData(localeData);
      this.registeredLocales.add(language);
    } else {
      console.warn(`Locale '${language}' is not available.`);
    }
  }
}
