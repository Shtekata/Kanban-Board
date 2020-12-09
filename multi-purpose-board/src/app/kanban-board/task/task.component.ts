import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ITask } from '../../shared/interfaces/task';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {

  @Input() task!: ITask;
  @Output() edit = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }

  editTask(task: ITask, e: Event): any {
    e.preventDefault();
    return this.edit.emit(task);
  }

}
