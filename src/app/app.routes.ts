import { Routes } from '@angular/router';
import { SocialMediaComponent } from './social-media/components/social-media/social-media.component';
import { TestComponent } from './core/components/test/test.component';

export const routes: Routes = [
  //   {
  //     path: 'social-media',
  //     loadComponent: () =>
  //       import(
  //         './social-media/components/social-media/social-media.component'
  //       ).then((m) => m.SocialMediaComponent),
  //   },
  { path: 'social-media', component: SocialMediaComponent },
  { path: 'test', component: TestComponent },
  //   { path: '**', redirectTo: 'social-media' },
];
