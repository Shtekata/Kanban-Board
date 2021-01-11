import { DocumentChangeAction } from "@angular/fire/firestore";
import { createReducer, on } from "@ngrx/store";
import { ITask, IUser } from "src/app/shared/interfaces";
import { pastTaskDetailClearPastTask, pastTaskDetailLoadPastTask, pastTaskDetailLoadPastTaskError, pastTaskDetailSetIsLoading, pastTaskDetailSetPastTask, pastTaskListClearPastTaskList, pastTaskListLoadPastTaskList, pastTaskListLoadPastTaskListError, pastTaskListSetIsLoading, pastTaskListSetPastTaskList } from "./actions";

export interface IPastTaskListState {
    pastTaskList: any[] | null;
    isLoading: boolean;
    errorMessage: string;
}
export const initialPastTaskListState: IPastTaskListState = {
    pastTaskList: null,
    isLoading: false,
    errorMessage: ''
};
export const pastTaskListReducer = createReducer<IPastTaskListState>(
    initialPastTaskListState,
    on(pastTaskListSetPastTaskList, (state, action) => { return { ...state, pastTaskList: action.pastTaskList, isLoading: false } }),
    on(pastTaskListSetIsLoading, (state, action) => { return { ...state, isLoading: action.isLoading } }),
    on(pastTaskListClearPastTaskList, () => initialPastTaskListState),
    on(pastTaskListLoadPastTaskList, (state) => { return { ...state, isLoading: true } }),
    on(pastTaskListLoadPastTaskListError, (state, action) => { return { ...state, errorMessage: action.error } })
);

export interface IPastTaskDetailState {
    pastTask: ITask | null;
    isLoading: boolean;
    errorMessage: string;
}
export const initialPastTaskDetailState: IPastTaskDetailState = {
    pastTask: null,
    isLoading: false,
    errorMessage: ''
};
export const pastTaskDetailReducer = createReducer<IPastTaskDetailState>(
    initialPastTaskDetailState,
    on(pastTaskDetailSetPastTask, (state, action) => { return { ...state, pastTask: action.pastTask, isLoading: false } }),
    on(pastTaskDetailSetIsLoading, (state, action) => { return { ...state, isLoading: action.isLoading } }),
    on(pastTaskDetailClearPastTask, () => initialPastTaskDetailState),
    on(pastTaskDetailLoadPastTask, (state) => { return { ...state, isLoading: true } }),
    on(pastTaskDetailLoadPastTaskError, (state, action) => { return { ...state, errorMessage: action.error } })
);