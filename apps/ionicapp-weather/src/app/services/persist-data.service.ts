import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { tap } from 'rxjs/operators';
import { initializeApp, languageSlice, locationSlice, StoreProps } from '../store';
import { Payload } from '@angular-monorepo/ui-lib-location-select';
import { parseJSON } from '@libs/util-lib-common/src/lib/utils/common';
import { Store } from '@ngrx/store';
import { LocaleService } from './locale.service';
import { Language } from '@shared/config';

@Injectable({ providedIn: 'root' })
export class PersistDataService {
  private actions$ = inject(Actions);
  private store = inject(Store);
  private localeService = inject(LocaleService);

  getLocalStorageItem(key: string): string | null {
    return localStorage.getItem(key);
  }

  setLocalStorageItem(key: string, value: string): void {
    localStorage.setItem(key, value);
  }

  removeLocalStorageItem(key: string): void {
    localStorage.removeItem(key);
  }

  createEffectForAppInit() {
    return createEffect(
      () =>
        this.actions$.pipe(
          ofType(initializeApp),
          tap(() => {
            const language = this.getLocalStorageItem(languageSlice.prop);
            if (language) {
              this.store.dispatch(
                languageSlice.set({ [languageSlice.prop]: language })
              );

              this.localeService.registerLocale(language as Language);
            }

            const location = this.getLocalStorageItem(locationSlice.prop) || '',
              locationData = parseJSON(location) as Payload | null;

            if (locationData) {
              this.store.dispatch(
                locationSlice.set({ [locationSlice.prop]: location })
              );
            }
          })
        ),
      { dispatch: false }
    );
  }

  createEffectForSlice(slice: { prop: string; set: any }) {
    return createEffect(
      () =>
        this.actions$.pipe(
          ofType(slice.set.type),
          tap((action) => {
            const value = action[slice.prop];
            this.setLocalStorageItem(slice.prop, value);
            this.checkForMoreSideEffects(slice.prop as StoreProps, value);
          })
        ),
      { dispatch: false }
    );
  }

  checkForMoreSideEffects(prop: StoreProps, value: any) {
    if (prop == StoreProps.Language) {
      this.localeService.registerLocale(value as Language);
    }
  }
}
