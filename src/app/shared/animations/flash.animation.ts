import {
  animation,
  sequence,
  animate,
  style,
  query,
} from '@angular/animations';

export const flashAnimation = animation([
  sequence([
    animate('{{ time }}', style({ backgroundColor: '{{ flashColor }}' })),
    animate('{{ time }}', style({ backgroundColor: 'white' })),
  ]),
]);
