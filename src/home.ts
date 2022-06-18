const form = document.querySelector('#form-cadastro') as HTMLElement;
const tabela = document.querySelector('#tbody') as HTMLElement;
const idx : any = form.idx.value;

const session = localStorage.getItem("session");
let logged = sessionStorage.getItem("logado");

const btnSair = document.querySelector('#btn-sair') as HTMLButtonElement;
btnSair.addEventListener('click', (e)=>{
    e.preventDefault();
    sair()
});

function sair(){
    sessionStorage.removeItem("logado");
    localStorage.removeItem("session");

    window.location.href = "login.html";
}

checkLogged();

function checkLogged (){
    if(session) {
        sessionStorage.setItem("logado", session);
        logged = session;
    }

    if (!logged) {
        window.location.href = "login.html"
        return;
    }
}

//Salvar no localStorage

const atualizarLocalStorage = (recados: string) => {localStorage.setItem('recados', JSON.stringify(recados))}

//recupera as mensagens

const recuperarLocalStorage = () => JSON.parse(localStorage.getItem('recados') || '[]')

const salvarRecado = (e: { id: string, descricao: string, detalhamento: string}) => {
    e.preventDefault()
    //pegar os dados do formulario
    const id = form.id.value;
    const descricao = form.descricao.value;
    const detalhamento = form.detalhamento.value;

    if(idx == 'novo'){
        const recados = recuperarLocalStorage();
        recados.push({id:recados.length + 1, descricao, detalhamento});
        atualizarLocalStorage(recados);
        preencherTabela();
        (document.querySelector('#form-cadastro') as HTMLFormElement).reset();
    }else{
        let recado = {id: idx, descricao, detalhamento}

        atualizarRecado(idx, recado);
        preencherTabela();
        (document.querySelector('#form-cadastro') as HTMLFormElement).reset();
        idx = 'novo';
    }
}

const preencherTabela = () => {
    const recados = recuperarLocalStorage();
    tabela.innerHTML = '';
    for(const recado of recados){
    tabela.innerHTML += `
        <tr>
            <td scope="row">${recado.id}</td>
            <td>${recado.descricao}</td>
            <td>${recado.detalhamento}</td>
            <td>
            <input type="submit" id="btn-apagar" value="Apagar" onclick="removerRecado(${recado.id})" />
                <input type="submit" id="btn-editar" value="Editar" onclick="editarRecado(${recado.id})" />
            </td>
        </tr>
    `;
    }
}

const removerRecado = (id: string) =>{
    const recados = recuperarLocalStorage();
    const indexRecado = recados.findIndex((recado: { id: string; }) => recado.id === id);
    if(indexRecado < 0) return;
    recados.splice(indexRecado, 1);
    atualizarLocalStorage(recados);
    alert('Recado removido!')
    preencherTabela();
}

const editarRecado = (id: string) => {
    const recados = recuperarLocalStorage();
    const indexRecado = recados.findIndex((recado: string) => recado.id === id);
    form.id.value = recados[indexRecado].id;
    form.descricao.value = recados[indexRecado].descricao;
    form.detalhamento.value = recados[indexRecado].detalhamento;
    idx = id;
}

const atualizarRecado = (id: string, recado: string) =>{
    const recados = recuperarLocalStorage();
    const indexRecado = recados.findIndex((recado: string) => recado.id === id);
    recados[indexRecado] = recado;
    atualizarLocalStorage(recados);
}



//eventos
form === null || form === void 0 ? void 0 : form.addEventListener('submit', salvarRecado)
document.addEventListener('DOMContentLoaded', preencherTabela);