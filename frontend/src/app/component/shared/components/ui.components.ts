import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterLink } from '@angular/router';
import type { SelectOption } from '../../../model/select-option.model';

@Component({
  selector: 'app-logo',
  imports: [],
  template: `
    <button type="button" class="flex items-center gap-2.5 cursor-pointer" (click)="clicked.emit()">
      <div [class]="markClass">
        <svg [class]="iconClass" fill="currentColor" viewBox="0 0 24 24">
          <path d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
          <path
            fill-rule="evenodd"
            d="M4.293 8.293A1 1 0 015 8h14a1 1 0 01.966.743l1 4A1 1 0 0120 14H4a1 1 0 01-.966-1.257l1-4a1 1 0 01.259-.45z"
            clip-rule="evenodd"
          />
        </svg>
      </div>
      @if (showWordmark) {
        <span [class]="wordClass">Salla7a</span>
      }
    </button>
  `,
})
export class LogoComponent {
  @Input() size: 'sm' | 'md' | 'lg' = 'md';
  @Input() showWordmark = true;
  @Output() clicked = new EventEmitter<void>();

  get markClass(): string {
    const sizes = { sm: 'w-7 h-7 rounded-lg', md: 'w-9 h-9 rounded-xl', lg: 'w-10 h-10 rounded-xl' };
    return `${sizes[this.size]} bg-primary flex items-center justify-center flex-shrink-0`;
  }

  get iconClass(): string {
    const sizes = { sm: 'w-4 h-4', md: 'w-5 h-5', lg: 'w-6 h-6' };
    return `${sizes[this.size]} text-bg`;
  }

  get wordClass(): string {
    const sizes = { sm: 'text-base', md: 'text-xl', lg: 'text-2xl' };
    return `font-display font-bold ${sizes[this.size]} text-text`;
  }
}

@Component({
  selector: 'app-button',
  imports: [],
  template: `
    <button
      [attr.type]="type"
      [disabled]="disabled || loading"
      [class]="classes"
      (click)="clicked.emit($event)"
    >
      @if (loading) {
        <span class="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"></span>
      }
      <ng-content />
    </button>
  `,
})
export class ButtonComponent {
  @Input() variant: 'primary' | 'secondary' | 'danger' | 'ghost' | 'success' = 'primary';
  @Input() size: 'sm' | 'md' | 'lg' = 'md';
  @Input() loading = false;
  @Input() disabled = false;
  @Input() type: 'button' | 'submit' = 'button';
  @Input() extraClass = '';
  @Output() clicked = new EventEmitter<MouseEvent>();

  get classes(): string {
    const base =
      'inline-flex items-center justify-center gap-2 font-semibold rounded-lg transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer';
    const variants = {
      primary: 'bg-primary text-bg hover:bg-primary-dark active:scale-95',
      secondary: 'bg-panel text-text hover:bg-border border border-border',
      danger: 'bg-danger/10 text-danger hover:bg-danger hover:text-white border border-danger/30',
      ghost: 'text-muted hover:text-text hover:bg-panel',
      success: 'bg-success/10 text-success hover:bg-success hover:text-white border border-success/30',
    };
    const sizes = { sm: 'px-3 py-1.5 text-sm', md: 'px-4 py-2 text-sm', lg: 'px-6 py-3 text-base' };
    return `${base} ${variants[this.variant]} ${sizes[this.size]} ${this.extraClass}`;
  }
}

@Component({
  selector: 'app-input',
  imports: [],
  template: `
    <div class="flex flex-col gap-1.5">
      @if (label) {
        <label class="text-sm font-medium text-muted">{{ label }}</label>
      }
      <input
        [type]="type"
        [placeholder]="placeholder"
        [value]="value"
        [required]="required"
        [disabled]="disabled"
        [class]="inputClass"
        (input)="valueChange.emit($any($event.target).value)"
      />
      @if (error) {
        <p class="text-xs text-danger">{{ error }}</p>
      }
    </div>
  `,
})
export class InputComponent {
  @Input() label = '';
  @Input() type = 'text';
  @Input() placeholder = '';
  @Input() value = '';
  @Input() error = '';
  @Input() required = false;
  @Input() disabled = false;
  @Output() valueChange = new EventEmitter<string>();

  get inputClass(): string {
    return `w-full bg-panel border ${this.error ? 'border-danger' : 'border-border'} text-text rounded-lg px-3 py-2.5 text-sm placeholder:text-subtle focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition`;
  }
}

@Component({
  selector: 'app-select',
  imports: [],
  template: `
    <div class="flex flex-col gap-1.5">
      @if (label) {
        <label class="text-sm font-medium text-muted">{{ label }}</label>
      }
      <select
        [value]="value"
        class="w-full bg-panel border border-border text-text rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition"
        (change)="valueChange.emit($any($event.target).value)"
      >
        @for (option of options; track option.value) {
          <option [value]="option.value">{{ option.label }}</option>
        }
      </select>
    </div>
  `,
})
export class SelectComponent {
  @Input() label = '';
  @Input() value = '';
  @Input() options: SelectOption[] = [];
  @Output() valueChange = new EventEmitter<string>();
}

@Component({
  selector: 'app-textarea',
  imports: [],
  template: `
    <div class="flex flex-col gap-1.5">
      @if (label) {
        <label class="text-sm font-medium text-muted">{{ label }}</label>
      }
      <textarea
        [placeholder]="placeholder"
        [rows]="rows"
        [value]="value"
        class="w-full bg-panel border border-border text-text rounded-lg px-3 py-2.5 text-sm placeholder:text-subtle focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition resize-none"
        (input)="valueChange.emit($any($event.target).value)"
      ></textarea>
    </div>
  `,
})
export class TextareaComponent {
  @Input() label = '';
  @Input() placeholder = '';
  @Input() value = '';
  @Input() rows = 4;
  @Output() valueChange = new EventEmitter<string>();
}

@Component({
  selector: 'app-badge',
  imports: [],
  template: `<span [class]="classes">{{ value }}</span>`,
})
export class BadgeComponent {
  @Input() type: 'order' | 'emergency' | 'priority' | 'user' | 'availability' | 'custom' = 'custom';
  @Input() value = '';
  @Input() extraClass = '';

  get classes(): string {
    const base = 'inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium';
    const order: Record<string, string> = {
      Pending: 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20',
      Processing: 'bg-blue-500/10 text-blue-400 border border-blue-500/20',
      Shipped: 'bg-purple-500/10 text-purple-400 border border-purple-500/20',
      Delivered: 'bg-success/10 text-success border border-success/20',
      Cancelled: 'bg-danger/10 text-danger border border-danger/20',
    };
    const emergency: Record<string, string> = {
      Pending: 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20',
      Accepted: 'bg-blue-500/10 text-blue-400 border border-blue-500/20',
      'On The Way': 'bg-purple-500/10 text-purple-400 border border-purple-500/20',
      Arrived: 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20',
      'In Service': 'bg-orange-500/10 text-orange-400 border border-orange-500/20',
      Completed: 'bg-success/10 text-success border border-success/20',
      Cancelled: 'bg-danger/10 text-danger border border-danger/20',
    };
    const priority: Record<string, string> = {
      Low: 'bg-slate-500/10 text-slate-400 border border-slate-500/20',
      Medium: 'bg-blue-500/10 text-blue-400 border border-blue-500/20',
      High: 'bg-orange-500/10 text-orange-400 border border-orange-500/20',
      Critical: 'bg-red-600/10 text-red-400 border border-red-600/20',
    };
    let color = 'bg-panel text-muted border border-border';
    if (this.type === 'order' && order[this.value]) color = order[this.value];
    else if (this.type === 'emergency' && emergency[this.value]) color = emergency[this.value];
    else if (this.type === 'priority' && priority[this.value]) color = priority[this.value];
    else if (this.type === 'user') {
      color =
        this.value === 'Active'
          ? 'bg-success/10 text-success border border-success/20'
          : 'bg-danger/10 text-danger border border-danger/20';
    } else if (this.type === 'availability') {
      color =
        this.value === 'Available'
          ? 'bg-success/10 text-success border border-success/20'
          : this.value === 'Busy'
            ? 'bg-orange-500/10 text-orange-400 border border-orange-500/20'
            : 'bg-subtle/20 text-subtle border border-subtle/20';
    }
    return `${base} ${color} ${this.extraClass}`;
  }
}

@Component({
  selector: 'app-modal',
  imports: [],
  template: `
    @if (open) {
      <div class="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div class="absolute inset-0 bg-black/70 backdrop-blur-sm" (click)="closed.emit()"></div>
        <div [class]="panelClass">
          <div class="flex items-center justify-between p-5 border-b border-border">
            <h3 class="font-display font-semibold text-lg text-text">{{ title }}</h3>
            <button
              type="button"
              class="text-muted hover:text-text w-8 h-8 flex items-center justify-center rounded-lg hover:bg-panel transition"
              (click)="closed.emit()"
            >
              <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div class="p-5">
            <ng-content />
          </div>
        </div>
      </div>
    }
  `,
})
export class ModalComponent {
  @Input() open = false;
  @Input() title = '';
  @Input() size: 'sm' | 'md' | 'lg' | 'xl' = 'md';
  @Output() closed = new EventEmitter<void>();

  get panelClass(): string {
    const sizes = { sm: 'max-w-sm', md: 'max-w-md', lg: 'max-w-lg', xl: 'max-w-2xl' };
    return `relative bg-surface border border-border rounded-2xl shadow-2xl w-full ${sizes[this.size]} max-h-[90vh] overflow-y-auto`;
  }
}

@Component({
  selector: 'app-confirm',
  imports: [ModalComponent, ButtonComponent],
  template: `
    <app-modal [open]="open" [title]="title" size="sm" (closed)="closed.emit()">
      <p class="text-muted text-sm mb-5">{{ message }}</p>
      <div class="flex gap-3 justify-end">
        <app-button variant="secondary" (clicked)="closed.emit()">Cancel</app-button>
        <app-button [variant]="danger ? 'danger' : 'primary'" (clicked)="onConfirm()">{{ confirmLabel }}</app-button>
      </div>
    </app-modal>
  `,
})
export class ConfirmComponent {
  @Input() open = false;
  @Input() title = '';
  @Input() message = '';
  @Input() confirmLabel = 'Confirm';
  @Input() danger = false;
  @Output() closed = new EventEmitter<void>();
  @Output() confirmed = new EventEmitter<void>();

  onConfirm(): void {
    this.confirmed.emit();
    this.closed.emit();
  }
}

@Component({
  selector: 'app-empty-state',
  imports: [],
  template: `
    <div class="flex flex-col items-center justify-center py-16 text-center">
      @if (hasIcon) {
        <div class="w-16 h-16 rounded-2xl bg-panel flex items-center justify-center mb-4 text-muted">
          <ng-content select="[icon]" />
        </div>
      }
      <h3 class="font-display font-semibold text-text text-lg mb-1">{{ title }}</h3>
      @if (message) {
        <p class="text-muted text-sm max-w-xs mb-4">{{ message }}</p>
      }
      <ng-content />
    </div>
  `,
})
export class EmptyStateComponent {
  @Input() title = '';
  @Input() message = '';
  @Input() hasIcon = true;
}

@Component({
  selector: 'app-stat-card',
  imports: [],
  template: `
    <div class="bg-surface border border-border rounded-xl p-5">
      <div class="flex items-start justify-between mb-4">
        <div [class]="'w-10 h-10 rounded-lg flex items-center justify-center ' + iconWrap">
          <ng-content />
        </div>
        @if (trend) {
          <span class="text-xs text-success font-medium">{{ trend }}</span>
        }
      </div>
      <div class="font-display font-bold text-3xl text-text mb-1">{{ value }}</div>
      <div class="text-sm text-muted">{{ label }}</div>
    </div>
  `,
})
export class StatCardComponent {
  @Input() label = '';
  @Input() value: string | number = '';
  @Input() trend = '';
  @Input() color: 'primary' | 'success' | 'info' | 'danger' | 'warning' = 'primary';

  get iconWrap(): string {
    const colors = {
      primary: 'text-primary bg-primary/10',
      success: 'text-success bg-success/10',
      info: 'text-info bg-info/10',
      danger: 'text-danger bg-danger/10',
      warning: 'text-warning bg-warning/10',
    };
    return colors[this.color];
  }
}

@Component({
  selector: 'app-search-bar',
  imports: [],
  template: `
    <div class="relative">
      <svg
        class="absolute left-3 top-1/2 -translate-y-1/2 text-subtle w-4 h-4"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        stroke-width="2"
      >
        <circle cx="11" cy="11" r="8" />
        <path stroke-linecap="round" d="m21 21-4.35-4.35" />
      </svg>
      <input
        [value]="value"
        [placeholder]="placeholder"
        class="w-full bg-panel border border-border text-text rounded-lg pl-9 pr-4 py-2.5 text-sm placeholder:text-subtle focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition"
        (input)="valueChange.emit($any($event.target).value)"
      />
    </div>
  `,
})
export class SearchBarComponent {
  @Input() value = '';
  @Input() placeholder = 'Search...';
  @Output() valueChange = new EventEmitter<string>();
}

@Component({
  selector: 'app-avatar',
  imports: [],
  template: `
    @if (src) {
      <img [src]="src" [alt]="name" [class]="sizeClass + ' rounded-full object-cover'" />
    } @else {
      <div [class]="sizeClass + ' rounded-full bg-primary/20 text-primary font-display font-bold flex items-center justify-center flex-shrink-0'">
        {{ initials }}
      </div>
    }
  `,
})
export class AvatarComponent {
  @Input() name = '';
  @Input() size: 'sm' | 'md' | 'lg' = 'md';
  @Input() src = '';

  get sizeClass(): string {
    return { sm: 'w-8 h-8 text-xs', md: 'w-10 h-10 text-sm', lg: 'w-14 h-14 text-lg' }[this.size];
  }

  get initials(): string {
    return this.name
      .split(' ')
      .map((w) => w[0] ?? '')
      .slice(0, 2)
      .join('')
      .toUpperCase();
  }
}

@Component({
  selector: 'app-stars',
  imports: [],
  template: `
    <div class="flex gap-0.5">
      @for (i of stars; track i) {
        <svg [class]="'w-4 h-4 ' + (i <= rounded ? 'text-primary' : 'text-subtle')" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      }
    </div>
  `,
})
export class StarsComponent {
  @Input() rating = 0;
  readonly stars = [1, 2, 3, 4, 5];
  get rounded(): number {
    return Math.round(this.rating);
  }
}

@Component({
  selector: 'app-tabs',
  imports: [],
  template: `
    <div class="flex gap-1 bg-panel rounded-lg p-1">
      @for (tab of tabs; track tab) {
        <button
          type="button"
          [class]="
            'flex-1 px-4 py-2 text-sm font-medium rounded-md transition cursor-pointer ' +
            (active === tab ? 'bg-surface text-text shadow' : 'text-muted hover:text-text')
          "
          (click)="activeChange.emit(tab)"
        >
          {{ tab }}
        </button>
      }
    </div>
  `,
})
export class TabsComponent {
  @Input() tabs: string[] = [];
  @Input() active = '';
  @Output() activeChange = new EventEmitter<string>();
}

@Component({
  selector: 'app-alert',
  imports: [],
  template: `<div [class]="'border rounded-lg p-3 text-sm ' + style">{{ message }}</div>`,
})
export class AlertComponent {
  @Input() type: 'success' | 'error' | 'info' | 'warning' = 'info';
  @Input() message = '';

  get style(): string {
    return {
      success: 'bg-success/10 border-success/30 text-success',
      error: 'bg-danger/10 border-danger/30 text-danger',
      info: 'bg-info/10 border-info/30 text-info',
      warning: 'bg-warning/10 border-warning/30 text-warning',
    }[this.type];
  }
}

export const UI_IMPORTS = [
  LogoComponent,
  ButtonComponent,
  InputComponent,
  SelectComponent,
  TextareaComponent,
  BadgeComponent,
  ModalComponent,
  ConfirmComponent,
  EmptyStateComponent,
  StatCardComponent,
  SearchBarComponent,
  AvatarComponent,
  StarsComponent,
  TabsComponent,
  AlertComponent,
  RouterLink,
];
