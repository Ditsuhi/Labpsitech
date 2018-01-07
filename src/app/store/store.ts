import { UserDetails } from '../models/user-details';

export interface IAppState {
  users: UserDetails[];
  account: string
}

export const INITIAL_STATE: IAppState = {

  users: [],
  account: ''
};

export function rootReducer(state, action) {
  return state;
}
