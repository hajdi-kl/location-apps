import { createReducer, on } from '@ngrx/store';
import { createSetAction } from './generic.actions';

export function createGenericReducer(stateProp: string, initialValue: any) {
  const set = createSetAction(stateProp);

  return {
    reducer: createReducer(
      initialValue,
      on(set, (state, payload) => payload[stateProp])
    ),
    set,
  };
}
