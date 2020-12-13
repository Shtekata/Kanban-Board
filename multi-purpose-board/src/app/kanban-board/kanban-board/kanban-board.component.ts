import { CdkDragDrop, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, HostListener, OnInit } from '@angular/core';
import { ITask } from '../../shared/interfaces/task';
import { MatDialog } from '@angular/material/dialog';
import { TaskDialogComponent, TaskDialogResult } from './../task-dialog/task-dialog.component';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthService } from 'src/app/core/auth.service';
import { map, tap } from 'rxjs/operators';

const getObservable = (collection: AngularFirestoreCollection<ITask>) => {
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
export class KanbanBoardComponent implements OnInit {
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.windowSize = window.innerWidth;
    this.resizeParagraphs(this.windowSize);
  }
  // get storageUser(): any { return localStorage.getItem('user'); }
  // get user(): any { return this.storageUser !== null ? JSON.parse(this.storageUser) : null; }
  get user(): any { return this.authService.user; }
  
  windowSize: any;
  size = 10;
  photoURL: string | null;

  // todo: Task[] = [
  //   { title: 'Buy milk', description: 'Go to the store and buy milk' },
  //   { title: 'Create Kanban board', description: 'Develop a Kanban app' }
  // ];
  // inProgress: ITask[] = [];
  // done: Task[] = [];

  // todo: Observable<any[]> = this.store.collection('todo').valueChanges({ idField: 'id' });
  // inProgress: Observable<any[]> = this.store.collection('inProgress').valueChanges({ idField: 'id' });
  // done: Observable<any[]> = this.store.collection('done').valueChanges({ idField: 'id' });
  todo: Observable<any[]> = getObservable(this.store.collection('todo'));
  inProgress: Observable<any[]> = getObservable(this.store.collection('inProgress'));
  done: Observable<any[]> = getObservable(this.store.collection('done'));
  old: Observable<any[]> = getObservable(this.store.collection('old'));

  constructor(
    private dialog: MatDialog,
    private store: AngularFirestore,
    private authService: AuthService,
  ) { }

  ngOnInit(): void{
    this.windowSize = window.innerWidth;
    this.resizeParagraphs(this.windowSize);
    this.loadProfile();
}

  // drop(event: CdkDragDrop<Task[]>): void{
    drop(event: CdkDragDrop<any>): void{
    if (event.previousContainer === event.container||!this.user) { return; }
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

  edit(list: 'done' | 'todo' | 'inProgress', task: ITask): void{
    if (!this.user) { return;}
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
      if (result.delete && list === 'done') {
        task.executor = this.user.email;
        task.executed_at = new Date().toDateString();
        this.store.collection('old').add(task);
        this.store.collection('done').doc(task.id).delete();
      }
      if (result.delete) {
        this.store.collection(list).doc(task.id).delete();
      } else {
        this.store.collection(list).doc(task.id).update(task);
      }
    });
  }

  newTask(): void {
    if (!this.user) { return;}
    const dialogRef = this.dialog.open(TaskDialogComponent, {
      width: '270px',
      data: {
        task: {}
      }
    });
    dialogRef
      .afterClosed()
      // .subscribe((result: TaskDialogResult) => this.todo.push(result.task));
      .subscribe((result: TaskDialogResult) => {
        result.task.creator = this.user.email;
        result.task.created_at = new Date().toDateString();
        this.store.collection('todo').add(result.task);
      });
  }

  logoutHandler(): void {
    this.authService.logout();
    this.photoURL = null;
  }

  resizeParagraphs(size: number) {
    if (size < 499.98) {
      this.size = 10;
    } else if (size < 575.98) {
      this.size = 15;
    } else if (size < 767.98) {
      this.size = 20;
    } else if (size < 991.98) {
      this.size = 25;
    } else if (size < 1199.98) {
      this.size = 30;
    } else if (size < 1399.98) {
      this.size = 35;
    } else {
      this.size = 40;
    }
  }

  loadProfile(): void {
    this.authService.loadProfile().pipe(
      map((x: any) => {
          return <any>{
            id: x.payload.id,
            ...(x.payload.data() as object)
          };
      }),
      tap((x: any) => {
        this.photoURL = x.photoURL; 
      })).subscribe();
  }
}
