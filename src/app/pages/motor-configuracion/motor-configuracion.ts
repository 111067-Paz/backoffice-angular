import { ChangeDetectionStrategy, Component, signal } from '@angular/core';

@Component({
  selector: 'app-motor-configuracion',
  imports: [],
  templateUrl: './motor-configuracion.html',
  styleUrl: './motor-configuracion.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MotorConfiguracion {
  readonly feedback = signal<string>('');

  readonly summaryCards = signal([
    { title: 'Total Parámetros', value: '24', sub: '100% Sincronizados', icon: 'tune' },
    { title: 'Modificados Hoy', value: '3', sub: 'Pendiente commit', icon: 'history' },
    { title: 'Categorías Activas', value: '6', sub: 'XP, Límites, Vidas...', icon: 'category' },
    { title: 'Ambiente Activo', value: 'PRODUCCIÓN', sub: 'Clúster FRC-Mendoza', icon: 'dns' },
  ]);

  exportAudit(): void {
    this.feedback.set('Descargando archivo JSON de auditoría de configuración global...');
    setTimeout(() => {
      this.feedback.set('Auditoría exportada exitosamente.');
      setTimeout(() => this.feedback.set(''), 3000);
    }, 1000);
  }
}
