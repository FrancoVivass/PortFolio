import { trigger, transition, style, query, group, animateChild, animate } from '@angular/animations';

export const pageTransition = trigger('pageTransition', [
  transition('* => *', [
    query(':enter, :leave', [
      style({
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%'
      })
    ], { optional: true }),
    query(':enter', [
      style({ transform: 'translateX(100%)' })
    ], { optional: true }),
    group([
      query(':leave', [
        animate('300ms ease-in-out', style({ transform: 'translateX(-100%)' }))
      ], { optional: true }),
      query(':enter', [
        animate('300ms ease-in-out', style({ transform: 'translateX(0%)' }))
      ], { optional: true })
    ])
  ])
]);
