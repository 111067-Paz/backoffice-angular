import { ChangeDetectionStrategy, Component, signal } from '@angular/core';

export interface ProviderItem {
  readonly id: string;
  readonly name: string;
  readonly tier: string;
  readonly latency: string;
  readonly status: 'Conectado' | 'En Calibración';
  readonly models: readonly string[];
}

@Component({
  selector: 'app-gobernanza-llm',
  imports: [],
  templateUrl: './gobernanza-llm.html',
  styleUrl: './gobernanza-llm.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GobernanzaLlm {
  readonly isEvaluating = signal<boolean>(false);
  readonly feedback = signal<string>('');

  readonly providers = signal<readonly ProviderItem[]>([
    { id: 'anthropic', name: 'Anthropic Claude API', tier: 'Tier 4 Enterprise', latency: '142ms', status: 'Conectado', models: ['claude-3-7-sonnet', 'claude-3-5-haiku'] },
    { id: 'openai', name: 'OpenAI Enterprise Gateway', tier: 'Tier 5 Institutional', latency: '168ms', status: 'Conectado', models: ['gpt-4o', 'gpt-4o-mini'] },
    { id: 'ollama', name: 'FRC On-Premises Ollama', tier: 'Clúster Privado GPU', latency: '45ms', status: 'Conectado', models: ['deepseek-coder-v2', 'qwen2.5-coder'] },
  ]);

  runCalibration(): void {
    this.isEvaluating.set(true);
    this.feedback.set('Ejecutando suite de calibración Golden Set (100 ejercicios de control)...');
    setTimeout(() => {
      this.isEvaluating.set(false);
      this.feedback.set('Calibración completada: Desvío promedio +1.8 pts (Dentro del límite normativo PAR-14 < 5.0 pts).');
      setTimeout(() => this.feedback.set(''), 4500);
    }, 1500);
  }
}
