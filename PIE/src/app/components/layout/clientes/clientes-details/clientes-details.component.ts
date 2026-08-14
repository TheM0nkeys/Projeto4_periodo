import { Component, OnInit, inject } from '@angular/core';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import {
  ActivatedRoute,
  Router,
  RouterLink
} from '@angular/router';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';

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
    ReactiveFormsModule,
    RouterLink,
    MdbFormsModule
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

  clienteForm = this.fb.nonNullable.group({

    nome: [
      '',
      [
        Validators.required,
        Validators.minLength(3)
      ]
    ],

    email: [
      '',
      [
        Validators.required,
        Validators.email
      ]
    ],

    telefone: [
      '',
      [
        Validators.required,
        Validators.minLength(8)
      ]
    ]

  });

  ngOnInit(): void {

    const id = this.route.snapshot.paramMap.get('id');

    if (id) {

      this.clienteId = Number(id);
      this.modoEdicao = true;

      this.carregarCliente(this.clienteId);

    }

  }

  private getClientes(): Cliente[] {

    const clientes = localStorage.getItem('clientes');

    if (!clientes) {

      return [];

    }

    return JSON.parse(clientes);

  }

  private salvarClientes(clientes: Cliente[]): void {

    localStorage.setItem(
      'clientes',
      JSON.stringify(clientes)
    );

  }

  carregarCliente(id: number): void {

    const clientes = this.getClientes();

    const cliente = clientes.find(
      c => c.id === id
    );

    if (!cliente) {

      this.router.navigate([
        '/dashboard/clientes'
      ]);

      return;

    }

    this.clienteForm.patchValue({

      nome: cliente.nome,
      email: cliente.email,
      telefone: cliente.telefone

    });

  }

  salvar(): void {

    if (this.clienteForm.invalid) {

      this.clienteForm.markAllAsTouched();

      return;

    }

    const dados = this.clienteForm.getRawValue();

    const clientes = this.getClientes();

    if (
      this.modoEdicao &&
      this.clienteId !== null
    ) {

      const index = clientes.findIndex(
        cliente => cliente.id === this.clienteId
      );

      if (index !== -1) {

        clientes[index] = {

          id: this.clienteId,
          ...dados

        };

        this.salvarClientes(clientes);

      }

    } else {

      const novoId = clientes.length > 0
        ? Math.max(
            ...clientes.map(
              cliente => cliente.id
            )
          ) + 1
        : 1;

      const novoCliente: Cliente = {

        id: novoId,
        ...dados

      };

      clientes.push(novoCliente);

      this.salvarClientes(clientes);

    }

    this.router.navigate([
      '/dashboard/clientes'
    ]);

  }

  get nomeInvalido(): boolean {

    const control =
      this.clienteForm.controls.nome;

    return control.invalid && control.touched;

  }

  get emailInvalido(): boolean {

    const control =
      this.clienteForm.controls.email;

    return control.invalid && control.touched;

  }

  get telefoneInvalido(): boolean {

    const control =
      this.clienteForm.controls.telefone;

    return control.invalid && control.touched;

  }

}
