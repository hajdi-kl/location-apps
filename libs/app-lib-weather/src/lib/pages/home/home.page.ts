import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { Store } from '@ngrx/store';
import {
  languageSlice,
  locationSlice,
} from 'apps/ionicapp-weather/src/app/store/index';
import { LocationSelectComponent } from '../components/location-select.component';
import { Payload } from '@angular-monorepo/ui-lib-location-select';
import { combineLatest } from 'rxjs';

@Component({
  selector: 'lib-app-home',
  imports: [CommonModule, IonicModule, LocationSelectComponent],
  templateUrl: './home.page.html',
  styleUrl: './home.page.scss',
})
export class HomePageComponent {
  loading = signal(false);

  constructor(private store: Store) {
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

  checkAndFetchWeatherData(language: string, locationData: Payload | null) {
    if (locationData && language) {
      console.log('Fetching weather data...', language, locationData);
      // this.loading.set(true);
      // setTimeout(() => {
      //   this.loading.set(false);
      // }, 2000);
    }
  }
}
