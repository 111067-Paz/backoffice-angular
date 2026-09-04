import { ChangeDetectionStrategy, Component, signal } from '@angular/core';

export interface TransactionLog {
  readonly id: string;
  readonly origin: string;
  readonly destination: string;
  readonly action: string;
  readonly status: 'Completado' | 'Reintentando';
  readonly timestamp: string;
  readonly latency: string;
}

@Component({
  selector: 'app-dashboard-consolidado',
  imports: [],
  templateUrl: './dashboard-consolidado.html',
  styleUrl: './dashboard-consolidado.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardConsolidado {
  readonly isSyncing = signal<boolean>(false);
  readonly syncMessage = signal<string>('');

  readonly kpis = signal([
    { title: 'Matrícula Activa', value: '12,480', delta: '+4.2% este mes', api: 'API: Matrícula', icon: 'group', color: 'primary' },
    { title: 'Desafíos Completados', value: '45,920', delta: '+12.8% vs ayer', api: 'API: Desafíos', icon: 'bolt', color: 'secondary' },
    { title: 'Prácticos Entregados', value: '8,340', delta: '98.1% a tiempo', api: 'API: Prácticos', icon: 'assignment', color: 'tertiary' },
    { title: 'Tasa Sincronización', value: '99.8%', delta: 'Gateway Óptimo', api: '6/6 Servicios', icon: 'dns', color: 'emerald' },
  ]);

  readonly transactions = signal<readonly TransactionLog[]>([
    { id: '#TRX-98421', origin: 'Matrícula', destination: 'Progreso/XP', action: 'Asignación de créditos iniciales', status: 'Completado', timestamp: '2024-05-24 14:22:01', latency: '42ms' },
    { id: '#TRX-98420', origin: 'Desafíos', destination: 'Banco', action: 'Validación de código fuente unitario', status: 'Completado', timestamp: '2024-05-24 14:21:55', latency: '118ms' },
    { id: '#TRX-98419', origin: 'Prácticos', destination: 'Notificaciones', action: 'Envío de alerta de entrega exitosa', status: 'Completado', timestamp: '2024-05-24 14:20:12', latency: '85ms' },
    { id: '#TRX-98418', origin: 'Banco', destination: 'Progreso/XP', action: 'Recompensas por resolución de test', status: 'Reintentando', timestamp: '2024-05-24 14:19:40', latency: '450ms' },
    { id: '#TRX-98417', origin: 'Matrícula', destination: 'Notificaciones', action: 'Aviso de inscripción a cátedra', status: 'Completado', timestamp: '2024-05-24 14:18:05', latency: '62ms' },
  ]);

  forceSync(): void {
    this.isSyncing.set(true);
    this.syncMessage.set('Sincronizando con clúster Kafka...');
    setTimeout(() => {
      this.isSyncing.set(false);
      this.syncMessage.set('Sincronización completada con 6 microservicios.');
      setTimeout(() => this.syncMessage.set(''), 3500);
    }, 1200);
  }
}
