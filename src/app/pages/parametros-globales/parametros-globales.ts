import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';

export interface ParamItem {
  readonly code: string;
  readonly name: string;
  readonly category: string;
  readonly value: string;
  readonly type: 'Integer' | 'Float' | 'Boolean' | 'String';
  readonly author: string;
  readonly status: 'Vigente' | 'Modificado';
}

@Component({
  selector: 'app-parametros-globales',
  imports: [],
  templateUrl: './parametros-globales.html',
  styleUrl: './parametros-globales.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ParametrosGlobales {
  readonly searchTerm = signal<string>('');
  readonly selectedCategory = signal<string>('Todas');
  readonly selectedParamForEdit = signal<ParamItem | null>(null);
  readonly toastMessage = signal<string>('');

  readonly params = signal<readonly ParamItem[]>([
    { code: 'PAR-01', name: 'XP Base por desafío (B/M/A)', category: 'XP', value: '100 / 250 / 500 XP', type: 'String', author: 'admin.gomez', status: 'Vigente' },
    { code: 'PAR-02', name: 'Límite de vidas por alumno', category: 'Vidas', value: '3', type: 'Integer', author: 'admin.gomez', status: 'Vigente' },
    { code: 'PAR-03', name: 'Multiplicador XP por entrega a tiempo', category: 'XP', value: '1.25', type: 'Float', author: 'm.castro', status: 'Modificado' },
    { code: 'PAR-04', name: 'Penalización por entrega tardía (horas)', category: 'Penalizaciones', value: '24', type: 'Integer', author: 'admin.gomez', status: 'Vigente' },
    { code: 'PAR-05', name: 'Tiempo de regeneración de vidas (horas)', category: 'Vidas', value: '12', type: 'Integer', author: 'admin.gomez', status: 'Vigente' },
    { code: 'PAR-06', name: 'Bonus racha perfecta (días)', category: 'Rachas', value: '7', type: 'Integer', author: 'm.castro', status: 'Vigente' },
    { code: 'PAR-14', name: 'Umbral máximo de desvío pedagógico Golden Set', category: 'Gobernanza', value: '5.0 pts', type: 'Float', author: 'admin.docente', status: 'Vigente' },
  ]);

  readonly filteredParams = computed(() => {
    const term = this.searchTerm().toLowerCase().trim();
    const cat = this.selectedCategory();

    return this.params().filter((p) => {
      const matchesTerm =
        !term ||
        p.code.toLowerCase().includes(term) ||
        p.name.toLowerCase().includes(term);
      const matchesCat = cat === 'Todas' || p.category === cat;
      return matchesTerm && matchesCat;
    });
  });

  openEditModal(param: ParamItem): void {
    this.selectedParamForEdit.set(param);
  }

  closeEditModal(): void {
    this.selectedParamForEdit.set(null);
  }

  saveParam(newValue: string): void {
    const current = this.selectedParamForEdit();
    if (!current) return;

    this.params.update((list) =>
      list.map((p) => (p.code === current.code ? { ...p, value: newValue, status: 'Modificado' } : p))
    );
    this.closeEditModal();
    this.toastMessage.set(`Parámetro ${current.code} actualizado y emitido a Kafka clúster.`);
    setTimeout(() => this.toastMessage.set(''), 4000);
  }

  onSearch(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.searchTerm.set(target.value);
  }

  onSelectCategory(event: Event): void {
    const target = event.target as HTMLSelectElement;
    this.selectedCategory.set(target.value);
  }
}
