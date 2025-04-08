import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { Store } from '@ngrx/store';
import {
  languageSlice,
  locationSlice,
} from '@apps/ionicapp-weather/src/app/store/index';
import { LocationSelectComponent } from '../components/location-select.component';
import { Payload } from '@angular-monorepo/ui-lib-location-select';
import { catchError, combineLatest, finalize, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { SelectOption } from '@shared/types/common';
import {
  TranslateDirective,
  TranslatePipe,
} from '@ngx-translate/core';
import { WEATHER_API_URL } from '@shared/config/weather';
import { parseJSON } from '@libs/util-lib-common/src/lib/utils/common'

@Component({
  selector: 'lib-app-home',
  imports: [
    CommonModule,
    IonicModule,
    LocationSelectComponent,
    TranslatePipe,
    TranslateDirective,
  ],
  templateUrl: './home.page.html',
  styleUrl: './home.page.scss',
})
export class HomePageComponent {
  loading = signal(false); // Doesn't make sense to save in store, as it is only used in this component

  constructor(
    private store: Store,
    private http: HttpClient,
  ) {
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
      this.loading.set(true);

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

      // Todo add FE cache in service as well to avoid same calls
      this.http
        .get(WEATHER_API_URL + '/data', { params })
        .pipe(
          tap(response => {
            // Dispatch success action to the store
            console.log('Weather data:', response);
          }),
          catchError((error) => {
            console.error('Error fetching data:', error);
            return [];
          }),
          finalize(() => {
            this.loading.set(false);
          })
        )
        .subscribe();

    }
  }
}
