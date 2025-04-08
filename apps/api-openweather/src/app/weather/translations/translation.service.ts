import { Injectable } from '@nestjs/common';

@Injectable()
export class WeatherTranslationService {
  getTranslation(lang: string): any {
    // TODO get from a DB where other users (translators) can update the translations
    if (!this[lang]) {
      throw new Error(`Language ${lang} not supported`);
    }

    return this[lang];
  }

  en: any = {
    hello: 'Hello',
    dateFormat: 'dd.MM.yyyy \'at\' HH:mm',
  };

  si: any = {
    hello: 'Zivijo',
    dateFormat: 'dd.MM.yyyy \'ob\' HH:mm',

  };

  de: any = {
    hello: 'Hallloo',
    dateFormat: 'dd.MM.yyyy \'um\' HH:mm',
  };
}
