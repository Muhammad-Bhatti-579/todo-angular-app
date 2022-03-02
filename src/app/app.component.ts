import { Component } from '@angular/core';

@Component({
  selector: 'pm-root',
  template: `
    <nav class='navbar navbar-expand navbar-light bg-light'>
        <a class='navbar-brand'>{{pageTitle}}</a>
        <ul class='nav nav-pills'>
          <li><a class='nav-link' routerLinkActive='active' routerLink='/create'>New Task</a></li>
          <li><a class='nav-link' routerLinkActive='active' routerLink='/tasks'>Tasks List</a></li>
          <li><a class='nav-link' routerLinkActive='active' routerLink='/completed-tasks'>Completed Tasks</a></li>



        </ul>
    </nav>
    <div class='container'>
      <router-outlet></router-outlet>
    </div>
    `,
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  pageTitle = 'Todo List Manager';
}
