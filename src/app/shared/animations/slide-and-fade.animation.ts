import { animation, style, animate } from '@angular/animations';

export const slideAndFadeAnimation = animation([
  style({
    transform: 'translateX(-100%)',
    opacity: 0,
    backgroundColor: '{{ startColor }}',
  }),
  animate('{{ time }} ease-in-out'),
  style({
    transform: 'translateX(0)',
    opacity: 1,
    backgroundColor: 'white',
  }),
]);
