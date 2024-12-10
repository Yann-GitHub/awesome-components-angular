import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Post } from '../models/post.model';
import { PostService } from '../services/post.service';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

// @Injectable()
@Injectable({
  providedIn: 'any', // for lazy loading
})
export class PostsResolver implements Resolve<Post[]> {
  constructor(private postService: PostService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Post[]> {
    return this.postService.getPosts();
  }
}
