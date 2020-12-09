import { AfterContentChecked, AfterContentInit, AfterViewChecked, AfterViewInit, Component, OnInit } from '@angular/core';
import { ITask } from '../../shared/interfaces';
import { PastTaskService } from '../past-task.service';

@Component({
  selector: 'app-past-task-list',
  templateUrl: './past-task-list.component.html',
  styleUrls: ['./past-task-list.component.css']
})
export class PastTaskListComponent implements OnInit, AfterViewChecked {

  taskList: ITask[] = [];

  constructor(private taskService: PastTaskService) { }

  ngOnInit(): void {
    this.getOldTasks();
  }

  ngAfterViewChecked(): void {
  }

  getOldTasks(): void {
    this.taskService.loadTaskList().subscribe((x) => {
      this.taskList = x.map((y) => {
        return {
          id: y.payload.doc.id,
          ...(y.payload.doc.data() as object)
        } as ITask;
      });
    });
  }
}


