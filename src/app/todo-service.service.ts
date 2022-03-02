import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError, map, tap } from 'rxjs/operators';
import { ITask } from "./tasks";

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  // If using Stackblitz, replace the url with this line
  // because Stackblitz can't find the api folder.
  // private TaskUrl = 'assets/Tasks/Tasks.json';
 // private TaskUrl = 'api/Tasks/Tasks.json';
private taskUrl = 'https://mbhatti-todo-list-proj.herokuapp.com/tasks'
private mainUrl = 'https://mbhatti-todo-list-proj.herokuapp.com/'
taskId: any;
status: any; 
tasks: ITask[] = [];



  constructor(private http: HttpClient) { }

  getTasks(): Observable<ITask[]> {
    return this.http.get<ITask[]>(this.taskUrl)
      .pipe(
        tap(data => console.log('All: ', JSON.stringify(data))),
        catchError(this.handleError),      
      );

  }

  deleteTask(id: string): void{
    // console.log("this is delete url " + "http://localhost:8080/"+id);
    // this.http.delete("http://localhost:8080/"+ id)
    //     .subscribe(() => this.status = 'Delete successful');

    console.log("this is delete url " + this.mainUrl +id);
    this.http.delete(this.mainUrl+ id)
        .subscribe(() => this.status = 'Delete successful');

  }

  createTask(task: ITask): Observable<any> {
    console.log("inside of create task");
    console.log(task);
    return this.http.post<ITask[]>(this.mainUrl, task);
  }

  updateTask(task: ITask ): Observable<any> {
    console.log("inside of update task in task service");
    console.log(task);
    return this.http.put<ITask[]>(this.mainUrl + task.id, task);
  }

  // Get one Task
  // Since we are working with a json file, we can only retrieve all Tasks
  // So retrieve all Tasks and then find the one we want using 'map'
  getTask(id: String): Observable<ITask | undefined> {
    console.log("this is id" + id);
    return this.getTasks()
      .pipe(
        map((Tasks: ITask[]) => Tasks.find(c => c.id === id))
      );
  }

  private handleError(err: HttpErrorResponse): Observable<never> {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }

}