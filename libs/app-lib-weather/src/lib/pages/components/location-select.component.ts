import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  Payload,
  UiLibLocationSelectComponent,
} from '@angular-monorepo/ui-lib-location-select';
import { LibLoaderComponent } from '@libs/util-lib-common/src/lib/components/loader.component';
import { LibLocationSelectCustomIconDirective } from '@libs/ui-lib-location-select/src/lib/ui-lib-location-select/ui-lib-location-select-custom-icon.directive';
import { Store } from '@ngrx/store';
import { locationSlice } from '@libs/util-lib-common/src/lib/store/weather/index';
import { TranslateService } from '@ngx-translate/core';

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

  locationOptions = [
    { name: 'Ljubljana', value: 'Ljubljana' },
    { name: 'Celje', value: 'Celje' },
    { name: 'Maribor', value: 'Maribor' },
    { name: 'Invalid', value: 'Invalid' },
  ];

  selectLocation = '';
  loadingData = '';

  constructor(
    private store: Store,
    private translateService: TranslateService
  ) {
    this.translateService.onLangChange.subscribe(() => {
      this.cacheTranslation();
    });

    this.cacheTranslation();
  }

  cacheTranslation() {
    /*
      Why do we cache?

        {{loading ?  ('loadingData' | translate) : ('selectLocation' | translate)}}
        ^ is a dynamic expression and if a new language is lazy loaded, while the request is made, evaluates is empty

        {{('loadingData' | translate)}} - cached by the pipe
        <span translate="selectLocation"></span> - cached by the directrive

        {{loading ? loadingData : selectLocation}}
        ^ create own cache to not have empty dynamic translations
    */
    this.selectLocation = this.translateService.instant('selectLocation');
    this.loadingData = this.translateService.instant('loadingData');
  }

  onLocationChange(selectedLocation: Payload): void {
    this.store.dispatch(
      locationSlice.set({
        [locationSlice.prop]: JSON.stringify(selectedLocation),
      })
    );
  }
}
