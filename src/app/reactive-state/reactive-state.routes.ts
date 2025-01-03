import { Routes } from '@angular/router';
// import { PostListComponent } from './components/post-list/post-list.component';
import { EmployeeListComponent } from './components/employee-list/employee-list.component';
import { SingleEmployeeComponent } from './components/single-employee/single-employee.component';
// import { PostsResolver } from './resolvers/posts.resolver';

export const REACTIVESTATE_ROUTES: Routes = [
  {
    path: '',
    component: EmployeeListComponent,
    // resolve: { posts: PostsResolver }, // Resolves the posts data before rendering the component and return it at the key 'posts'
  },
  {
    path: ':id',
    component: SingleEmployeeComponent,
  },
  {
    path: '',
    redirectTo: 'reactive-state',
    pathMatch: 'full',
  },
];
