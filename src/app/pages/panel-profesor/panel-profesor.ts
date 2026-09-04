import { ChangeDetectionStrategy, Component, signal } from '@angular/core';

export interface StudentRow {
  readonly legajo: string;
  readonly name: string;
  readonly desafios: string;
  readonly vidas: number;
  readonly xp: number;
  readonly status: 'Ritmo Óptimo' | 'Regular' | 'En Riesgo';
}

@Component({
  selector: 'app-panel-profesor',
  imports: [],
  templateUrl: './panel-profesor.html',
  styleUrl: './panel-profesor.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PanelProfesor {
  readonly selectedCohort = signal<string>('Programación III - Comisión 2W2 (2026)');
  readonly toastMessage = signal<string>('');

  readonly students = signal<readonly StudentRow[]>([
    { legajo: '100001', name: 'Estudiante 01', desafios: '18/18', vidas: 3, xp: 12450, status: 'Ritmo Óptimo' },
    { legajo: '100002', name: 'Estudiante 02', desafios: '14/18', vidas: 2, xp: 8900, status: 'Regular' },
    { legajo: '100003', name: 'Estudiante 03', desafios: '4/18', vidas: 0, xp: 1200, status: 'En Riesgo' },
    { legajo: '100004', name: 'Estudiante 04', desafios: '16/18', vidas: 3, xp: 10800, status: 'Ritmo Óptimo' },
    { legajo: '100005', name: 'Estudiante 05', desafios: '6/18', vidas: 1, xp: 2400, status: 'En Riesgo' },
  ]);

  triggerAlert(student: StudentRow): void {
    this.toastMessage.set(`Alerta académica enviada a ${student.name} vía Autogestión UTN.`);
    setTimeout(() => this.toastMessage.set(''), 3500);
  }

  exportCSV(): void {
    this.toastMessage.set('Generando acta oficial de cohorte en CSV (RF-RNK-13)...');
    setTimeout(() => {
      const csvContent = "data:text/csv;charset=utf-8,Legajo,Alumno,Desafios,Vidas,XP,Estado\n" +
        this.students().map(s => `${s.legajo},${s.name},${s.desafios},${s.vidas},${s.xp},${s.status}`).join("\n");
      const encodedUri = encodeURI(csvContent);
      const link = document.createElement("a");
      link.setAttribute("href", encodedUri);
      link.setAttribute("download", "Acta_Comision_2W2_RF-RNK-13.csv");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      this.toastMessage.set('Descarga de acta finalizada con éxito.');
      setTimeout(() => this.toastMessage.set(''), 3000);
    }, 600);
  }
}
