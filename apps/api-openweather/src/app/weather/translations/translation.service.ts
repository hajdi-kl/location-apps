import { Injectable } from '@nestjs/common';
import { translation } from '@shared/config/weather';

@Injectable()
export class WeatherTranslationService {
  getTranslation(lang: string): any {
    // TODO get from a DB where other users (translators) can update the translations
    if (!translation[lang]) {
      throw new Error(`Language ${lang} not supported`);
    }

    return translation[lang];
  }
}
