import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ITask } from '../../shared/interfaces/task';

@Component({
  selector: 'app-task-dialog',
  templateUrl: './task-dialog.component.html',
  styleUrls: ['./task-dialog.component.css']
})
export class TaskDialogComponent implements OnInit {

  private backupTask: Partial<ITask> = { ... this.data.task };

  constructor(
    public dialogRef: MatDialogRef<TaskDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: TaskDialogData) { }

  ngOnInit(): void {
  }

  cancel(): void{
    (this.data.task.title as any) = this.backupTask.title;
    (this.data.task.description as any) = this.backupTask.description;
    (this.data.task.solution as any) = this.backupTask.solution;
    this.dialogRef.close(this.data);
  }

}

export interface TaskDialogData{
  task: ITask;
  enableDelete: boolean;
}

export interface TaskDialogResult{
  task: ITask;
  delete?: boolean;
}
