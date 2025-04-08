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
import { combineLatest } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { SelectOption } from '@shared/types/common';

@Component({
  selector: 'lib-app-home',
  imports: [CommonModule, IonicModule, LocationSelectComponent],
  templateUrl: './home.page.html',
  styleUrl: './home.page.scss',
})
export class HomePageComponent {
  loading = signal(false); // Doesn't make sense to save in store, as it is only used in this component

  constructor(private store: Store, private http: HttpClient) {
    combineLatest([
      this.store.select(languageSlice.selector),
      this.store.select(locationSlice.selector),
    ]).subscribe(([language, locationString]) => {
      let locationData: Payload | null;
      try {
        locationData = locationString ? JSON.parse(locationString) : null;
      } catch {
        locationData = null;
      }
      this.checkAndFetchWeatherData(language, locationData);
    });
  }

  checkAndFetchWeatherData(language: string, locationData: any | null) {
    if (locationData && language) {
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

      this.http
        .get('http://localhost:3000/api/weather/data', { params })
        .subscribe(
          (response) => {
            console.log('Weather data:', response);
          },
          (error) => {
            console.error('Error fetching data:', error);
          }
        );
    }
  }
}
