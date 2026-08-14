import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

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
    RouterLink
  ],

  templateUrl: './clientes-list.component.html',
  styleUrl: './clientes-list.component.scss'
})
export class ClientesListComponent implements OnInit {

  // Lista de clientes
  clientes: Cliente[] = [];

  // Página atual
  paginaAtual = 1;

  // Quantidade de clientes por página
  itensPorPagina = 5;


  // Executado quando o componente é carregado
  ngOnInit(): void {

    this.carregarClientes();

  }


  // Busca os clientes salvos no localStorage
  carregarClientes(): void {

    const clientesSalvos =
      localStorage.getItem('clientes');

    if (clientesSalvos) {

      this.clientes =
        JSON.parse(clientesSalvos);

    } else {

      this.clientes = [];

    }

  }


  // Retorna somente os clientes da página atual
  get clientesPagina(): Cliente[] {

    const inicio =
      (this.paginaAtual - 1)
      * this.itensPorPagina;

    const fim =
      inicio + this.itensPorPagina;

    return this.clientes.slice(
      inicio,
      fim
    );

  }


  // Calcula a quantidade total de páginas
  get totalPaginas(): number {

    const total =
      Math.ceil(
        this.clientes.length
        / this.itensPorPagina
      );

    // Evita mostrar "Página 1 de 0"
    return total > 0 ? total : 1;

  }


  // Vai para a próxima página
  proximaPagina(): void {

    if (
      this.paginaAtual <
      this.totalPaginas
    ) {

      this.paginaAtual++;

    }

  }


  // Volta para a página anterior
  paginaAnterior(): void {

    if (
      this.paginaAtual > 1
    ) {

      this.paginaAtual--;

    }

  }


  // Exclui um cliente
  excluir(id: number): void {

    const confirmar =
      confirm(
        'Deseja excluir este cliente?'
      );

    // Se o usuário cancelar
    if (!confirmar) {

      return;

    }


    // Remove o cliente pelo ID
    this.clientes =
      this.clientes.filter(
        cliente =>
          cliente.id !== id
      );


    // Atualiza o localStorage
    localStorage.setItem(
      'clientes',
      JSON.stringify(this.clientes)
    );


    // Recarrega os clientes
    this.carregarClientes();


    // Se a página atual ficou maior
    // que o número de páginas existentes,
    // volta para a última página.
    if (
      this.paginaAtual >
      this.totalPaginas
    ) {

      this.paginaAtual =
        this.totalPaginas;

    }

  }

}
