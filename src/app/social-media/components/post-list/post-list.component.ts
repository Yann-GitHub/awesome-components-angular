import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostListItemComponent } from '../post-list-item/post-list-item.component';
import { Observable, map } from 'rxjs';
import { Post } from '../../models/post.model';
import { AsyncPipe, NgFor } from '@angular/common';
import { PostService } from '../../services/post.service';

@Component({
  selector: 'app-post-list',
  standalone: true,
  imports: [PostListItemComponent, AsyncPipe],
  templateUrl: './post-list.component.html',
  styleUrl: './post-list.component.scss',
})
export class PostListComponent implements OnInit {
  posts$!: Observable<Post[]>; // Resolved posts data from the route

  constructor(
    private route: ActivatedRoute,
    private postService: PostService
  ) {} // Injects ActivatedRoute to access resolved route data

  ngOnInit() {
    this.posts$ = this.route.data.pipe(map((data) => data['posts'])); // Extracts the 'posts' value from the resolved route data
  }

  onPostCommented(postCommented: { comment: string; postId: number }) {
    // Handle the emitted comment data from the child component
    this.postService.addNewComment(postCommented);
  }
}
