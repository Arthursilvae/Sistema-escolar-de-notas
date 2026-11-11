class Turma {
  professor;
  nomeCurso;
  alunos;

  constructor(professor, nomeCurso) {
    this.professor = professor;
    this.nomeCurso = nomeCurso;
    this.alunos = [];
  }

  adicionarAluno(aluno) {
    this.alunos.push(aluno);
  }


  quantidadeAlunos() {
    return this.alunos.length;
  }
}