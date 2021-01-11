import { DocumentChangeAction } from "@angular/fire/firestore";
import { createAction, props } from "@ngrx/store";
import { ITask } from "src/app/shared/interfaces";

const pastTaskListNameSpace = '[PAST TASK LIST]';
export const pastTaskListSetPastTaskList = createAction(`${pastTaskListNameSpace} Set Past Task List`, props<{ pastTaskList: any[] }>());
export const pastTaskListSetIsLoading = createAction(`${pastTaskListNameSpace} Set Is Loading`, props<{ isLoading: boolean }>());
export const pastTaskListClearPastTaskList = createAction(`${pastTaskListNameSpace} Clear`);
export const pastTaskListLoadPastTaskList = createAction(`${pastTaskListNameSpace} Load Past Task List`);
export const pastTaskListLoadPastTaskListError = createAction(`${pastTaskListNameSpace} Load Past Task List Error`, props<{ error: string }>());

const pastTaskDetailNameSpace = '[PAST TASK DETAIL]';
export const pastTaskDetailSetPastTask = createAction(`${pastTaskDetailNameSpace} Set Past Task Detail`, props<{ pastTask: ITask }>());
export const pastTaskDetailSetIsLoading = createAction(`${pastTaskDetailNameSpace} Set Is Loading`, props<{ isLoading: boolean }>());
export const pastTaskDetailClearPastTask = createAction(`${pastTaskDetailNameSpace} Clear`);
export const pastTaskDetailLoadPastTask = createAction(`${pastTaskDetailNameSpace} Load Past Task Detail`, props<{ id: string }>());
export const pastTaskDetailLoadPastTaskError = createAction(`${pastTaskDetailNameSpace} Load Past Task Detail Error`, props<{ error: string }>());