import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ITask } from '../shared/interfaces';
import { environment } from '../../environments/environment';

const apiUrl = environment.apiUrl;

@Injectable()
export class PastTaskService {

  constructor(private http: HttpClient) { }

  loadTaskList(): Observable<ITask[]> {
    return this.http.get<ITask[]>(`${apiUrl}/tasks`);
  }

  loadTask(id: string): Observable<ITask> {
    return this.http.get<ITask>(`${apiUrl}/tasks/${id}`);
  }

  saveTask(data: ITask): Observable<ITask> {
    return this.http.post<ITask>(`${apiUrl}/tasks`, data, { withCredentials: true });
  }
}
