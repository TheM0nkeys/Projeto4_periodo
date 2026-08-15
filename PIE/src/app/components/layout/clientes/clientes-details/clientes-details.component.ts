import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { MdbValidationModule } from 'mdb-angular-ui-kit/validation';
import { MdbRippleModule } from 'mdb-angular-ui-kit/ripple';

interface Cliente {
  id: number;
  nome: string;
  email: string;
  telefone: string;
}

@Component({
  selector: 'app-clientes-details',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink,
    MdbFormsModule,
    MdbValidationModule,
    MdbRippleModule
  ],
  templateUrl: './clientes-details.component.html',
  styleUrl: './clientes-details.component.scss'
})
export class ClientesDetailsComponent implements OnInit {

  private fb = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  clienteId: number | null = null;
  modoEdicao = false;

  clienteForm = this.fb.group({
    nome: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    telefone: ['', [Validators.required, Validators.minLength(8)]]
  });

  ngOnInit(): void {
    const idString = this.route.snapshot.paramMap.get('id');

    if (idString !== null) {
      this.clienteId = Number(idString);
      this.modoEdicao = true;
      this.carregarCliente(this.clienteId);
    }
  }

  private getClientes(): Cliente[] {
    const clientesSalvos = localStorage.getItem('clientes');

    if (clientesSalvos === null) {
      return [];
    }

    return JSON.parse(clientesSalvos);
  }

  private salvarClientes(clientes: Cliente[]): void {
    localStorage.setItem('clientes', JSON.stringify(clientes));
  }

  carregarCliente(id: number): void {
    const clientes = this.getClientes();
    let clienteEncontrado = null;

    for (let i = 0; i < clientes.length; i++) {
      if (clientes[i].id === id) {
        clienteEncontrado = clientes[i];
      }
    }

    if (clienteEncontrado === null) {
      this.router.navigate(['/dashboard/clientes']);
      return;
    }

    this.clienteForm.patchValue({
      nome: clienteEncontrado.nome,
      email: clienteEncontrado.email,
      telefone: clienteEncontrado.telefone
    });
  }

  salvar(): void {
    if (this.clienteForm.invalid) {
      this.clienteForm.markAllAsTouched();
      return;
    }

    const dadosFormulario = this.clienteForm.value;
    const clientes = this.getClientes();

    if (this.modoEdicao === true && this.clienteId !== null) {
      for (let i = 0; i < clientes.length; i++) {
        if (clientes[i].id === this.clienteId) {
          clientes[i].nome = dadosFormulario.nome || '';
          clientes[i].email = dadosFormulario.email || '';
          clientes[i].telefone = dadosFormulario.telefone || '';
        }
      }

      this.salvarClientes(clientes);
    } else {
      let novoId = 1;

      if (clientes.length > 0) {
        let maiorId = 0;

        for (let i = 0; i < clientes.length; i++) {
          if (clientes[i].id > maiorId) {
            maiorId = clientes[i].id;
          }
        }

        novoId = maiorId + 1;
      }

      const novoCliente: Cliente = {
        id: novoId,
        nome: dadosFormulario.nome || '',
        email: dadosFormulario.email || '',
        telefone: dadosFormulario.telefone || ''
      };

      clientes.push(novoCliente);
      this.salvarClientes(clientes);
    }

    this.router.navigate(['/dashboard/clientes']);
  }

  get nomeInvalido(): boolean {
    const control = this.clienteForm.controls.nome;
    return control.invalid && (control.touched || control.dirty);
  }

  get emailInvalido(): boolean {
    const control = this.clienteForm.controls.email;
    return control.invalid && (control.touched || control.dirty);
  }

  get telefoneInvalido(): boolean {
    const control = this.clienteForm.controls.telefone;
    return control.invalid && (control.touched || control.dirty);
  }

}
