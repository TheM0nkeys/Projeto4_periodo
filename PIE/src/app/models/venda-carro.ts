import { Carro } from "./carro";
import { Cliente } from "./cliente";

export class vendaCarro{
  id!: number;
carro!: Carro;
cliente!: Cliente;
valor!: number;
dataVenda!: string;
formaPagamento!: string;

  constructor(
      id: number,
      carro: Carro,
      cliente: string,
      valor: number,
      dataVenda: string,
      formaPagamento: string
  ){
        this.id = id;
      this.carro = carro;
      this.cliente = cliente;
      this.valor = valor;
      this.dataVenda = dataVenda;
      this.formaPagamento = formaPagamento;
  }

}

