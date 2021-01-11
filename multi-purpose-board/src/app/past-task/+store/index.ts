import { ActionReducerMap } from "@ngrx/store";
import { IRootState } from "src/app/+store";
import { IPastTaskDetailState, IPastTaskListState, pastTaskDetailReducer, pastTaskListReducer } from "./reducers";

export interface IPastTaskState {
    readonly pastTaskList: IPastTaskListState;
    readonly detail: IPastTaskDetailState;
}

export interface IPastTaskModuleState extends IRootState {
    pastTask: IPastTaskState;
}

export const reducers: ActionReducerMap<IPastTaskState> = {
    pastTaskList: pastTaskListReducer,
    detail: pastTaskDetailReducer
};