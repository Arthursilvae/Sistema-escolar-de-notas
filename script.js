let turmas = [];


function mostrarAba(aba) {
  
  document.getElementById('btn-turma').classList.remove('active');
  document.getElementById('btn-aluno').classList.remove('active');
  document.getElementById('btn-listar').classList.remove('active');

  document.getElementById('tab-turma').classList.remove('active');
  document.getElementById('tab-aluno').classList.remove('active');
  document.getElementById('tab-listar').classList.remove('active');

  
  if (aba === 'turma') {
    document.getElementById('btn-turma').classList.add('active');
    document.getElementById('tab-turma').classList.add('active');
  } else if (aba === 'aluno') {
    document.getElementById('btn-aluno').classList.add('active');
    document.getElementById('tab-aluno').classList.add('active');
    atualizarSelectTurmas(); 
  } else if (aba === 'listar') {
    document.getElementById('btn-listar').classList.add('active');
    document.getElementById('tab-listar').classList.add('active');
    listarAlunos();
  }
}

// ========== CADASTRO DE TURMA ==========
function salvarTurma() {
  let professor = document.getElementById('professor').value.trim();
  let nomeCurso = document.getElementById('nomeCurso').value.trim();

  if (professor === '' || nomeCurso === '') {
    alert('Preencha o nome do professor e o nome do curso.');
    return;
  }

  let novaTurma = new Turma(professor, nomeCurso);
  turmas.push(novaTurma);

  
  document.getElementById('professor').value = '';
  document.getElementById('nomeCurso').value = '';

  alert('Turma cadastrada com sucesso!');
  atualizarSelectTurmas();
}


function atualizarSelectTurmas() {
  let select = document.getElementById('selectTurma');
  select.innerHTML = '<option value="">-- Selecione uma turma --</option>';

  for (let i = 0; i < turmas.length; i++) {
    let option = document.createElement('option');
    option.value = i; 
    option.textContent = turmas[i].nomeCurso + ' (Prof. ' + turmas[i].professor + ')';
    select.appendChild(option);
  }
}

// ========== CADASTRO DE ALUNO ==========
function salvarAluno() {
  
  if (turmas.length === 0) {
    alert('Cadastre pelo menos uma turma antes de cadastrar alunos.');
    return;
  }

  let indiceTurma = document.getElementById('selectTurma').value;
  let nome = document.getElementById('nome').value.trim();
  let n1 = document.getElementById('n1').value;
  let n2 = document.getElementById('n2').value;
  let n3 = document.getElementById('n3').value;

  if (indiceTurma === '') {
    alert('Selecione uma turma.');
    return;
  }

  if (nome === '' || n1 === '' || n2 === '' || n3 === '') {
    alert('Preencha o nome e as três notas do aluno.');
    return;
  }

 
  let aluno = new Aluno(nome, n1, n2, n3);

  
  turmas[indiceTurma].adicionarAluno(aluno);


  document.getElementById('nome').value = '';
  document.getElementById('n1').value = '';
  document.getElementById('n2').value = '';
  document.getElementById('n3').value = '';
  document.getElementById('selectTurma').value = '';

  alert('Aluno cadastrado com sucesso na turma!');
}


function listarAlunos() {
  let container = document.getElementById('listaAlunos');
  container.innerHTML = '';

  if (turmas.length === 0) {
    container.innerHTML = '<p class="mensagem-vazia">Nenhuma turma cadastrada ainda.</p>';
    return;
  }

  for (let t = 0; t < turmas.length; t++) {
    let turma = turmas[t];

    
    let titulo = document.createElement('div');
    titulo.className = 'turma-titulo';
    titulo.textContent = turma.nomeCurso + ' — Prof. ' + turma.professor +
                         ' (' + turma.quantidadeAlunos() + ' aluno(s))';
    container.appendChild(titulo);

    if (turma.alunos.length === 0) {
      let vazio = document.createElement('p');
      vazio.className = 'mensagem-vazia';
      vazio.textContent = 'Nenhum aluno nesta turma.';
      container.appendChild(vazio);
      continue;
    }

   
    for (let a = 0; a < turma.alunos.length; a++) {
      let aluno = turma.alunos[a];

     
      let classeCor = '';
      if (aluno.estado === 'Aprovado') {
        classeCor = 'aprovado';
      } else if (aluno.estado === 'Recuperação') {
        classeCor = 'recuperacao';
      } else {
        classeCor = 'reprovado';
      }

      
      let card = document.createElement('div');
      card.className = 'aluno-card';
      card.id = 'card-' + t + '-' + a;

      
      card.innerHTML =
        '<h4 class="' + classeCor + '">' + aluno.nome + '</h4>' +
        '<div class="aluno-info">' +
          'Nota 1: ' + aluno.getNota1().toFixed(1) + '<br>' +
          'Nota 2: ' + aluno.getNota2().toFixed(1) + '<br>' +
          'Nota 3: ' + aluno.getNota3().toFixed(1) + '<br>' +
          'Média: <strong>' + aluno.media.toFixed(1) + '</strong><br>' +
          'Situação: <span class="' + classeCor + '">' + aluno.estado + '</span>' +
        '</div>' +
        '<button class="btn-editar" onclick="mostrarEdicao(' + t + ', ' + a + ')">Editar Notas</button>' +
        
        '<div class="edit-notas" id="edit-' + t + '-' + a + '">' +
          '<div class="edit-linha">N1: <input type="number" step="0.1" min="0" max="10" id="edit-n1-' + t + '-' + a + '" value="' + aluno.getNota1() + '"></div>' +
          '<div class="edit-linha">N2: <input type="number" step="0.1" min="0" max="10" id="edit-n2-' + t + '-' + a + '" value="' + aluno.getNota2() + '"></div>' +
          '<div class="edit-linha">N3: <input type="number" step="0.1" min="0" max="10" id="edit-n3-' + t + '-' + a + '" value="' + aluno.getNota3() + '"></div>' +
          '<button class="btn-salvar-notas" onclick="salvarNotas(' + t + ', ' + a + ')">Salvar Notas</button>' +
        '</div>';

      container.appendChild(card);
    }
  }
}


function mostrarEdicao(indiceTurma, indiceAluno) {
  let editDiv = document.getElementById('edit-' + indiceTurma + '-' + indiceAluno);
  editDiv.classList.toggle('active');
}


function salvarNotas(indiceTurma, indiceAluno) {
  let aluno = turmas[indiceTurma].alunos[indiceAluno];

  let n1 = document.getElementById('edit-n1-' + indiceTurma + '-' + indiceAluno).value;
  let n2 = document.getElementById('edit-n2-' + indiceTurma + '-' + indiceAluno).value;
  let n3 = document.getElementById('edit-n3-' + indiceTurma + '-' + indiceAluno).value;

  if (n1 === '' || n2 === '' || n3 === '') {
    alert('Preencha as três notas.');
    return;
  }

  
  aluno.setNotas(n1, n2, n3);

  alert('Notas atualizadas com sucesso!');
  listarAlunos(); 
}