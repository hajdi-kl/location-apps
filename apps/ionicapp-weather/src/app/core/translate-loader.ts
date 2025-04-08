import { TranslateLoader } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, of } from 'rxjs';
import { translationDefault, WEATHER_API_URL } from '@shared/config/weather';
import { WeatherTranslationData } from '@shared/types/weather';
import { PRELOADED_LANGUAGE } from '../app.component';

export class CustomTranslateLoader implements TranslateLoader {
  constructor(private http: HttpClient) {}

  getTranslation(lang: string): Observable<WeatherTranslationData> {
    if (lang === PRELOADED_LANGUAGE) {
      return of(translationDefault);
    }

    return this.http
      .get<WeatherTranslationData>(
        `${WEATHER_API_URL}/translations?lang=${lang}`
      )
      .pipe(
        catchError((error) => {
          console.error('Error fetching translations:', error);
          return of(translationDefault);
        })
      );
  }
}

export function HttpLoaderFactory(http: HttpClient): CustomTranslateLoader {
  return new CustomTranslateLoader(http);
}
