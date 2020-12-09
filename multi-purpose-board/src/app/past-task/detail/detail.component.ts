import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { first, map, tap } from 'rxjs/operators';
import { ITask } from 'src/app/shared/interfaces';
import { PastTaskService } from '../past-task.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {

  taskList: ITask[] = [];
  get task(): ITask { return this.taskList[0]; } 

  constructor(private pastTaskService: PastTaskService, activatedRoot: ActivatedRoute) {
    const id = activatedRoot.snapshot.params.id;
    this.loadTask(id);
  }

  ngOnInit(): void {
  }

  loadTask(id: string): void {
    this.pastTaskService.loadTask(id).pipe(
      map(x => {
        return x.map(y => {
          return <ITask>{
            id: y.payload.doc.id,
            ...(y.payload.doc.data() as object)
          };
        });
      }),
      first(),
      tap(x => this.taskList = x)).subscribe();
  }
}
