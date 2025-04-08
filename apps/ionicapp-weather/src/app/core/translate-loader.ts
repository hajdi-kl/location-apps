import { TranslateLoader } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { WEATHER_API_URL } from '@shared/config/weather';


export class CustomTranslateLoader implements TranslateLoader {
  constructor(private http: HttpClient) {}

  getTranslation(lang: string): Observable<any> {
    return this.http.get(`${WEATHER_API_URL}/translations?lang=${lang}`);
  }
}
export function HttpLoaderFactory(http: HttpClient): CustomTranslateLoader {
  return new CustomTranslateLoader(http);
}
