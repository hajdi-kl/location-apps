import { Component, signal } from '@angular/core';
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
import {
  catchError,
  combineLatest,
  finalize,
  map,
  Observable,
  tap,
} from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { SelectOption } from '@shared/types/common';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { WEATHER_API_URL } from '@shared/config/weather';
import { parseJSON } from '@libs/util-lib-common/src/lib/utils/common';
import { WeatherResponse } from '@shared/types/weather';
import { IonCard, IonCardContent, IonRefresher, IonRefresherContent } from '@ionic/angular/standalone';

const decodeLocationData = (locationString: string) => {
  let locationData: Payload | null;
  try {
    locationData = parseJSON(locationString) as Payload | null;
  } catch {
    locationData = null;
  }

  return locationData;
};
@Component({
  selector: 'lib-app-home',
  imports: [
    CommonModule,
    LocationSelectComponent,
    TranslatePipe,
    IonCard,
    IonCardContent,
    IonRefresher,
    IonRefresherContent
  ],
  providers: [DatePipe],
  templateUrl: './home.page.html',
  styleUrl: './home.page.scss',
})
export class HomePageComponent {
  loading$;
  location$;
  locationDisplay$;
  weatherData$: Observable<WeatherData | null>;
  language$;
  error = signal(false);

  constructor(
    private store: Store,
    private http: HttpClient,
    private translate: TranslateService,
    private datePipe: DatePipe
  ) {
    this.loading$ = this.store.select(loadingSlice.selector);
    this.weatherData$ = this.store.select(weatherSlice.selector);
    this.location$ = this.store.select(locationSlice.selector);
    this.language$ = this.store.select(languageSlice.selector);

    combineLatest([
      this.language$,
      this.location$,
    ]).subscribe(([language, locationString]) => {
      this.checkAndFetchWeatherData(language, decodeLocationData(locationString));
    });

    this.locationDisplay$ = combineLatest([this.location$, this.weatherData$]).pipe(
      map(([locationString, weatherData]) => {
        const locationData = decodeLocationData(locationString);
        if (locationData && 'lat' in locationData && 'lon' in locationData) {
          // TODO since we load from localStorage, may not be trully current on mobile! Extend effect that preloads location, and possibly ask for current location then?
          return `Current Location (${weatherData?.location || ''})`;
        }
        return locationData?.name || '';
      })
    );
  }

  handleRefresh(event: CustomEvent) {
    combineLatest([
      this.language$,
      this.location$
    ]).subscribe(([language, locationString]) => {
      const locationData = decodeLocationData(locationString);
      this.checkAndFetchWeatherData(language, locationData, event); // Pass refresh as true
    });
  }

  checkAndFetchWeatherData(language: string, locationData: any | null, refresher?: CustomEvent) {
    if (locationData && language) {
      this.store.dispatch(loadingSlice.set({ [loadingSlice.prop]: true }));
      this.error.set(false);

      const params: any = {
        lang: language,
        refresh: !!refresher,
      };

      if (locationData.lat && locationData.lon) {
        params.lat = locationData.lat;
        params.lon = locationData.lon;
      } else if (locationData as SelectOption) {
        params.q = locationData.value;
      }

      this.store.dispatch(weatherSlice.set({ [weatherSlice.prop]: null }));

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
              location: data.name
            };
            this.store.dispatch(
              weatherSlice.set({ [weatherSlice.prop]: storeData })
            );
          }),
          catchError(() => {
            this.error.set(true);

            return [];
          }),
          finalize(() => {
            this.store.dispatch(
              loadingSlice.set({ [loadingSlice.prop]: false })
            );
            (refresher?.target as HTMLIonRefresherElement).complete();
          })
        )
        .subscribe();
    }
  }
}
