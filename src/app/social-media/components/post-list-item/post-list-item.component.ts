import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Post } from '../../models/post.model';
import { TitleCasePipe, CommonModule, DatePipe, NgIf } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { CommentsComponent } from '../../../shared/components/comments/comments.component';

@Component({
  selector: 'app-post-list-item',
  standalone: true,
  imports: [
    TitleCasePipe,
    DatePipe,
    CommonModule,
    MatCardModule,
    CommentsComponent,
  ],
  templateUrl: './post-list-item.component.html',
  styleUrl: './post-list-item.component.scss',
})
export class PostListItemComponent implements OnInit {
  @Input() post!: Post; // Input property to receive post data from parent component - same as props in React
  @Output() postCommented = new EventEmitter<{
    comment: string;
    postId: number;
  }>(); // Output property to emit new comment data to parent component - same as props in React

  constructor() {}

  ngOnInit() {}

  onNewComment(comment: string) {
    this.postCommented.emit({ comment, postId: this.post.id });
  }
}
