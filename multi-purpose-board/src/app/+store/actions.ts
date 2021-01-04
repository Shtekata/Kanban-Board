import { createAction, props } from '@ngrx/store';
import { IUser } from '../shared/interfaces';

const authNamespace = '[AUTH]';

export const login = createAction(`${authNamespace} Login`, props<{ user: IUser }>());
export const register = createAction(`${authNamespace} Register`, props<{ user: IUser }>());
export const logout = createAction(`${authNamespace} Logout`);
export const authenticate = createAction(`${authNamespace} Auhtenticate`, props<{ user: IUser | null | undefined }>());
export const update = createAction(`${authNamespace} Update`, props<{ user: IUser }>());