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

  templateUrl: './comments.component.html',
  styleUrl: './comments.component.scss',
})
export class CommentsComponent implements OnInit {
  @Input() comments!: Comment[]; // Input property to receive comments data from parent component - same as props in React
  // comments = input<Comment[]>(); // New syntax for input property

  @Output() newComment = new EventEmitter<string>(); // Output property to emit new comment data to parent component - same as props in React

  commentCtrl!: FormControl;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    // Initialize the comment form control with validation
    this.commentCtrl = this.formBuilder.control('', [
      Validators.required,
      Validators.minLength(10),
    ]);
  }

  onLeaveComment() {
    if (this.commentCtrl.invalid) {
      return;
    }
    this.newComment.emit(this.commentCtrl.value);
    this.commentCtrl.reset();
  }
}
