import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ITask } from '../tasks';
import { TodoService } from '../todo-service.service';

@Component({
  selector: 'app-todo-detail',
  templateUrl: './todo-detail.component.html',
  styleUrls: ['./todo-detail.component.css']
})
export class TodoDetailComponent implements OnInit {
  pageTitle = 'Task Detail';
  errorMessage = '';
  task: ITask | undefined; 
  constructor(private route: ActivatedRoute,
              private router: Router,
              private todoService: TodoService) {
  }


  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.getTask(id);
    }
  }

  deleteTask(id: string): void{
    console.log("this is id in delete task" + id);
    this.todoService.deleteTask(id);
    //this.fetchData();

    setTimeout(()=>{                     
      this.router.navigate(['/tasks']);
    }, 1000);
  }

  getTask(id: String): void {
    this.todoService.getTask(id).subscribe({
      next: task => this.task= task,
      error: err => this.errorMessage = err
    });
  }

  onBack(): void {
    this.router.navigate(['/tasks']);
  }
}

