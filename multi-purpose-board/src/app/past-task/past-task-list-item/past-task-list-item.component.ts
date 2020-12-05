import { Component, Input, OnInit } from '@angular/core';
import { ITask } from '../../shared/interfaces';

@Component({
  selector: 'app-past-task-list-item',
  templateUrl: './past-task-list-item.component.html',
  styleUrls: ['./past-task-list-item.component.css']
})
export class PastTaskListItemComponent implements OnInit {

  @Input() task: ITask;

  constructor() { }

  ngOnInit(): void {
  }

}
