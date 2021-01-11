import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { first, map, tap } from 'rxjs/operators';
import { ITask } from 'src/app/shared/interfaces';
import { IPastTaskModuleState } from '../+store';
import { pastTaskDetailClearPastTask, pastTaskDetailLoadPastTask } from '../+store/actions';
import { PastTaskService } from '../past-task.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit, OnDestroy {

  // taskList: ITask[] = [];
  // get task(): ITask { return this.taskList[0]; } 

  // task: ITask;
  task$ = this.store.select(x => x.pastTask.detail.pastTask);
  isLoading$ = this.store.select(x => x.pastTask.detail.isLoading);

  constructor(private pastTaskService: PastTaskService, activatedRoot: ActivatedRoute, private store: Store<IPastTaskModuleState>) {
    const id = activatedRoot.snapshot.params.id;
    this.loadTask(id);
  }

  ngOnInit(): void {
  }

  // loadTask(id: string): void {
  //   this.pastTaskService.loadTask(id).pipe(
  //     map(x => {
  //       return x.map(y => {
  //         return <ITask>{
  //           id: y.payload.doc.id,
  //           ...(y.payload.doc.data() as object)
  //         };
  //       });
  //     }),
  //     first(),
  //     tap(x => this.taskList = x)).subscribe();
  // }

   loadTask(id: string): void {
    // this.pastTaskService.loadTask(id).pipe(tap(x => this.taskList = x)).subscribe();
    // this.pastTaskService.loadTask(id).pipe(tap(x => this.task = x)).subscribe();
     this.store.dispatch(pastTaskDetailLoadPastTask({ id: id }));
    
   }
  
  ngOnDestroy(): void {
    this.store.dispatch(pastTaskDetailClearPastTask());
  }
}
