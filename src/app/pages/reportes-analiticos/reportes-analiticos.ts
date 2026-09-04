import { ChangeDetectionStrategy, Component, signal } from '@angular/core';

@Component({
  selector: 'app-reportes-analiticos',
  imports: [],
  templateUrl: './reportes-analiticos.html',
  styleUrl: './reportes-analiticos.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReportesAnaliticos {
  readonly selectedDept = signal<string>('Departamento de Sistemas');
  readonly selectedCarrera = signal<string>('Ingeniería en Sistemas de Información');
  readonly selectedCohorte = signal<string>('Cohorte 2023 (Ingreso)');

  readonly metrics = signal([
    { title: 'Tasa de Aprobación', value: '78.4%', delta: '+5.1% vs 2025', icon: 'trending_up', color: 'emerald' },
    { title: 'Engagement Semanal', value: '84.2%', delta: '+3.8% activo', icon: 'bolt', color: 'primary' },
    { title: 'Desafíos Entregados', value: '14,280', delta: '92% a término', icon: 'assignment_turned_in', color: 'secondary' },
    { title: 'Retención Global', value: '91.6%', delta: 'Baja deserción', icon: 'person_check', color: 'tertiary' },
  ]);

  readonly feedback = signal<string>('');

  generatePDF(): void {
    this.feedback.set('Generando reporte ejecutivo institucional en PDF...');
    setTimeout(() => {
      this.feedback.set('PDF institucional generado y listo para descarga.');
      setTimeout(() => this.feedback.set(''), 3000);
    }, 1200);
  }
}
