import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'social-media',
    loadChildren: () =>
      import('./social-media/social-media.routes').then(
        (m) => m.SOCIALMEDIA_ROUTES
      ),
  },
  { path: '', redirectTo: 'social-media', pathMatch: 'full' },
];
