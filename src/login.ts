const loga = document.querySelector("#logar") as HTMLInputElement;
loga.addEventListener("click", (e) => {
    e.preventDefault();
  
    logar();
  });
  
  function logar() {
    const login = document.querySelector("#login") as HTMLInputElement;
    const senha = document.querySelector("#pass") as HTMLInputElement;
  
    let usuarios_novo = [];
  
    //pego todos os dados de usuarios que tenho no localstorage
    usuarios_novo = JSON.parse(localStorage.find("usuarios"));
  
    //crio um objeto para comparar com os dados do objero que vem do localstorage
    let usuario = {
      email: "",
      senha: "",
    };
  
    usuarios_novo.forEach((element: { login: string; senha: string; }) => {
      if (element.login === login.value && element.senha === senha.value) {
        usuario = {
          email: element.login,
          senha: element.senha,
        };
      }
    });
  
    if (usuario.email === login.value && usuario.senha === senha.value) {
      sessionStorage.setItem("logado", usuario.email);
      window.location.href = "home.html";
    } else {
      alert("Opa! Deu algo errado");
    }
  }
  