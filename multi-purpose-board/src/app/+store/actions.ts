import { createAction, props } from '@ngrx/store';
import { IUser } from '../shared/interfaces';

const authNamespace = '[AUTH]';

export const login = createAction(`${authNamespace} Login`, props<{ user: IUser | any }>());
export const register = createAction(`${authNamespace} Register`, props<{ user: IUser | any }>());
export const logout = createAction(`${authNamespace} Logout`);
export const authenticate = createAction(`${authNamespace} Auhtenticate`, props<{ user: IUser | null | undefined | any }>());
export const update = createAction(`${authNamespace} Update`, props<{ user: IUser | any }>());
export const updateUserPhoneNumberInfo = createAction(`${authNamespace} Update User Phone Number Info`, props<{ phoneNumber: string }>());
export const updateUserDisplayNameInfo = createAction(`${authNamespace} Update User Display Name`, props<{ displayName: string }>());
export const updateUserAlternateEmailInfo = createAction(`${authNamespace} Update User Alternate Email Info`, props<{ alternateEmail: string }>());
export const updateUserAddressInfo = createAction(`${authNamespace} Update User Address Info`, props<{ address: string }>());
export const updateUserPhotoUrlInfo = createAction(`${authNamespace} Update User Photo Url Info`, props<{ photoUrl: string }>());