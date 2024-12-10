import { Component, Input, OnInit } from '@angular/core';
import { Post } from '../../models/post.model';
import { TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-post-list-item',
  standalone: true,
  imports: [TitleCasePipe],
  templateUrl: './post-list-item.component.html',
  styleUrl: './post-list-item.component.scss',
})
export class PostListItemComponent implements OnInit {
  @Input() post!: Post; // Input property to receive post data from parent component - same as props in React

  constructor() {}

  ngOnInit() {}
}
