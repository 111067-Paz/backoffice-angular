import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';

export type ArcadeButtonVariant = 'cyan' | 'magenta' | 'yellow' | 'green';
export type ArcadeButtonSize = 'sm' | 'md' | 'lg';

@Component({
  selector: 'app-arcade-button',
  standalone: true,
  template: `
    <button
      [type]="type()"
      [disabled]="disabled()"
      (click)="onClick($event)"
      class="flex items-center justify-center font-retro uppercase font-bold border-2 active:translate-y-1 active:shadow-none transition-all cursor-pointer select-none rounded-sm disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
      [class.px-3]="size() === 'sm'"
      [class.py-1.5]="size() === 'sm'"
      [class.text-[8px]]="size() === 'sm'"
      [class.px-5]="size() === 'md'"
      [class.py-2.5]="size() === 'md'"
      [class.text-[10px]]="size() === 'md'"
      [class.px-7]="size() === 'lg'"
      [class.py-3.5]="size() === 'lg'"
      [class.text-xs]="size() === 'lg'"
      [class.bg-brand-2]="variant() === 'cyan'"
      [class.hover:brightness-110]="variant() === 'cyan'"
      [class.text-slate-950]="variant() === 'cyan'"
      [class.border-brand-2]="variant() === 'cyan'"
      [class.shadow-[0_4px_0_color-mix(in_srgb,var(--accent-secondary)_65%,black)]]="variant() === 'cyan'"
      [class.bg-brand]="variant() === 'magenta'"
      [class.hover:brightness-110]="variant() === 'magenta'"
      [class.text-white]="variant() === 'magenta'"
      [class.border-brand]="variant() === 'magenta'"
      [class.shadow-[0_4px_0_color-mix(in_srgb,var(--accent-primary)_65%,black)]]="variant() === 'magenta'"
      [class.bg-gold]="variant() === 'yellow'"
      [class.hover:brightness-110]="variant() === 'yellow'"
      [class.text-slate-950]="variant() === 'yellow'"
      [class.border-gold]="variant() === 'yellow'"
      [class.shadow-[0_4px_0_color-mix(in_srgb,var(--accent-gold)_65%,black)]]="variant() === 'yellow'"
      [class.bg-success]="variant() === 'green'"
      [class.hover:brightness-110]="variant() === 'green'"
      [class.text-slate-950]="variant() === 'green'"
      [class.border-success]="variant() === 'green'"
      [class.shadow-[0_4px_0_color-mix(in_srgb,var(--accent-success)_65%,black)]]="variant() === 'green'"
    >
      <ng-content></ng-content>
    </button>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArcadeButtonComponent {
  readonly variant = input<ArcadeButtonVariant>('magenta');
  readonly size = input<ArcadeButtonSize>('md');
  readonly disabled = input<boolean>(false);
  readonly type = input<'button' | 'submit' | 'reset'>('button');
  readonly btnClick = output<MouseEvent>();

  onClick(event: MouseEvent): void {
    if (!this.disabled()) {
      this.btnClick.emit(event);
    }
  }
}
