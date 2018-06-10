import {animate, style, transition, trigger} from '@angular/animations';

export const enterAnimation =
  trigger(
    'enterAnimation', [
      transition(':enter', [
        style({ marginLeft: '-20px', opacity: 0 }),
        animate('0.2s ease-in', style({ marginLeft: 0, opacity: 1 })),
        animate('0.2s ease-in', style({ marginLeft: 0, opacity: 1 }))
      ]),
      transition(':leave', [
        style({ marginLeft: 0, opacity: 0}),
        animate('0.2ms ease-out', style({ marginLeft: '-20px', opacity: 0 }))
      ])
    ]
  );

export const enterAnimationSlow =
  trigger(
    'enterAnimationSlow', [
      transition(':enter', [
        style({ marginLeft: '-20px', opacity: 0 }),
        animate('0.4s ease-in', style({ marginLeft: 0, opacity: 1 }))
      ]),
      transition(':leave', [
        style({ marginLeft: 0, opacity: 0}),
        animate('0.4ms ease-out', style({ marginLeft: '-20px', opacity: 0 }))
      ])
    ]
  );
