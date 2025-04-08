import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  Payload,
  UiLibLocationSelectComponent,
} from '@angular-monorepo/ui-lib-location-select';
import { LibLoaderComponent } from '@libs/util-lib-common/src/lib/components/loader.component';
import { LibLocationSelectCustomIconDirective } from '@libs/ui-lib-location-select/src/lib/ui-lib-location-select/ui-lib-location-select-custom-icon.directive';
import { Store } from '@ngrx/store';
import { locationSlice } from '@apps/ionicapp-weather/src/app/store';

@Component({
  selector: 'lib-location-select',
  imports: [
    CommonModule,
    UiLibLocationSelectComponent,
    LibLoaderComponent,
    LibLocationSelectCustomIconDirective,
  ],
  templateUrl: './location-select.component.html',
  styleUrl: './location-select.component.sass',
})
export class LocationSelectComponent {
  @Input() loading = false;
  constructor(private store: Store) {}

  locationOptions = [
    { name: 'Ljubljana', value: 'Ljubljana' },
    { name: 'Celje', value: 'Celje' },
    { name: 'Maribor', value: 'Maribor' },
    { name: 'Invalid', value: 'Invalid' },
  ];

  onLocationChange(selectedLocation: Payload) {
    this.store.dispatch(
      locationSlice.set({ [locationSlice.prop]: JSON.stringify(selectedLocation)})
    );
  }
}
