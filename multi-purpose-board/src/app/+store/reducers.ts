import { createReducer, on } from "@ngrx/store";
import { IUser } from "../shared/interfaces";
import { authenticate, login, logout, register, update } from "./actions";

export interface IAuthState {
    currentUser: IUser | null | undefined | any
};

export const initialState: IAuthState = {
    currentUser: undefined
};

const setCurrentUser = (
    state: IAuthState,
    action: ReturnType<typeof login> | ReturnType<typeof register> | ReturnType<typeof authenticate> | ReturnType<typeof update>
) => { return { ...state, currentUser: action.user }; };

export const authReducer = createReducer<IAuthState>(
    initialState,
    on(login, setCurrentUser),
    on(register, setCurrentUser),
    on(authenticate, setCurrentUser),
    on(logout, (state) => { return { ...state, currentUser: null }; }),
    on(update, setCurrentUser)
);