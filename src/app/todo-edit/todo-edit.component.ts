import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ITask } from '../tasks';
import { TodoService } from '../todo-service.service';

@Component({
  selector: 'app-todo-edit',
  templateUrl: './todo-edit.component.html',
  styleUrls: ['./todo-edit.component.css']
})
export class TodoEditComponent implements OnInit {

  pageTitle = 'Edit Task';
  errorMessage = '';
  result: any;
  showMsg: boolean = false;
  task: ITask | any; 
  // task: ITask | any = {id: "", Title: "", Description: " ", Priority: " ", Completed: false};
  id: string | null = '';


  constructor(private route: ActivatedRoute, private router: Router, private todoService: TodoService) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.getTask(id);
    }
  }

  getTask(id: String): void {
    this.todoService.getTask(id).subscribe({
      next: task => this.task = task,
      error: err => this.errorMessage = err
    });
  }

  updateTask(): void {

    console.log("this is what the data is")
    console.log(this.task);
    this.todoService.updateTask(this.task).subscribe({
      next: data => {
        this.result = data;
        console.log("this is result AFTER UPDATE");
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
