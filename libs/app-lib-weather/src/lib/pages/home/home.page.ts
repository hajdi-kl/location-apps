import { Component } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { Store } from '@ngrx/store';
import {
  languageSlice,
  loadingSlice,
  locationSlice,
  weatherSlice,
} from '@libs/util-lib-common/src/lib/store/weather/index';
import { WeatherData } from '@shared/types/weather';

import { LocationSelectComponent } from '../components/location-select.component';
import { Payload } from '@angular-monorepo/ui-lib-location-select';
import { catchError, combineLatest, finalize, Observable, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { SelectOption } from '@shared/types/common';
import {
  TranslateDirective,
  TranslatePipe,
  TranslateService,
} from '@ngx-translate/core';
import { WEATHER_API_URL } from '@shared/config/weather';
import { parseJSON } from '@libs/util-lib-common/src/lib/utils/common';
import { WeatherResponse } from '@shared/types/weather';
import { IonCard, IonCardContent } from '@ionic/angular/standalone';

@Component({
  selector: 'lib-app-home',
  imports: [
    CommonModule,
    LocationSelectComponent,
    TranslatePipe,
    TranslateDirective,
    IonCard,
    IonCardContent,
  ],
  providers: [DatePipe],
  templateUrl: './home.page.html',
  styleUrl: './home.page.scss',
})
export class HomePageComponent {
  loading$;
  weatherData$: Observable<WeatherData | null>;

  constructor(
    private store: Store,
    private http: HttpClient,
    private translate: TranslateService,
    private datePipe: DatePipe
  ) {
    this.loading$ = this.store.select(loadingSlice.selector);
    this.weatherData$ = this.store.select(weatherSlice.selector);

    combineLatest([
      this.store.select(languageSlice.selector),
      this.store.select(locationSlice.selector),
    ]).subscribe(([language, locationString]) => {
      let locationData: Payload | null;
      try {
        locationData = parseJSON(locationString) as Payload | null;
      } catch {
        locationData = null;
      }
      this.checkAndFetchWeatherData(language, locationData);
    });
  }

  checkAndFetchWeatherData(language: string, locationData: any | null) {
    if (locationData && language) {
      this.store.dispatch(loadingSlice.set({ [loadingSlice.prop]: true }));

      const params: any = {
        lang: language,
        refresh: true,
      };

      if (locationData.lat && locationData.lon) {
        params.lat = locationData.lat;
        params.lon = locationData.lon;
      } else if (locationData as SelectOption) {
        params.q = locationData.value;
      }

      this.store.dispatch(
        weatherSlice.set({ [weatherSlice.prop]: null })
      );

      // Todo add FE cache in service as well to avoid same calls
      this.http
        .get(WEATHER_API_URL + '/data', { params })
        .pipe(
          tap((response) => {
            const data = response as WeatherResponse;

            const date = new Date(data.dt * 1000),
              dateFormat = this.translate.instant('dateFormat'),
              formattedDate = this.datePipe.transform(date, dateFormat) || '';

            const storeData: WeatherData = {
              temp: data.main.temp,
              feelsLike: data.main.feels_like,
              weather: data.weather[0].description,
              icon: data.weather[0].icon,
              dt: data.dt,
              formattedDate,
            };
            this.store.dispatch(
              weatherSlice.set({ [weatherSlice.prop]: storeData })
            );
          }),
          catchError((error) => {
            console.error('Error fetching weather data', error);
            return [];
          }),
          finalize(() => {
            this.store.dispatch(
              loadingSlice.set({ [loadingSlice.prop]: false })
            );
          })
        )
        .subscribe();
    }
  }
}
