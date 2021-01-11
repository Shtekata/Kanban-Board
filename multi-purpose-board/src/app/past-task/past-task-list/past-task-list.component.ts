import { AfterContentChecked, AfterContentInit, AfterViewChecked, AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { first, map, tap } from 'rxjs/operators';
import { IPastTaskModuleState, IPastTaskState } from '../+store';
import { pastTaskListClearPastTaskList, pastTaskListLoadPastTaskList } from '../+store/actions';
import { ITask, IUser } from '../../shared/interfaces';
import { PastTaskService } from '../past-task.service';

@Component({
  selector: 'app-past-task-list',
  templateUrl: './past-task-list.component.html',
  styleUrls: ['./past-task-list.component.css']
})
export class PastTaskListComponent implements OnInit, AfterViewChecked, OnDestroy {

  // taskList: ITask[] = [];
  pastTaskList$ = this.store.select(x => x.pastTask.pastTaskList.pastTaskList);
  isLoading$ = this.store.select(x => x.pastTask.pastTaskList.isLoading);

  constructor(private pastTaskService: PastTaskService, private store: Store<IPastTaskModuleState>) { }

  ngOnInit(): void {
    this.getOldTasks();
    // this.getOldTask2();
  }

  ngAfterViewChecked(): void {
  }

  // getOldTasks(): void {
  //   this.pastTaskService.loadTaskList().subscribe(x => {
  //     this.taskList = x.map(y => {
  //       return {
  //         id: y.payload.doc.id,
  //         ...(y.payload.doc.data() as object)
  //       } as ITask;
  //     });
  //   });
  // }

  // getOldTasks(): void {
  //   this.pastTaskService.loadTaskList().pipe(
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

  // getOldTasks(): void {
  // this.pastTaskService.loadTaskList().pipe(tap(x => this.taskList = x)).subscribe();
  // }
  
    getOldTasks(): void {
      // this.pastTaskService.loadTaskList().subscribe(x => this.taskList = x);
      this.store.dispatch(pastTaskListLoadPastTaskList());
  }

  // getOldTask2(): void {
  //   this.pastTaskService.loadTaskList2().subscribe(x => {
  //     this.taskList = x.map(y => {
  //       return {
  //         ...(y as object)
  //       } as ITask;
  //     });
  //   });
  // }

  ngOnDestroy(): void {
    this.store.dispatch(pastTaskListClearPastTaskList());
  }
}


