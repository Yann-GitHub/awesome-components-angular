import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from '../models/post.model';
import { environment } from '../../../environments/environment';

// @Injectable()
@Injectable({
  providedIn: 'root', // for lazy loading
})
export class PostService {
  constructor(private http: HttpClient) {}

  getPosts(): Observable<Post[]> {
    // return this.http.get<Post[]>('http://localhost:3000/posts'); // Without environment variable - hard coded
    return this.http.get<Post[]>(`${environment.apiUrl}/posts`);
  }
}
