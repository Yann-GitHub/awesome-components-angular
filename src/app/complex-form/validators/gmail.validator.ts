import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function gmailValidator(): ValidatorFn {
  return (ctrl: AbstractControl): null | ValidationErrors => {
    if (!ctrl.value) return { gmailValidator: ctrl.value };

    if (ctrl.value.includes('gmail')) {
      return null;
    } else {
      return { gmailValidator: ctrl.value };
    }
  };
}
