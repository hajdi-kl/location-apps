import { createGenericReducer } from '@libs/util-lib-common/src/lib/store/generic/generic.reducer';
import { createGenericSelector } from '@libs/util-lib-common/src/lib/store/generic/generic.selectors';

/* In case of store props collision, use the following enum to avoid conflicts. */

export const enum StoreProps {
  Language = 'language',
  Location = 'location',
  Loading = 'loading',
}

const languageReducer = createGenericReducer(StoreProps.Language, 'en'),
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

const loadingReducer = createGenericReducer(StoreProps.Loading, true),
  loadingSlice = {
    reducer: loadingReducer.reducer,
    selector: createGenericSelector(StoreProps.Loading),
    prop: StoreProps.Loading,
    set: loadingReducer.set,
  };


export { languageSlice, locationSlice, loadingSlice };
