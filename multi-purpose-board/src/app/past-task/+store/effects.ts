import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, switchMap } from "rxjs/operators";
import { PastTaskService } from "../past-task.service";
import { pastTaskDetailLoadPastTask, pastTaskDetailLoadPastTaskError, pastTaskDetailSetPastTask, pastTaskListLoadPastTaskList, pastTaskListLoadPastTaskListError, pastTaskListSetPastTaskList } from "./actions";

@Injectable()
export class PastTaskListEffects {
    constructor(private actions$: Actions, private pastTaskService: PastTaskService) { }
    
    loadPastTaskList$ = createEffect(() => this.actions$.pipe(
        ofType(pastTaskListLoadPastTaskList),
        switchMap(() => this.pastTaskService.loadTaskList().pipe(catchError((err) => [new Error(err)]))),
        map(
            x => x instanceof Error ?
                pastTaskListLoadPastTaskListError({ error: x.message }) : pastTaskListSetPastTaskList({ pastTaskList: x })
        )
    ));

    loadPastTask$ = createEffect(() => this.actions$.pipe(
        ofType(pastTaskDetailLoadPastTask),
        switchMap((x) => this.pastTaskService.loadTask(x.id).pipe(catchError((err) => [new Error(err)]))),
        map(
            x => x instanceof Error ?
                pastTaskDetailLoadPastTaskError({ error: x.message }) : pastTaskDetailSetPastTask({ pastTask: x }))
    ));
}