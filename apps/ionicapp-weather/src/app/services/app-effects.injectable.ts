import { Injectable, inject } from '@angular/core';
import { PersistDataService } from './persist-data.service';
import { languageSlice, locationSlice } from '@libs/util-lib-common/src/lib/store/weather/index';
@Injectable()
export class AppEffects {
  private persistData = inject(PersistDataService);

  initializeApp$ = this.persistData.createEffectForAppInit();
  languageSliceEffect$ = this.persistData.createEffectForSlice(languageSlice);
  locationSliceEffect$ = this.persistData.createEffectForSlice(locationSlice);
}
