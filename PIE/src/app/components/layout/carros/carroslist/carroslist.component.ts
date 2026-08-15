import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { Carro } from '../../../../models/carro';

@Component({
  selector: 'app-carroslist',
  standalone: true,
  imports: [CommonModule, FormsModule, MdbFormsModule, RouterLink],
  templateUrl: './carroslist.component.html',
  styleUrls: ['./carroslist.component.scss']
})
export class CarroslistComponent {
  elements: Carro[] = [
    { id: 1, marca: 'Toyota', modelo: 'Corolla', ano: 2022, placa: 'ABC-1234', selecionado: false },
    { id: 2, marca: 'Honda', modelo: 'Civic', ano: 2021, placa: 'XYZ-5678', selecionado: false },
    { id: 3, marca: 'Volkswagen', modelo: 'Polo', ano: 2023, placa: 'KLM-9012', selecionado: false },
    { id: 4, marca: 'Fiat', modelo: 'Argo', ano: 2020, placa: 'JKL-3456', selecionado: false },
    { id: 5, marca: 'Chevrolet', modelo: 'Onix', ano: 2023, placa: 'MNO-7890', selecionado: false },
  ];
  private router = inject(Router);
  colunaSelecionada: keyof Carro = 'modelo';
  busca: string = '';
  qtdPagina = 5;
  paginaAtual = 1;

  elementoSelecionado: Carro | null = null;

  get filteredElements(): Carro[] {
    if (!this.busca.trim()) {
      return this.elements;
    }

    const termo = this.busca.toLowerCase();

    return this.elements.filter(carro => {
      const valorColuna = carro[this.colunaSelecionada];
      if (valorColuna !== undefined && valorColuna !== null) {
        return valorColuna.toString().toLowerCase().includes(termo);
      }
      return false;
    });
  }

  get elementosPagina(): Carro[] {
    const comeco = (this.paginaAtual - 1) * this.qtdPagina;
    return this.filteredElements.slice(comeco, comeco + this.qtdPagina);
  }

  get paginasTudo(): number {
    return Math.ceil(this.filteredElements.length / this.qtdPagina) || 1;
  }

  selecionarColuna(coluna: keyof Carro): void {
    this.colunaSelecionada = coluna;
    this.paginaAtual = 1;
  }

  selecionarElemento(elemento: Carro): void {
    const jaSelecionado = elemento.selecionado;

    this.elements.forEach(item => item.selecionado = false);

    if (!jaSelecionado) {
      elemento.selecionado = true;
      this.elementoSelecionado = elemento;
    } else {
      this.elementoSelecionado = null;
    }
  }

  proximaPag(): void {
    if (this.paginaAtual < this.paginasTudo) this.paginaAtual++;
  }

  anteriorPag(): void {
    if (this.paginaAtual > 1) this.paginaAtual--;
  }

  criarBttn(): void
  {
    this.router.navigate(['/carros/new']);
  }
  editarBttn(carro:Carro):void
  {
    this.router.navigate(['/carros/edit', carro.id]);
  }
}