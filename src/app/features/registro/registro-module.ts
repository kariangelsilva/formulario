import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RegistroForm } from './component/registro-form/registro-form';

@NgModule({
  declarations: [RegistroForm],
  imports: [CommonModule, ReactiveFormsModule],
  exports: [RegistroForm],
})
export class RegistroModule {}
