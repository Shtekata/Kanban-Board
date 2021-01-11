import { CdkDragDrop, transferArrayItem } from '@angular/cdk/drag-drop';
import { AfterViewInit, Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { ITask } from '../../shared/interfaces/task';
import { MatDialog } from '@angular/material/dialog';
import { TaskDialogComponent, TaskDialogResult } from './../task-dialog/task-dialog.component';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthService } from 'src/app/core/auth.service';
import { Store } from '@ngrx/store';
import { IRootState } from 'src/app/+store';

const getObservable = (collection: AngularFirestoreCollection<ITask>) => {
  const subject = new BehaviorSubject([]);
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
export class KanbanBoardComponent implements OnInit, AfterViewInit {
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.windowSize = window.innerWidth;
    this.resizeParagraphs(this.windowSize);
  }

  @ViewChild('load') load: any;
 
  currentUser$ = this.authService.currentUser$;
  get currentUser(): any { return this.authService.currentUser; }
  
  windowSize: any;
  size = 10;
  photoUrl$: Observable<string | null> = this.authService.photoUrl$;

  // todo: Observable<any[]> = this.db.collection('todo').valueChanges({ idField: 'id' });
  // inProgress: Observable<any[]> = this.db.collection('inProgress').valueChanges({ idField: 'id' });
  // done: Observable<any[]> = this.db.collection('done').valueChanges({ idField: 'id' });
  todo: Observable<any[]> = getObservable(this.db.collection('todo'));
  inProgress: Observable<any[]> = getObservable(this.db.collection('inProgress'));
  done: Observable<any[]> = getObservable(this.db.collection('done'));
  old: Observable<any[]> = getObservable(this.db.collection('old'));

  constructor(
    private dialog: MatDialog,
    private db: AngularFirestore,
    private authService: AuthService,
    private store: Store<IRootState>
  ) { }

  ngOnInit(): void{
    this.windowSize = window.innerWidth;
    this.resizeParagraphs(this.windowSize);
  }
  
  ngAfterViewInit(): void {
    if (this.load) { this.authService.loadProfile(); };
  }

  drop(event: CdkDragDrop<any>): void{
  if (event.previousContainer === event.container||!this.currentUser) { return; }
  const item = event.previousContainer.data[event.previousIndex];
  this.db.firestore.runTransaction(() => {
    return Promise.all([
      this.db.collection(event.previousContainer.id).doc(item.id).delete(),
      this.db.collection(event.container.id).add(item)
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
    if (!this.currentUser) { return;}
    const dialogRef = this.dialog.open(TaskDialogComponent, {
      width: '270px',
      data: {
        task,
        enableDelete: true
      }
    });
    dialogRef.afterClosed().subscribe((result: TaskDialogResult) => {
      if (result.delete && list === 'done') {
        task.executor = this.currentUser.email;
        task.executed_at = new Date().toDateString();
        this.db.collection('old').add(task);
        this.db.collection('done').doc(task.id).delete();
      }
      if (result.delete) {
        this.db.collection(list).doc(task.id).delete();
      } else {
        this.db.collection(list).doc(task.id).update(task);
      }
    });
  }

  newTask(): void {
    if (!this.currentUser) { return;}
    const dialogRef = this.dialog.open(TaskDialogComponent, {
      width: '270px',
      data: {
        task: {}
      }
    });
    dialogRef
      .afterClosed()
      .subscribe((result: TaskDialogResult) => {
        result.task.creator = this.currentUser.email;
        result.task.created_at = new Date().toDateString();
        this.db.collection('todo').add(result.task);
      });
  }

  logoutHandler(): void {
    this.authService.logout();
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
}
