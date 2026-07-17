import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';

import { RegistroForm } from './registro-form';

describe('RegistroForm', () => {
  let component: RegistroForm;
  let fixture: ComponentFixture<RegistroForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RegistroForm],
      imports: [ReactiveFormsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(RegistroForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be invalid when empty', () => {
    expect(component.form.valid).toBeFalse();
  });

  it('should flag mismatched passwords', () => {
    component.form.patchValue({
      password: 'Password1!',
      confirmPassword: 'Password2!',
    });

    expect(component.form.hasError('passwordsMismatch')).toBeTrue();
  });

  it('should be valid with correct data', () => {
    component.form.setValue({
      fullName: 'Juan Pérez',
      email: 'juan@example.com',
      username: 'juan_perez21',
      password: 'Password1!',
      confirmPassword: 'Password1!',
      age: 25,
      terms: true,
    });

    expect(component.form.valid).toBeTrue();
  });
});
