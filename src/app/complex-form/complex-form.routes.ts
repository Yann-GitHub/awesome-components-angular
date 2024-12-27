import { Routes } from '@angular/router';
// import { PostListComponent } from './components/post-list/post-list.component';
// import { PostsResolver } from './resolvers/posts.resolver';
import { ComplexFormComponent } from './components/complex-form/complex-form.component';

export const COMPLEXFORM_ROUTES: Routes = [
  {
    path: '',
    component: ComplexFormComponent,
    // resolve: { posts: PostsResolver }, // Resolves the posts data before rendering the component and return it at the key 'posts'
  },
];
