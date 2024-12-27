import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatPseudoCheckboxModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';

@Component({
  selector: 'app-complex-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatPseudoCheckboxModule,
    MatInputModule,
    MatButtonModule,
    MatRadioModule,
    MatCardModule,
    CommonModule,
  ],
  templateUrl: './complex-form.component.html',
  styleUrl: './complex-form.component.scss',
})
export class ComplexFormComponent implements OnInit {
  mainForm!: FormGroup;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.initMainForm();
  }

  initMainForm(): void {
    this.mainForm = this.formBuilder.group({});
  }

  onSubmitForm(): void {
    console.log(this.mainForm.value);
  }
}
