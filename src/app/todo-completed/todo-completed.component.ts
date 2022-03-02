import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ITask } from '../tasks';
import { TodoService } from '../todo-service.service';


@Component({
  selector: 'app-todo-completed',
  templateUrl: './todo-completed.component.html',
  styleUrls: ['./todo-completed.component.css']
})
export class TodoCompletedComponent implements OnInit {
  completedTasks: ITask[] = [];
  tasks : ITask[] = [];
  pageTitle = "Completed Tasks";
  sub!: Subscription;
  errorMessage = '';


  constructor(private todoService: TodoService) { }



  ngOnInit(): void {
    this.sub = this.todoService.getTasks().subscribe({
      next: tasks => {
        this.tasks = tasks;
        this.todoService.tasks = this.tasks;
        console.log("this is list of tasks inside init of completed");
        console.log(this.tasks);
        console.log(tasks.length);
        this.completedTasks = this.performFilter();
        console.log("length of completed tasks"  + this.completedTasks.length);
      },
      error: err => this.errorMessage = err
    })
    
  }
  performFilter(): ITask[] {

    return this.todoService.tasks.filter((task: ITask) =>
      this.isChecked(task))
  }

  isChecked(task: ITask): Boolean{
    console.log("inside is checked");
    if(task.Completed){
      console.log("inside true");
      return true;
    }
    return false;
  }



  // deleteTask(id: string): void{
  //   console.log("this is id in delete task" + id);
  //   this.todoService.deleteTask(id);
  //   //this.fetchData();
  //   window.location.reload();
  // }



}
