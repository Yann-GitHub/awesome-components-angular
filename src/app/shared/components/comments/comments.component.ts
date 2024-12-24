import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { Comment } from '../../../core/models/comment.model';
import { MatListModule } from '@angular/material/list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule, DatePipe } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormControl } from '@angular/forms';
import {
  state,
  trigger,
  style,
  transition,
  animate,
} from '@angular/animations';

@Component({
  selector: 'app-comments',
  standalone: true,
  imports: [
    MatListModule,
    MatFormFieldModule,
    DatePipe,
    CommonModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    ReactiveFormsModule,
  ],
  animations: [
    trigger('listItem', [
      state(
        'default',
        style({
          transform: 'scale(1)',
          backgroundColor: 'white',
          zIndex: 1,
        })
      ),
      state(
        'active',
        style({
          transform: 'scale(1.05)',
          backgroundColor: 'rgb(201, 157, 242)',
          zIndex: 2,
        })
      ),
      transition('default => active', [animate('250ms ease-in-out')]),
      transition('active => default', [animate('250ms ease-in-out')]),
    ]),
  ],

  templateUrl: './comments.component.html',
  styleUrl: './comments.component.scss',
})
export class CommentsComponent implements OnInit {
  @Input() comments!: Comment[]; // Input property to receive comments data from parent component - same as props in React
  // comments = input<Comment[]>(); // New syntax for input property

  @Output() newComment = new EventEmitter<string>(); // Output property to emit new comment data to parent component - same as props in React

  commentCtrl!: FormControl;
  animationStates: { [key: number]: 'default' | 'active' } = {};
  // listItemAnimationState: 'default' | 'active' = 'default';

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    // Initialize the comment form control with validation
    this.commentCtrl = this.formBuilder.control('', [
      Validators.required,
      Validators.minLength(10),
    ]);

    // Initialize the animation states for each comment
    for (let index in this.comments) {
      this.animationStates[index] = 'default';
    }
  }

  onLeaveComment() {
    if (this.commentCtrl.invalid) {
      return;
    }
    this.newComment.emit(this.commentCtrl.value);
    this.commentCtrl.reset();
  }

  onListItemMouseEnter(index: number) {
    this.animationStates[index] = 'active';
  }

  onListItemMouseLeave(index: number) {
    this.animationStates[index] = 'default';
  }
}
