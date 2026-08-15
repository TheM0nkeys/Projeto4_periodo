import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import {
  MdbFormsModule
} from 'mdb-angular-ui-kit/forms';

import {
  MdbModalRef
} from 'mdb-angular-ui-kit/modal';


@Component({
  selector: 'app-editar-peca',
  standalone: true,

  imports: [
    FormsModule,
    MdbFormsModule
  ],

  templateUrl: './editar-peca.component.html',
  styleUrl: './editar-peca.component.scss'
})
export class EditarPecaComponent {

  peca = {
    id: 0,
    nome: '',
    codigo: '',
    categoria: '',
    fabricante: '',
    preco: 0,
    quantidade: 0
  };


  constructor(
    public modalRef:
      MdbModalRef<EditarPecaComponent>
  ) {}


  cancelar(): void {

    this.modalRef.close(null);

  }


  atualizar(): void {

    if (
      !this.peca.nome.trim() ||
      !this.peca.codigo.trim() ||
      !this.peca.categoria
    ) {
      return;
    }


    this.modalRef.close({
      ...this.peca
    });

  }

}