import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-ficha-matricula',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './ficha-matricula.html',
  styleUrls: ['./ficha-matricula.css']
})
export class FichaMatriculaComponent {

  form: FormGroup;
  dadosEnviados: {
    nome: string;
    email: string;
    telefones: Array<{ numero: string }>;
    idade: number;
    senha: string;
    confirmarSenha: string;
    genero: string;
    cidade: string;
    termos: boolean;
  } | null = null;

constructor(private fb: FormBuilder) {
  this.form = this.fb.group({
    nome: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    telefones: this.fb.array([this.criarTelefone()], Validators.required),
    idade: ['', [Validators.required, Validators.min(18)]],
    senha: ['', [Validators.required, Validators.minLength(6)]],
    confirmarSenha: ['', Validators.required],
    genero: ['', Validators.required],
    cidade: ['', Validators.required],
    termos: [false, Validators.requiredTrue]
  }, { validators: this.validarSenhas });
}

criarTelefone(): FormGroup {
  return this.fb.group({
    numero: ['', Validators.required]
  });
}

get telefones(): FormArray {
  return this.form.get('telefones') as FormArray;
}

adicionarTelefone() {
  this.telefones.push(this.criarTelefone());
}

removerTelefone(index: number) {
  this.telefones.removeAt(index);
}

validarSenhas(form: FormGroup) {
  const senha = form.get('senha')?.value;
  const confirmar = form.get('confirmarSenha')?.value;

  return senha === confirmar ? null : { senhasDiferentes: true };
}

enviar(modal?: HTMLDialogElement) {
  if (this.form.valid) {
    this.dadosEnviados = this.form.getRawValue();
    modal?.showModal();
    console.log(this.form.value);
  } else {
    this.form.markAllAsTouched();
  }
}

senhasIguais(): boolean {
  return !this.form.hasError('senhasDiferentes');
}
formatarTelefone(event: any, index: number) {
  let valor = event.target.value.replace(/\D/g, '');

  if (valor.length > 11) valor = valor.slice(0, 11);

  valor = valor.replace(/^(\d{2})(\d)/g, '($1) $2');
  valor = valor.replace(/(\d{5})(\d)/, '$1-$2');

  this.telefones.at(index).get('numero')?.setValue(valor, { emitEvent: false });
}
}