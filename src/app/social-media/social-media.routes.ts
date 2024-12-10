import { Routes } from '@angular/router';
import { PostListComponent } from './components/post-list/post-list.component';
import { PostsResolver } from './resolvers/posts.resolver';

export const SOCIALMEDIA_ROUTES: Routes = [
  {
    path: '',
    component: PostListComponent,
    resolve: { posts: PostsResolver }, // Resolves the posts data before rendering the component and return it at the key 'posts'
  },
];
