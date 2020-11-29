class Cliente{
    constructor(){
        this.clientes = localStorage.getItem('tbClientes') === null
        ? []
        : JSON.parse(localStorage.getItem('tbClientes'))
    }

    salvar(cliente) {
        if(document.getElementById('codigo').getAttribute('disabled') === 'disabled'){
            this.apagar(cliente.codigo);
        }
        this.clientes.push(cliente);
        localStorage.setItem('tbClientes', JSON.stringify(this.clientes));
        alert('🌟 Cliente salvo com sucesso! 🌟');
    }

    editar(cliente) {
        document.getElementById('codigo').value = cliente.codigo;
        document.getElementById('codigo').setAttribute('disabled', 'disabled');
        document.getElementById('nome').value = cliente.nome;
        document.getElementById('cep').value = cliente.cep;
        document.getElementById('endereco').value = cliente.endereco;
        document.getElementById('bairro').value = cliente.bairro;
        document.getElementById('cidade').value = cliente.cidade;
        document.getElementById('dataNasc').value = cliente.dataNasc;
        document.getElementById('cpf').value = cliente.cpf;
        document.getElementById('cnh').value = cliente.cnh;
        document.getElementById('obs').value = cliente.obs;
    }

    apagar(codigo) {
        let index = this.clientes.findIndex(clientes => cliente.codigo == codigo);
        this.clientes.splice(index, 1);
        localStorage.setItem('tbClientes', JSON.stringify(this.clientes));
        alert('Cliente excluído com sucesso!');
        cliente.atualizar();
    }

    listar() {
        const lista = this.clientes.map((cliente) => (
            `<tr>
                <td>${cliente.codigo}</td>
                <td>${cliente.nome}</td>
                <td>${cliente.cep}</td>
                <td>${cliente.endereco}</td>
                <td>${cliente.bairro}</td>
                <td>${cliente.cidade}</td>
                <td>${cliente.dataNasc}</td>
                <td>${cliente.cpf}</td>
                <td>${cliente.cnh}</td>
                <td>${cliente.obs}</td>
                <td>
                    <button id="apagar" onClick='cliente.apagar(${cliente.codigo})'>🗑️</button>
                    <button id="editar" onClick='cliente.editar(${JSON.stringify(cliente)})'>📝</button>
                </td>
            </tr>`
        )).join("");
        return (
            `<h2>Relação de clientes</h2>
            <table border="1">
                <thead>
                    <th>Código</th>
                    <th>Nome</th>
                    <th>CEP</th>
                    <th>Endereço</th>
                    <th>Bairro</th>
                    <th>Cidade</th>
                    <th>Data de Nascimento</th>
                    <th>CPF</th>
                    <th>CNH</th>
                    <th>Observações</th>
                    <th>Opções</th>
                </thead>
                <tbody>
                    ${lista}
                </tbody>
            </table>`
        );
    }

    atualizar() {
        document.getElementById('resultado').innerHTML = cliente.listar();
    }
}

const cliente = new Cliente();

document.getElementById('btnSalvar').addEventListener('click', function(e){
    var inputs = document.querySelectorAll('input');
    for(var i = 0; i < inputs.length; i++){
        if(!inputs[i].validity.valid){
            alert('Preencha todos os campos!');
            return false;
        }
    }

    const registro = {
        codigo: document.getElementById('codigo').value,
        nome: document.getElementById('nome').value,
        cep: document.getElementById('cep').value,
        endereco: document.getElementById('endereco').value,
        bairro: document.getElementById('bairro').value,
        cidade: document.getElementById('cidade').value,
        dataNasc: document.getElementById('dataNasc').value,
        cpf: document.getElementById('cpf').value,
        cnh: document.getElementById('cnh').value,
        obs: document.getElementById('obs').value
    }
    console.log(registro);
    cliente.salvar(registro);
});

document.getElementById('btnCancelar').addEventListener('click', function(e){
    e.preventDefault();
    document.getElementById('codigo').disabled = false;
    var inputs = document.querySelectorAll('input');
    for(var i = 0; i < inputs.length; i++){
        inputs[i].value = "";
    }
    document.querySelector('select').value = "";
    document.querySelector('textarea').value = "";
});

window.onload = function(){
    cliente.atualizar();
}