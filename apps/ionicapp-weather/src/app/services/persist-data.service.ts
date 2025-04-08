import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { tap } from 'rxjs/operators';
import { initializeApp, languageSlice, locationSlice } from '../store';
import { Payload } from '@angular-monorepo/ui-lib-location-select';
import { parseJSON } from '@libs/util-lib-common/src/lib/utils/common';
import { Store } from '@ngrx/store';

@Injectable({ providedIn: 'root' })
export class PersistDataService {
  private actions$ = inject(Actions);
  private store = inject(Store);

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
          })
        ),
      { dispatch: false }
    );
  }
}
