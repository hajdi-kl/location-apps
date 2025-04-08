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
  }

  si: any = {
    hello: 'Zivijo',
  }

  de: any = {
    hello: 'Hallloo',
  }
}
