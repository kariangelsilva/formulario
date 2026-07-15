import {
  NgModule,
  provideBrowserGlobalErrorListeners,
  provideZonelessChangeDetection,
} from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';
import { App } from './app';
import { RegistroModule } from './features/registro/registro-module';

@NgModule({
  declarations: [App],
  imports: [BrowserModule, RegistroModule],
  providers: [provideBrowserGlobalErrorListeners(), provideZonelessChangeDetection()],
  bootstrap: [App],
})
export class AppModule {}
