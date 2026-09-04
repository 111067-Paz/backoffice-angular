import { ChangeDetectionStrategy, Component, signal } from '@angular/core';

export interface ServiceHealth {
  readonly name: string;
  readonly port: number;
  readonly latency: string;
  readonly uptime: string;
  readonly errorRate: string;
  readonly status: 'Saludable' | 'Degradado';
}

@Component({
  selector: 'app-salud-trazabilidad',
  imports: [],
  templateUrl: './salud-trazabilidad.html',
  styleUrl: './salud-trazabilidad.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SaludTrazabilidad {
  readonly isSyncing = signal<boolean>(false);
  readonly feedback = signal<string>('');

  readonly stats = signal([
    { title: 'Salud Global del Sistema', value: '99.98%', sub: 'Uptime últimas 24h', icon: 'verified', color: 'emerald' },
    { title: 'Latencia Promedio', value: '34.2 ms', sub: '-4.1ms vs ayer', icon: 'speed', color: 'primary' },
    { title: 'Transacciones Cross-Service', value: '1.42M', sub: 'Procesadas sin error', icon: 'hub', color: 'secondary' },
    { title: 'Circuit Breakers', value: '0 Disparados', sub: 'Gateway Óptimo', icon: 'bolt', color: 'amber' },
  ]);

  readonly microservices = signal<readonly ServiceHealth[]>([
    { name: 'Tema 02 • Matrícula y Usuarios', port: 8081, latency: '28ms', uptime: '99.99%', errorRate: '0.01%', status: 'Saludable' },
    { name: 'Tema 03 • Desafíos y Ejercitaciones', port: 8082, latency: '35ms', uptime: '99.97%', errorRate: '0.02%', status: 'Saludable' },
    { name: 'Tema 04 • Prácticos y Evaluaciones', port: 8083, latency: '42ms', uptime: '99.95%', errorRate: '0.03%', status: 'Saludable' },
    { name: 'Tema 05 • Banco y Monedas', port: 8084, latency: '24ms', uptime: '100%', errorRate: '0.00%', status: 'Saludable' },
    { name: 'Tema 06 • Progreso y XP', port: 8085, latency: '31ms', uptime: '99.98%', errorRate: '0.01%', status: 'Saludable' },
    { name: 'Tema 10 • Notificaciones Push', port: 8086, latency: '19ms', uptime: '99.99%', errorRate: '0.00%', status: 'Saludable' },
  ]);

  syncCaches(): void {
    this.isSyncing.set(true);
    this.feedback.set('Purgando y sincronizando cachés L1 Redis y Gateway...');
    setTimeout(() => {
      this.isSyncing.set(false);
      this.feedback.set('Cachés sincronizados con éxito. Latencia global optimizada.');
      setTimeout(() => this.feedback.set(''), 3500);
    }, 1000);
  }
}
