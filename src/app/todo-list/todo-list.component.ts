import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ITask } from '../tasks';
import { TodoService } from '../todo-service.service';

@Component({
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {

  pageTitle = 'Current Todo List';
  checkStatus : boolean = false;
  errorMessage = '';
  sub!: Subscription;
  result: any;

  tasks: ITask[] = [];
  constructor(private todoService: TodoService) { }

  deleteTask(id: string): void{
    console.log("this is id in delete task" + id);
    this.todoService.deleteTask(id);
    //this.fetchData();
    window.location.reload();
  }

  doIfChecked(status: boolean, task: ITask): void{
    console.log('this is status' + status);
    this.checkStatus = !status;
    task.Completed = this.checkStatus;
    console.log('this is check status ' + this.checkStatus);
    this.todoService.tasks = this.tasks;
    console.log("this is tasks being assigned to todoservice tasks");
    console.log(this.todoService.tasks);
    this.todoService.updateTask(task).subscribe({
      next: data => {
        this.result = data;
        console.log("this is result AFTER UPDATE");
        console.log(this.result);
      },
      error: err => this.errorMessage = err
    })


  }


  ngOnInit(): void {
    this.sub = this.todoService.getTasks().subscribe({
      next: tasks => {
        this.tasks = tasks;
        console.log(this.tasks);
        console.log(tasks.length);
      },
      error: err => this.errorMessage = err
    });
  }

  
  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

}
