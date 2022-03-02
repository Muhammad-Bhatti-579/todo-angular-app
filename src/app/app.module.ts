import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { TodoCreateComponent } from './todo-create/todo-create.component';
import { TodoListComponent } from './todo-list/todo-list.component';
import { FormsModule }   from '@angular/forms';
import { TodoCompletedComponent } from './todo-completed/todo-completed.component';
import { TodoDetailComponent } from './todo-detail/todo-detail.component';
import { TodoEditComponent } from './todo-edit/todo-edit.component';

// import { TaskModule } from './todo-list/task.module';

@NgModule({
  declarations: [
    AppComponent,
    TodoListComponent,
    TodoCreateComponent,
    TodoCompletedComponent,
    TodoDetailComponent,
    TodoEditComponent

  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot([
      { path: 'create', component: TodoCreateComponent },
      { path: 'tasks', component: TodoListComponent },
      { path: 'completed-tasks', component: TodoCompletedComponent },
      { path: 'tasks/:id', component: TodoDetailComponent},
      { path: 'edit-task/:id', component: TodoEditComponent},
      { path: '', redirectTo: 'create', pathMatch: 'full' },
      { path: '**', redirectTo: 'create', pathMatch: 'full' }
    ]),
    FormsModule
  
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
