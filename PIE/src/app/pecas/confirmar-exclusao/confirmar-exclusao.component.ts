import { Component } from '@angular/core';

import {
  MdbModalRef
} from 'mdb-angular-ui-kit/modal';


@Component({
  selector: 'app-confirmar-exclusao',
  standalone: true,
  templateUrl: './confirmar-exclusao.component.html',
  styleUrl: './confirmar-exclusao.component.scss'
})
export class ConfirmarExclusaoComponent {

  nomePeca: string = '';


  constructor(
    public modalRef:
      MdbModalRef<ConfirmarExclusaoComponent>
  ) {}


  cancelar(): void {

    this.modalRef.close(false);

  }


  confirmar(): void {

    this.modalRef.close(true);

  }

}