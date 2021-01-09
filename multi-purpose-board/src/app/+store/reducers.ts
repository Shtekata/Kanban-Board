import { createReducer, on } from "@ngrx/store";
import { IUser } from "../shared/interfaces";
import { authenticate, login, logout, register, update, updateUserAddressInfo, updateUserAlternateEmailInfo, updateUserDisplayNameInfo, updateUserPhoneNumberInfo, updateUserPhotoUrlInfo } from "./actions";

export interface IAuthState {
    currentUser: IUser | null | undefined | any;
    phoneNumber: string | null;
    displayName: string | null;
    alternateEmail: string | null;
    address: string | null;
    photoUrl: string | null;
};

export const initialState: IAuthState = {
    currentUser: undefined,
    phoneNumber: null,
    displayName: null,
    alternateEmail: null,
    address: null,
    photoUrl: null
};

const setCurrentUser = (
    state: IAuthState,
    action: ReturnType<typeof login> | ReturnType<typeof register> | ReturnType<typeof authenticate> | ReturnType<typeof update>
) => { return { ...state, currentUser: action.user }; };

const setLogoutState = (state: any) => {
    return {
        ...state,
        currentUser: null,
        phoneNumber: null,
        displayName: null,
        alternateEmail: null,
        address: null,
        photoUrl: null
    };
};

export const authReducer = createReducer<IAuthState>(
    initialState,
    on(login, setCurrentUser),
    on(register, setCurrentUser),
    on(authenticate, setCurrentUser),
    on(logout, setLogoutState),
    on(update, setCurrentUser),
    on(updateUserPhoneNumberInfo, (state, action) => { return { ...state, phoneNumber: action.phoneNumber } }),
    on(updateUserDisplayNameInfo, (state, action) => { return { ...state, displayName: action.displayName } }),
    on(updateUserAlternateEmailInfo, (state, action) => { return { ...state, alternateEmail: action.alternateEmail } }),
    on(updateUserAddressInfo, (state, action) => { return { ...state, address: action.address } }),
    on(updateUserPhotoUrlInfo, (state, action) => { return { ...state, photoUrl: action.photoUrl } })
);