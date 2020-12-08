import { Component, OnInit } from '@angular/core';
import { tap } from 'rxjs/operators';
import { ITask } from '../../shared/interfaces';
import { PastTaskService } from '../past-task.service';


@Component({
  selector: 'app-past-task-list',
  templateUrl: './past-task-list.component.html',
  styleUrls: ['./past-task-list.component.css']
})
export class PastTaskListComponent implements OnInit {

  taskList: ITask[];
  pastTaskList: any = [];
  constructor(private taskService: PastTaskService) { }

  ngOnInit(): void {
    this.taskService.loadTaskList()
      // .subscribe((x: any) => x
      //   .forEach((y: any) => {
      //     const data = { id: y.id, task: y.data() };
      //     this.pastTaskList.push(data);
      //   }));
    console.log(this.pastTaskList);
  }
}
