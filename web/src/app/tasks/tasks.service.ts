import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { HttpHeaders } from "@angular/common/http";

import { Observable } from "rxjs";
import { catchError } from "rxjs/operators";

import { Task } from "./task";
import { HttpErrorHandler, HandleError } from "../http-error-handler.service";

@Injectable()
export class TasksService {
  private handleError: HandleError;

  constructor(private http: HttpClient, httpErrorHandler: HttpErrorHandler) {
    this.handleError = httpErrorHandler.createHandleError("TasksService");
  }

  getTasks(): Observable<Task[]> {
    return this.http
      .get<Task[]>("http://localhost:80/api/tasks")
      .pipe(catchError(this.handleError("getTasks", [])));
  }

  addTask(task: Task): Observable<Task> {
    return this.http
      .post<Task>("http://localhost:80/api/task", task)
      .pipe(catchError(this.handleError("addTask", task)));
  }

  addTask2(image: any) {
    return this.http
      .post<Task>("http://localhost:80/api/base64", image)
      .pipe(catchError(this.handleError("addTask", image)));
  }

  deleteTask(id: number): Observable<{}> {
    const url = `http://localhost:80/api/task/${id}`;
    return this.http
      .delete(url)
      .pipe(catchError(this.handleError("deleteTask")));
  }

  updateTask(task: Task): Observable<Task> {
    return this.http
      .put<Task>(`http://localhost:80/api/task/${task._id}`, task)
      .pipe(catchError(this.handleError("updateTask", task)));
  }
}
