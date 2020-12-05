import { Component, OnInit } from '@angular/core';
import { ITask } from '../../shared/interfaces';
import { PastTaskService } from '../past-task.service';


@Component({
  selector: 'app-past-task-list',
  templateUrl: './past-task-list.component.html',
  styleUrls: ['./past-task-list.component.css']
})
export class PastTaskListComponent implements OnInit {

  taskList: ITask[];

  constructor(private taskService: PastTaskService) { }

  ngOnInit(): void {
    this.taskService.loadTaskList().subscribe(x => { this.taskList = x; } );
  }
}
