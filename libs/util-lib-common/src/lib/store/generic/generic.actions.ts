import { createAction, props } from '@ngrx/store';

export function createSetAction(stateProp: string) {
  return createAction(
    `[${stateProp}] Set`,
    props<{ [stateProp: string]: any }>()
  );
}
