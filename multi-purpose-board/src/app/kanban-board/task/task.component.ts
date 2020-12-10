import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { ITask } from '../../shared/interfaces/task';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit, OnChanges {

  @Input() task: ITask;
  @Input() size: number;
  @Output() edit = new EventEmitter();

  resizeStr: string[] = [];
  sizeTitle: number;

  constructor() {}

  ngOnInit(): void {
    if (this.size < 15) {
      this.sizeTitle = this.size - 4;
    } else if (this.size < 25) {
      this.sizeTitle = this.size - 6;
    } else {
      this.sizeTitle = this.size - 10;
    }
    this.task.resizedTitle = this.resize(this.sizeTitle, this.task.title);
    this.task.resizeDesc = this.resize(this.size, this.task.description);
  }

  ngOnChanges(): void {
    if (this.size < 15) {
      this.sizeTitle = this.size -4;
    } else if (this.size < 25) {
      this.sizeTitle = this.size - 6;
    } else {
      this.sizeTitle = this.size - 10;
    }
    this.task.resizedTitle = this.resize(this.sizeTitle, this.task.title);
    this.task.resizeDesc = this.resize(this.size, this.task.description);
  }

  editTask(task: ITask, e: Event): any {
    e.preventDefault();
    return this.edit.emit(task);
  }

  resize(size: number, stringToRes: string): string[] {
    this.resizeStr = [];
    for (let i = 0; i < Math.ceil(stringToRes.length / size); i++) {
      let start = i * size;
      let end = start + size;
      const element = stringToRes.slice(start, end);
      this.resizeStr.push(element);
    }
    return this.resizeStr;
  }

}
