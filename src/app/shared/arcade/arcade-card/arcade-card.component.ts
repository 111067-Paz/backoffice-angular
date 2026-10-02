import { ChangeDetectionStrategy, Component, input } from '@angular/core';

export type ArcadeCardVariant = 'cyan' | 'magenta' | 'yellow' | 'green' | 'default';
export type ArcadeCardPadding = 'none' | 'sm' | 'md';

@Component({
  selector: 'app-arcade-card',
  standalone: true,
  template: `
    <div
      class="relative bg-surface/90 border rounded-md backdrop-blur-sm transition-colors duration-200"
      [class.border-brand-2/60]="variant() === 'cyan'"
      [class.border-brand/60]="variant() === 'magenta'"
      [class.border-gold/60]="variant() === 'yellow'"
      [class.border-success/60]="variant() === 'green'"
      [class.border-line]="variant() === 'default'"
      [class.p-0]="padding() === 'none'"
      [class.p-3]="padding() === 'sm'"
      [class.p-5]="padding() === 'md'"
      [class.hover:border-opacity-100]="glow()"
    >
      @if (hasCorners()) {
        <span class="absolute -top-1 -left-1 w-1.5 h-1.5 bg-line pointer-events-none"></span>
        <span class="absolute -top-1 -right-1 w-1.5 h-1.5 bg-line pointer-events-none"></span>
        <span class="absolute -bottom-1 -left-1 w-1.5 h-1.5 bg-line pointer-events-none"></span>
        <span class="absolute -bottom-1 -right-1 w-1.5 h-1.5 bg-line pointer-events-none"></span>
      }
      <ng-content></ng-content>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArcadeCardComponent {
  readonly variant = input<ArcadeCardVariant>('default');
  readonly padding = input<ArcadeCardPadding>('md');
  readonly glow = input<boolean>(false);
  readonly hasCorners = input<boolean>(true);
}
