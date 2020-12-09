import { AfterContentChecked, AfterContentInit, AfterViewChecked, AfterViewInit, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { first, map, tap } from 'rxjs/operators';
import { ITask } from '../../shared/interfaces';
import { PastTaskService } from '../past-task.service';

@Component({
  selector: 'app-past-task-list',
  templateUrl: './past-task-list.component.html',
  styleUrls: ['./past-task-list.component.css']
})
export class PastTaskListComponent implements OnInit, AfterViewChecked {

  taskList: ITask[] = [];

  constructor(private pastTaskService: PastTaskService) { }

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

  getOldTasks(): void {
    this.pastTaskService.loadTaskList().pipe(
      map(x => {
        return x.map(y => {
          return <ITask>{
            id: y.payload.doc.id,
            ...(y.payload.doc.data() as object)
          };
        });
      }),
      first(),
      tap(x => this.taskList = x)).subscribe();
  }

  getOldTask2(): void {
    this.pastTaskService.loadTaskList2().subscribe(x => {
      this.taskList = x.map(y => {
        return {
          ...(y as object)
        } as ITask;
      });
    });
  }
}


