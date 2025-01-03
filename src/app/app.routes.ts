import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'social-media',
    loadChildren: () =>
      import('./social-media/social-media.routes').then(
        (m) => m.SOCIALMEDIA_ROUTES
      ),
  },
  {
    path: 'complex-form',
    loadChildren: () =>
      import('./complex-form/complex-form.routes').then(
        (m) => m.COMPLEXFORM_ROUTES
      ),
  },
  {
    path: 'reactive-state',
    loadChildren: () =>
      import('./reactive-state/reactive-state.routes').then(
        (m) => m.REACTIVESTATE_ROUTES
      ),
  },
  { path: '', redirectTo: 'social-media', pathMatch: 'full' },
];
