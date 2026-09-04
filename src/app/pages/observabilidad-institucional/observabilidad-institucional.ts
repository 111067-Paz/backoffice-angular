import { ChangeDetectionStrategy, Component, signal } from '@angular/core';

@Component({
  selector: 'app-observabilidad-institucional',
  imports: [],
  templateUrl: './observabilidad-institucional.html',
  styleUrl: './observabilidad-institucional.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ObservabilidadInstitucional {
  readonly isSyncing = signal<boolean>(false);
  readonly syncMessage = signal<string>('');

  readonly metrics = signal([
    { code: 'KPI-01', title: 'CSAT Plataforma Global', value: '86.4%', delta: '+2.1%', status: 'Óptimo', desc: 'Satisfacción estudiantil agregada' },
    { code: 'KPI-02', title: 'Latencia p99 API Gateway', value: '148ms', delta: '-12ms', status: 'Estable', desc: 'Dentro del SLA institucional < 250ms' },
    { code: 'KPI-03', title: 'Circuit Breakers Activos', value: '0 / 6', delta: '0%', status: 'Saludable', desc: 'Ningún servicio en degraded mode' },
    { code: 'KPI-04', title: 'Throughput Kafka Event Bus', value: '1,420 ev/s', delta: '+8.4%', status: 'Pico Activo', desc: 'Consumo sostenido sin lag' },
  ]);

  readonly kafkaTopics = signal([
    { topic: 'frc.gamification.xp-events', partitions: 12, replication: 3, lag: 0, status: 'Healthy' },
    { topic: 'frc.academic.submissions', partitions: 8, replication: 3, lag: 2, status: 'Healthy' },
    { topic: 'frc.global-config.changed', partitions: 4, replication: 3, lag: 0, status: 'Synced' },
    { topic: 'frc.notifications.broadcast', partitions: 6, replication: 3, lag: 0, status: 'Healthy' },
  ]);

  triggerKafkaSync(): void {
    this.isSyncing.set(true);
    setTimeout(() => {
      this.isSyncing.set(false);
      this.syncMessage.set('Clúster Kafka FRC re-calibrado con éxito. Lag: 0 ms.');
      setTimeout(() => this.syncMessage.set(''), 4000);
    }, 1000);
  }
}
