import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// Imports do MDB para o Form Input
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';

// Seu modelo de Carro
import { Carro } from '../../../../models/carro';

@Component({
  selector: 'app-carroslist',
  standalone: true,
  imports: [CommonModule, FormsModule, MdbFormsModule],
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

  // Coluna atualmente selecionada para busca (padrão: 'modelo')
  colunaSelecionada: keyof Carro = 'modelo';

  // Texto da pesquisa
  busca: string = '';

  qtdPagina = 5;
  paginaAtual = 1;

  // 1. Filtra a lista inteira baseando-se SOMENTE na coluna selecionada
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

  toggleTudo(event: Event): void {
    const isChecked = (event.target as HTMLInputElement).checked;
    this.elementosPagina.forEach(el => el.selecionado = isChecked);
  }

  selecionaTudo(): boolean {
    return this.elementosPagina.length > 0 && this.elementosPagina.every(elemento => elemento.selecionado);
  }

  proximaPag(): void {
    if (this.paginaAtual < this.paginasTudo) this.paginaAtual++;
  }

  anteriorPag(): void {
    if (this.paginaAtual > 1) this.paginaAtual--;
  }
}
