import { Routes } from '@angular/router';
// import { PostListComponent } from './components/post-list/post-list.component';
import { EmployeeListComponent } from './components/employee-list/employee-list.component';
import { SingleEmployeeComponent } from './components/single-employee/single-employee.component';
// import { PostsResolver } from './resolvers/posts.resolver';

export const REACTIVESTATE_ROUTES: Routes = [
  {
    path: '',
    redirectTo: 'employees',
    pathMatch: 'full',
  },
  {
    path: 'employees',
    component: EmployeeListComponent,
  },
  {
    path: 'employees/:id',
    component: SingleEmployeeComponent,
  },
  {
    path: '**',
    redirectTo: 'employees',
  },
];
