import { Component } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';

/**
 * Validador de grupo (cross-field): verifica que 'password' y
 * 'confirmPassword' coincidan. Es una función reutilizable e
 * independiente de la clase del componente, tal como pide el taller.
 */
export function passwordsMatchValidator(): ValidatorFn {
  return (group: AbstractControl): ValidationErrors | null => {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;

    if (!password || !confirmPassword) {
      return null;
    }

    return password === confirmPassword ? null : { passwordsMismatch: true };
  };
}

/**
 * Validador de campo (opcional #3 del taller): el nombre de usuario
 * no puede contener espacios en blanco.
 */
export function noWhitespaceValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value as string | null;

    if (!value) {
      return null;
    }

    return /\s/.test(value) ? { whitespace: true } : null;
  };
}

interface PasswordStrength {
  label: string;
  level: 0 | 1 | 2 | 3;
}

@Component({
  selector: 'app-registro-form',
  standalone: false,
  templateUrl: './registro-form.html',
  styleUrl: './registro-form.scss',
})
export class RegistroForm {
  form: FormGroup;
  submitted = false;
  showPassword = false;
  showConfirmPassword = false;
  summary: Record<string, unknown> | null = null;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group(
      {
        fullName: [null, [Validators.required, Validators.minLength(3)]],
        email: [null, [Validators.required, Validators.email]],
        username: [
          null,
          [
            Validators.required,
            Validators.pattern(/^[a-zA-Z0-9_]+$/),
            noWhitespaceValidator(),
          ],
        ],
        password: [null, [Validators.required, Validators.minLength(8)]],
        confirmPassword: [null, [Validators.required]],
        age: [null, [Validators.required, Validators.min(15), Validators.max(90)]],
        terms: [false, [Validators.requiredTrue]],
      },
      { validators: passwordsMatchValidator() },
    );
  }

  /** Muestra el error de un control solo si fue tocado o modificado. */
  hasError(controlName: string, errorCode: string): boolean {
    const control = this.form.get(controlName)!;
    const hasErrorCode = control.hasError(errorCode);
    return hasErrorCode && (control.dirty || control.touched);
  }

  /** Error de grupo (contraseñas no coinciden), solo tras interacción. */
  hasMismatchError(): boolean {
    const confirmControl = this.form.get('confirmPassword')!;
    return this.form.hasError('passwordsMismatch') && (confirmControl.dirty || confirmControl.touched);
  }

  /** Opcional: indicador visual de fortaleza de la contraseña. */
  get passwordStrength(): PasswordStrength {
    const value: string = this.form.get('password')?.value || '';

    if (!value) {
      return { label: '', level: 0 };
    }

    let score = 0;
    if (value.length >= 8) score++;
    if (/[a-z]/.test(value) && /[A-Z]/.test(value)) score++;
    if (/\d/.test(value)) score++;
    if (/[^A-Za-z0-9]/.test(value)) score++;

    if (score <= 1) return { label: 'Débil', level: 1 };
    if (score <= 3) return { label: 'Media', level: 2 };
    return { label: 'Fuerte', level: 3 };
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmPasswordVisibility(): void {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    // Resumen sin la contraseña ni la confirmación, tal como pide el taller.
    const { password, confirmPassword, ...rest } = this.form.getRawValue();
    this.summary = rest;
    this.submitted = true;
  }

  /** Opcional: limpiar y deshabilitar el formulario tras un registro exitoso. */
  registerAnother(): void {
    this.submitted = false;
    this.summary = null;
    this.form.reset({ terms: false });
  }
}
