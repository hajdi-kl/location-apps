import { createGenericReducer } from '@libs/util-lib-common/src/lib/store/generic/generic.reducer';
import { createGenericSelector } from '@libs/util-lib-common/src/lib/store/generic/generic.selectors';
import { languages } from '@shared/config/weather';
import { WeatherData } from '../models/weather.model';

/* In case of store props collision, use the following enum to avoid conflicts. */

export const enum StoreProps {
  Language = 'language',
  Location = 'location',
  Weather = 'weather',
  Loading = 'loading',
}

export const appDefaultLanguage = languages[0].value;
const languageReducer = createGenericReducer(
    StoreProps.Language,
    appDefaultLanguage
  ),
  languageSlice = {
    reducer: languageReducer.reducer,
    selector: createGenericSelector(StoreProps.Language),
    prop: StoreProps.Language,
    set: languageReducer.set,
  };

const locationReducer = createGenericReducer(StoreProps.Location, ''),
  locationSlice = {
    reducer: locationReducer.reducer,
    selector: createGenericSelector(StoreProps.Location),
    prop: StoreProps.Location,
    set: locationReducer.set,
  };

const loadingReducer = createGenericReducer(StoreProps.Loading, false),
  loadingSlice = {
    reducer: loadingReducer.reducer,
    selector: createGenericSelector(StoreProps.Loading),
    prop: StoreProps.Loading,
    set: loadingReducer.set,
  };

const weatherReducer = createGenericReducer(
    StoreProps.Weather,
    (null as WeatherData | null)
  ),
  weatherSlice = {
    reducer: weatherReducer.reducer,
    selector: createGenericSelector(StoreProps.Weather),
    prop: StoreProps.Weather,
    set: weatherReducer.set,
  };

export { languageSlice, locationSlice, loadingSlice, weatherSlice };

/////////////////////////////////

import { createAction } from '@ngrx/store';

export const initializeApp = createAction('[App] Initialize');
