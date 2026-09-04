import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';

export interface CatedraItem {
  readonly code: string;
  readonly name: string;
  readonly dept: string;
  readonly titular: string;
  readonly comisiones: number;
  readonly matricula: number;
  readonly status: 'Activa' | 'En Auditoría';
}

@Component({
  selector: 'app-gestion-catedras',
  imports: [],
  templateUrl: './gestion-catedras.html',
  styleUrl: './gestion-catedras.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GestionCatedras {
  readonly searchTerm = signal<string>('');
  readonly selectedDept = signal<string>('Todos');

  readonly stats = signal([
    { title: 'Total Cátedras', value: '142', sub: '+4 este ciclo', icon: 'school', color: 'primary' },
    { title: 'Profesores Activos', value: '388', sub: 'Titulares y Auxiliares', icon: 'group', color: 'secondary' },
    { title: 'Microservicios API', value: '6 / 6', sub: 'Operativos', icon: 'hub', color: 'tertiary' },
    { title: 'Auditoría Hoy', value: '1.429', sub: 'Req. validados', icon: 'shield_person', color: 'error' },
  ]);

  readonly catedras = signal<readonly CatedraItem[]>([
    { code: 'ISI-301', name: 'Programación III', dept: 'Sistemas', titular: 'Ing. Gómez Alberto', comisiones: 4, matricula: 168, status: 'Activa' },
    { code: 'ISI-302', name: 'Sistemas Operativos', dept: 'Sistemas', titular: 'Dra. Martínez Lucía', comisiones: 3, matricula: 135, status: 'Activa' },
    { code: 'ISI-303', name: 'Bases de Datos', dept: 'Sistemas', titular: 'Lic. Fernández Carlos', comisiones: 4, matricula: 180, status: 'Activa' },
    { code: 'IEL-204', name: 'Electrónica Aplicada I', dept: 'Electrónica', titular: 'Ing. Rossi Marcelo', comisiones: 2, matricula: 78, status: 'En Auditoría' },
    { code: 'IIN-305', name: 'Investigación Operativa', dept: 'Industrial', titular: 'Mg. Cabrera Paula', comisiones: 3, matricula: 110, status: 'Activa' },
    { code: 'IME-201', name: 'Mecánica de Fluidos', dept: 'Mecánica', titular: 'Dr. Vega Fernando', comisiones: 2, matricula: 64, status: 'Activa' },
  ]);

  readonly filteredCatedras = computed(() => {
    const term = this.searchTerm().toLowerCase().trim();
    const dept = this.selectedDept();

    return this.catedras().filter((c) => {
      const matchesTerm =
        !term ||
        c.name.toLowerCase().includes(term) ||
        c.code.toLowerCase().includes(term) ||
        c.titular.toLowerCase().includes(term);
      const matchesDept = dept === 'Todos' || c.dept === dept;
      return matchesTerm && matchesDept;
    });
  });

  onSearch(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.searchTerm.set(target.value);
  }

  onSelectDept(event: Event): void {
    const target = event.target as HTMLSelectElement;
    this.selectedDept.set(target.value);
  }
}
