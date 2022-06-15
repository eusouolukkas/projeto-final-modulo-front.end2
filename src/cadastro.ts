const btnCad = document.querySelector('#btn-cadastrar') as HTMLInputElement
btnCad.addEventListener('click', (e)=>{
    e.preventDefault();
    let email = document.querySelector('#input-email') as HTMLInputElement;
    let senha = document.querySelector('#input-senha') as HTMLInputElement;
    let confirmaSenha = document.querySelector('#input-confirma-senha') as HTMLInputElement;
  
    salvar(email, senha, confirmaSenha);
  });
  
  
  function salvar(e: HTMLInputElement, s: HTMLInputElement, c: HTMLInputElement){
    let db = JSON.parse(localStorage.getItem('usuarios') || '[]');
    //crio um objeto
    let usuario = {
        id: db.length + 1,
        login: e,
        senha: s,
        confirmaSenha: c
    }
    //jogo o obejto dentro do vetor
    db.push(usuario);
    //salvo no localstorage
    localStorage.setItem('usuarios', JSON.stringify(db));
    location.href = 'login.html';    
  }
  