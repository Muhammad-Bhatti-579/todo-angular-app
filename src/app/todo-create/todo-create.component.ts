import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ITask } from '../tasks';
import { TodoService } from '../todo-service.service';

@Component({
  selector: 'app-todo-create',
  templateUrl: './todo-create.component.html',
  styleUrls: ['./todo-create.component.css']
})
export class TodoCreateComponent implements OnInit {
  pageTitle = 'Task Creation';
  errorMessage = '';
  task: ITask = {id: "", Title: " ", Description: " ", Priority: " ", Completed: false};
  result: any;
  showMsg: boolean = false;



  constructor(
    private router: Router,
    private todoService: TodoService) { }

  ngOnInit(): void {
  }

  createTask(): void {
    this.todoService.createTask(this.task).subscribe({
      next: data => {
        this.result = data;
        console.log("this is result AFTER CREATE");
        console.log(this.result);
        this.showMsg = true;
      },
      error: err => this.errorMessage = err
    })
  }

  
  onBack(): void {
    this.router.navigate(['/tasks']);
  }


}
