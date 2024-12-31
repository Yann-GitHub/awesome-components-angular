import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatPseudoCheckboxModule } from '@angular/material/core';
import { MatError, MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { map, Observable, startWith, tap } from 'rxjs';
import { ComplexFormValue } from '../../models/complex-form-value.model';
import { ComplexFormService } from '../../services/complex-form.service';
import { gmailValidator } from '../../validators/gmail.validator';
import { confirmEqualValidator } from '../../validators/confirm-equal.validator';

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
    MatProgressSpinnerModule,
    CommonModule,
  ],
  templateUrl: './complex-form.component.html',
  styleUrl: './complex-form.component.scss',
})
export class ComplexFormComponent implements OnInit {
  loading = false;
  mainForm!: FormGroup;

  personalInfoForm!: FormGroup;
  contactPreferenceCtrl!: FormControl;
  emailCtrl!: FormControl;
  confirmEmailCtrl!: FormControl;
  emailForm!: FormGroup;
  phoneCtrl!: FormControl;
  passwordCtrl!: FormControl;
  confirmPasswordCtrl!: FormControl;
  loginInfoForm!: FormGroup;

  showEmailCtrl$!: Observable<boolean>;
  showPhoneCtrl$!: Observable<boolean>;
  showEmailError$!: Observable<boolean>;
  showPasswordError$!: Observable<boolean>;

  constructor(
    private formBuilder: FormBuilder,
    private complexFormService: ComplexFormService
  ) {}

  ngOnInit(): void {
    this.initFormControls();
    this.initMainForm();

    this.initFormObservables();
  }

  private initMainForm(): void {
    // Create the main form group with the form controls
    this.mainForm = this.formBuilder.group({
      personalInfo: this.personalInfoForm,
      contactPreference: this.contactPreferenceCtrl,
      email: this.emailForm,
      phone: this.phoneCtrl,
      loginInfo: this.loginInfoForm,
    });
  }

  private initFormControls(): void {
    this.personalInfoForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
    });

    this.contactPreferenceCtrl = this.formBuilder.control('email');
    this.emailCtrl = this.formBuilder.control('');
    this.confirmEmailCtrl = this.formBuilder.control('');
    this.emailForm = this.formBuilder.group(
      {
        email: this.emailCtrl,
        confirm: this.confirmEmailCtrl,
      },
      {
        validators: [confirmEqualValidator('email', 'confirm')],
        updateOn: 'blur',
      }
    );

    this.phoneCtrl = this.formBuilder.control('');
    this.passwordCtrl = this.formBuilder.control('', Validators.required);
    this.confirmPasswordCtrl = this.formBuilder.control(
      '',
      Validators.required
    );
    this.loginInfoForm = this.formBuilder.group(
      {
        username: ['', Validators.required], // Simple form control with validation
        password: this.passwordCtrl, // Independent form control with validation
        confirmPassword: this.confirmPasswordCtrl, // Independent form control with validation
      },
      {
        validators: [confirmEqualValidator('password', 'confirmPassword')],
        updateOn: 'blur',
      }
    );
  }

  private initFormObservables(): void {
    this.showEmailCtrl$ = this.contactPreferenceCtrl.valueChanges.pipe(
      startWith(this.contactPreferenceCtrl.value), // Start with the current value of the control
      map((preference) => preference === 'email'),
      tap((showEmailCtrl) => {
        this.setEmailValidators(showEmailCtrl);
      })
    );
    this.showPhoneCtrl$ = this.contactPreferenceCtrl.valueChanges.pipe(
      startWith(this.contactPreferenceCtrl.value), // Start with the current value of the control
      map((preference) => preference === 'phone'),
      tap((showPhoneCtrl) => {
        this.setPhoneValidators(showPhoneCtrl);
      })
    );
    this.showEmailError$ = this.emailForm.statusChanges.pipe(
      map(
        (status) =>
          status === 'INVALID' &&
          this.emailCtrl.value &&
          this.confirmEmailCtrl.value
      )
    );

    this.showPasswordError$ = this.loginInfoForm.statusChanges.pipe(
      map(
        (status) =>
          status === 'INVALID' &&
          this.passwordCtrl.value &&
          this.confirmPasswordCtrl.value &&
          this.loginInfoForm.hasError('confirmEqual')
      )
    );
  }

  private setEmailValidators(showEmailCtrl: boolean) {
    if (showEmailCtrl) {
      // Add required validation to the email and confirm email controls
      this.emailCtrl.setValidators([
        Validators.required,
        Validators.email,
        gmailValidator(),
      ]);
      this.confirmEmailCtrl.setValidators([
        Validators.required,
        Validators.email,
        gmailValidator(),
      ]);
    } else {
      // Clear the validators for the email and confirm email controls
      this.emailCtrl.clearValidators();
      this.confirmEmailCtrl.clearValidators();
    }
    this.emailCtrl.updateValueAndValidity(); // Update the validation status of the control after changing the validators
    this.confirmEmailCtrl.updateValueAndValidity(); // Update the validation status of the control after changing the validators
  }

  private setPhoneValidators(showPhoneCtrl: boolean) {
    if (showPhoneCtrl) {
      // Add required validation to the phone control
      this.phoneCtrl.setValidators([
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(10),
      ]);
    } else {
      // Clear the validators for the phone control
      this.phoneCtrl.clearValidators();
    }
    this.phoneCtrl.updateValueAndValidity(); // Update the validation status of the control after changing the validators
  }

  onSubmitForm(): void {
    // console.log(this.mainForm.value);
    this.loading = true;
    this.complexFormService
      .saveUserInfo(this.mainForm.value)
      .pipe(
        tap((saved) => {
          this.loading = false;
          if (saved) {
            this.resetForm();
            console.log('User info saved successfully');
          } else {
            console.error('Failed to save user info');
          }
        })
      )
      .subscribe();
  }

  private resetForm() {
    this.mainForm.reset();
    this.contactPreferenceCtrl.patchValue('email');
  }

  getFormControlErrorText(ctrl: AbstractControl) {
    // AbstractControl is the base class for all form controls in Angular
    if (ctrl.hasError('required')) {
      return 'Ce champ est obligatoire';
    } else if (ctrl.hasError('email')) {
      return 'Veuillez saisir une adresse e-mail valide';
    } else if (ctrl.hasError('minlength')) {
      return 'Pas assez de caractères';
    } else if (ctrl.hasError('maxlength')) {
      return 'Trop de caractères';
    } else if (ctrl.hasError('gmailValidator')) {
      return "Il ne s'agit pas d'une adresse gmail";
    } else {
      return 'Valeur invalide';
    }
  }
}
