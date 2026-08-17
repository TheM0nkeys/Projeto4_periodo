import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MdbRippleModule } from 'mdb-angular-ui-kit/ripple';

interface Cliente {
  id: number;
  nome: string;
  email: string;
  telefone: string;
}

@Component({
  selector: 'app-clientes-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    MdbRippleModule
  ],
  templateUrl: './clientes-list.component.html',
  styleUrl: './clientes-list.component.scss'
})
export class ClientesListComponent implements OnInit {

  clientes: Cliente[] = [];
  paginaAtual = 1;
  itensPorPagina = 5;

  ngOnInit(): void {
    this.carregarClientes();
  }

  carregarClientes(): void {
    const clientesSalvos = localStorage.getItem('clientes');

    if (clientesSalvos !== null) {
      this.clientes = JSON.parse(clientesSalvos);
    } else {
      this.clientes = [];
    }
  }

  get clientesPagina(): Cliente[] {
    const inicio = (this.paginaAtual - 1) * this.itensPorPagina;
    const fim = inicio + this.itensPorPagina;
    const resultado: Cliente[] = [];

    for (let i = inicio; i < fim && i < this.clientes.length; i++) {
      resultado.push(this.clientes[i]);
    }

    return resultado;
  }

  get totalPaginas(): number {
    const total = Math.ceil(this.clientes.length / this.itensPorPagina);
    return total > 0 ? total : 1;
  }

  proximaPagina(): void {
    if (this.paginaAtual < this.totalPaginas) {
      this.paginaAtual++;
    }
  }

  paginaAnterior(): void {
    if (this.paginaAtual > 1) {
      this.paginaAtual--;
    }
  }

  excluir(id: number): void {
    const confirmar = confirm('Deseja excluir este cliente?');

    if (confirmar === false) {
      return;
    }

    const novaLista: Cliente[] = [];

    for (let i = 0; i < this.clientes.length; i++) {
      if (this.clientes[i].id !== id) {
        novaLista.push(this.clientes[i]);
      }
    }

    this.clientes = novaLista;
    localStorage.setItem('clientes', JSON.stringify(this.clientes));
    this.carregarClientes();

    if (this.paginaAtual > this.totalPaginas) {
      this.paginaAtual = this.totalPaginas;
    }
  }

}
