import { CdkDragDrop, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { Task } from './../task/task';
import { MatDialog } from '@angular/material/dialog';
import { TaskDialogComponent, TaskDialogResult } from './../task-dialog/task-dialog.component';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { BehaviorSubject, Observable } from 'rxjs';

const getObservable = (collection: AngularFirestoreCollection<Task>) => {
  const subject = new BehaviorSubject([]);
  // collection.valueChanges({ idField: 'id' }).subscribe((val: Task[]) => {
  collection.valueChanges({ idField: 'id' }).subscribe((val: any) => {
    subject.next(val);
  });
  return subject;
};


@Component({
  selector: 'app-kanban-board',
  templateUrl: './kanban-board.component.html',
  styleUrls: ['./kanban-board.component.css']
})
export class KanbanBoardComponent {

  isLogged = false;
 // todo: Task[] = [
  //   { title: 'Buy milk', description: 'Go to the store and buy milk' },
  //   { title: 'Create Kanban board', description: 'Develop a Kanban app' }
  // ];
  // inProgress: Task[] = [];
  // done: Task[] = [];

  // todo: Observable<any[]> = this.store.collection('todo').valueChanges({ idField: 'id' });
  // inProgress: Observable<any[]> = this.store.collection('inProgress').valueChanges({ idField: 'id' });
  // done: Observable<any[]> = this.store.collection('done').valueChanges({ idField: 'id' });
  todo: Observable<any[]> = getObservable(this.store.collection('todo'));
  inProgress: Observable<any[]> = getObservable(this.store.collection('inProgress'));
  done: Observable<any[]> =  getObservable(this.store.collection('done'));

  constructor(private dialog: MatDialog, private store: AngularFirestore){}

  // drop(event: CdkDragDrop<Task[]>): void{
    drop(event: CdkDragDrop<any>): void{
    if (event.previousContainer === event.container) { return; }
    const item = event.previousContainer.data[event.previousIndex];
    this.store.firestore.runTransaction(() => {
      return Promise.all([
        this.store.collection(event.previousContainer.id).doc(item.id).delete(),
        this.store.collection(event.container.id).add(item)
      ]);
    });
    transferArrayItem(
      event.previousContainer.data,
      event.container.data,
      event.previousIndex,
      event.currentIndex
    );
  }

  edit(list: 'done'|'todo'|'inProgress', task: Task): void{
    const dialogRef = this.dialog.open(TaskDialogComponent, {
      width: '270px',
      data: {
        task,
        enableDelete: true
      }
    });
    dialogRef.afterClosed().subscribe((result: TaskDialogResult) => {
      // const dataList = this[list];
      // const taskIndex = dataList.indexOf(task);
      // if (result.delete) {
      //   dataList.splice(taskIndex, 1);
      // } else {
      //   dataList[taskIndex] = task;
      // }
      if (result.delete) {
        this.store.collection(list).doc(task.id).delete();
      } else {
        this.store.collection(list).doc(task.id).update(task);
      }
    });
  }

  newTask(): void {
    const dialogRef = this.dialog.open(TaskDialogComponent, {
      width: '270px',
      data: {
        task: {}
      }
    });
    dialogRef
      .afterClosed()
      // .subscribe((result: TaskDialogResult) => this.todo.push(result.task));
      .subscribe((result: TaskDialogResult) => this.store.collection('todo').add(result.task));
  }

  logoutHandler(): void {}

}
