class Aluno {
  #nota1;
  #nota2;
  #nota3;
  nome;
  media;
  estado;

  constructor(nome, nota1, nota2, nota3) {
    this.nome = nome;
    this.#nota1 = Number(nota1);
    this.#nota2 = Number(nota2);
    this.#nota3 = Number(nota3);
    this.gerarMedia();
    this.gerarEstado();
  }


  getNota1() {
    return this.#nota1;
  }

  getNota2() {
    return this.#nota2;
  }

  getNota3() {
    return this.#nota3;
  }

  
  setNota1(valor) {
    this.#nota1 = Number(valor);
    this.gerarMedia();
    this.gerarEstado();
  }

  setNota2(valor) {
    this.#nota2 = Number(valor);
    this.gerarMedia();
    this.gerarEstado();
  }

  setNota3(valor) {
    this.#nota3 = Number(valor);
    this.gerarMedia();
    this.gerarEstado();
  }


  setNotas(n1, n2, n3) {
    this.#nota1 = Number(n1);
    this.#nota2 = Number(n2);
    this.#nota3 = Number(n3);
    this.gerarMedia();
    this.gerarEstado();
  }

  gerarMedia() {
    this.media = (this.#nota1 + this.#nota2 + this.#nota3) / 3;
    return this.media;
  }

  gerarEstado() {
    if (this.media >= 6) {
      this.estado = 'Aprovado';
    } else if (this.media >= 3) {
      this.estado = 'Recuperação';
    } else {
      this.estado = 'Reprovado';
    }
    return this.estado;
  }
}