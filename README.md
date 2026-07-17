# Taller: Formularios Reactivos con Validaciones

SENA — Centro de Comercio y Turismo del Quindío
Tecnología en Análisis y Desarrollo de Sistemas de Información
Angular v19/20 — Reactive Forms

## Descripción

Formulario de registro de usuario construido con **Reactive Forms** (`FormGroup` /
`FormBuilder`), con validadores integrados de Angular y un validador
personalizado a nivel de grupo que compara `password` y `confirmPassword`.

## Requerimientos implementados

- [x] `ReactiveFormsModule` importado en `RegistroModule` (no se usa `ngModel`).
- [x] Formulario construido con `FormBuilder` en la clase del componente.
- [x] Validador de grupo (cross-field) `passwordsMatchValidator` — función
      reutilizable en `registro-form.ts`.
- [x] Mensajes de error por campo, visibles solo cuando el control está
      `touched` o `dirty`.
- [x] Botón de registro deshabilitado mientras el formulario sea inválido.
- [x] Resumen de los datos al enviar (sin incluir la contraseña).

### Opcionales implementados

- [x] Indicador visual de fortaleza de la contraseña (débil / media / fuerte).
- [x] Mostrar / ocultar contraseña con botón de tipo interruptor.
- [x] Segundo validador personalizado a nivel de campo: el nombre de usuario
      no puede contener espacios (`noWhitespaceValidator`).
- [x] El formulario se limpia y muestra un mensaje de confirmación tras un
      registro exitoso (botón "Registrar otro usuario").
- [x] Estilos que marcan en color los campos válidos/inválidos usando las
      clases de estado de Angular (`.ng-valid`, `.ng-invalid`, `.ng-touched`).

## Estructura del proyecto

```
src/app/
├── app-module.ts
├── app.ts / app.html / app.scss
├── core/
│   └── core-module.ts
├── shared/
│   └── shared-module.ts
└── features/
    └── registro/
        ├── registro-module.ts
        └── component/
            └── registro-form/
                ├── registro-form.ts
                ├── registro-form.html
                ├── registro-form.scss
                └── registro-form.spec.ts
```

## Instalación y ejecución

```bash
npm install
ng serve
```

Luego abre `http://localhost:4200/` en el navegador. La aplicación se
recarga automáticamente al modificar cualquier archivo fuente.

## Pruebas unitarias

```bash
ng test
```

## Build

```bash
ng build
```

Los artefactos de compilación se generan en `dist/`.
