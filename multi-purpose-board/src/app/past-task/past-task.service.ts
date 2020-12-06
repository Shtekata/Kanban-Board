import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ITask } from '../shared/interfaces';

@Injectable()
export class PastTaskService {

  constructor(private http: HttpClient) { }

  loadTaskList(): Observable<ITask[]> {
    return this.http.get<ITask[]>(`/tasks`);
  }

  loadTask(id: string): Observable<ITask> {
    return this.http.get<ITask>(`/tasks/${id}`);
  }

  saveTask(data: ITask): Observable<ITask> {
    return this.http.post<ITask>(`/tasks`, data);
  }
}
