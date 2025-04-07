import { createSelector } from '@ngrx/store';

export function createGenericSelector(stateProp: string) {
  const selectSlice = (state: { [key: string]: any }) => state[stateProp];

  return createSelector(selectSlice, (slice) => slice);
}
