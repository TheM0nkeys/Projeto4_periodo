import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import {
  MdbModalModule,
  MdbModalRef,
  MdbModalService
} from 'mdb-angular-ui-kit/modal';

import {
  ConfirmarExclusaoComponent
} from './confirmar-exclusao/confirmar-exclusao.component';

import {
  EditarPecaComponent
} from './editar-peca/editar-peca.component';


interface Peca {
  id: number;
  nome: string;
  codigo: string;
  categoria: string;
  fabricante: string;
  preco: number;
  quantidade: number;
}


@Component({
  selector: 'app-pecas',
  standalone: true,

  imports: [
    CommonModule,
    FormsModule,
    MdbModalModule
  ],

  templateUrl: './pecas.component.html',
  styleUrl: './pecas.component.scss'
})
export class PecasComponent {

  modalRef:
    MdbModalRef<ConfirmarExclusaoComponent> | null = null;


  mensagemSucesso: string = '';

  termoBusca: string = '';

  categoriaSelecionada: string = '';


  novaPeca = {
    nome: '',
    codigo: '',
    categoria: '',
    fabricante: '',
    preco: 0,
    quantidade: 0
  };


  pecas: Peca[] = [

    {
      id: 1,
      nome: 'Pastilha de Freio',
      codigo: 'PF-001',
      categoria: 'Freios',
      fabricante: 'Bosch',
      preco: 89.90,
      quantidade: 20
    },

    {
      id: 2,
      nome: 'Filtro de Óleo',
      codigo: 'FO-002',
      categoria: 'Motor',
      fabricante: 'Mann Filter',
      preco: 39.90,
      quantidade: 8
    },

    {
      id: 3,
      nome: 'Amortecedor Dianteiro',
      codigo: 'AM-003',
      categoria: 'Suspensão',
      fabricante: 'Monroe',
      preco: 279.90,
      quantidade: 4
    }

  ];


  constructor(
    private modalService: MdbModalService
  ) {}


  get pecasFiltradas(): Peca[] {

    return this.pecas.filter(peca => {

      const busca = this.termoBusca
        .toLowerCase()
        .trim();


      const encontrouBusca =
        peca.nome.toLowerCase().includes(busca) ||
        peca.codigo.toLowerCase().includes(busca);


      const encontrouCategoria =
        this.categoriaSelecionada === '' ||
        peca.categoria === this.categoriaSelecionada;


      return encontrouBusca && encontrouCategoria;

    });

  }


  get totalPecas(): number {

    return this.pecas.length;

  }


  get totalUnidades(): number {

    return this.pecas.reduce(
      (total, peca) => total + peca.quantidade,
      0
    );

  }


  get estoqueBaixo(): number {

    return this.pecas.filter(
      peca => peca.quantidade <= 5
    ).length;

  }


  cadastrar(): void {

    if (
      !this.novaPeca.nome.trim() ||
      !this.novaPeca.codigo.trim() ||
      !this.novaPeca.categoria
    ) {

      alert(
        'Preencha nome, código e categoria.'
      );

      return;
    }


    const id = this.pecas.length > 0
      ? Math.max(
          ...this.pecas.map(peca => peca.id)
        ) + 1
      : 1;


    const peca: Peca = {

      id: id,

      nome: this.novaPeca.nome.trim(),

      codigo: this.novaPeca.codigo.trim(),

      categoria: this.novaPeca.categoria,

      fabricante: this.novaPeca.fabricante.trim(),

      preco: Number(this.novaPeca.preco),

      quantidade: Number(this.novaPeca.quantidade)

    };


    this.pecas = [
      ...this.pecas,
      peca
    ];


    this.limparFormulario();

  }


  limparFormulario(): void {

    this.novaPeca = {
      nome: '',
      codigo: '',
      categoria: '',
      fabricante: '',
      preco: 0,
      quantidade: 0
    };

  }


  editar(peca: Peca): void {

    const modalEditar = this.modalService.open(
      EditarPecaComponent,
      {
        data: {

          peca: {
            ...peca
          }

        }
      }
    );


    modalEditar.onClose.subscribe(
      (resultado) => {

        const pecaAtualizada =
          resultado as Peca | null;


        if (!pecaAtualizada) {
          return;
        }


        this.pecas = this.pecas.map(
          item => {

            if (
              item.id === pecaAtualizada.id
            ) {

              return pecaAtualizada;

            }

            return item;

          }
        );


        this.mostrarSucesso(
          `A peça "${pecaAtualizada.nome}" foi atualizada com sucesso!`
        );

      }
    );

  }


  excluir(id: number): void {

    const peca = this.pecas.find(
      peca => peca.id === id
    );


    if (!peca) {
      return;
    }


    const modal = this.modalService.open(
      ConfirmarExclusaoComponent,
      {
        data: {
          nomePeca: peca.nome
        }
      }
    );


    this.modalRef = modal;


    modal.onClose.subscribe(
      (confirmado: boolean) => {

        if (confirmado !== true) {
          return;
        }


        this.pecas = this.pecas.filter(
          item => item.id !== id
        );


        this.mostrarSucesso(
          `A peça "${peca.nome}" foi apagada com sucesso!`
        );

      }
    );

  }


  mostrarSucesso(mensagem: string): void {

    this.mensagemSucesso = mensagem;


    setTimeout(() => {

      this.mensagemSucesso = '';

    }, 10000);

  }

}