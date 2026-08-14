export class Usuario {
  id?: number;
  nome!: string
  cofre!: string;
  constructor(id?: number, nome?: string, cofre?: string) {
    if (id) this.id = id;
    if (nome) this.nome = nome;
    if (cofre) this.cofre = cofre;
  }

}
