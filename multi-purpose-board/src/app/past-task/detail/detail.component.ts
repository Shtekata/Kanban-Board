import { Component, DoCheck, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ITask } from 'src/app/shared/interfaces';
import { PastTaskService } from '../past-task.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {

  task: ITask;

  constructor(pastTaskService: PastTaskService, activatedRoot: ActivatedRoute) {
    const id = activatedRoot.snapshot.params.id;
    pastTaskService.loadTask(id).subscribe(x => this.task = x);
  }

  ngOnInit(): void {
  }
}
