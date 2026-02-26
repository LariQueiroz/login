let usuarios = [
    { nome: "Jurandir de Campos", email: "jurandirc@teste.com", perfil: "USER", cidade: "Sorocaba" },
    { nome: "Thiago", email: "thiago@email.com", perfil: "ADMIN", cidade: "Soroca" },
    { nome: "Martha", email: "martha@terra.com.br", perfil: "ADMIN", cidade: "Sorocaba" },
    { nome: "João da Silva", email: "martha1@terra.com.br", perfil: "ADMIN", cidade: "Sorocaba" },
    { nome: "João da Silva", email: "joao2.silva@email.com", perfil: "USER", cidade: "Sorocaba" }
];

function carregarUsuarios() {
    const tabela = document.getElementById("tabelaUsuarios");
    tabela.innerHTML = "";

    usuarios.forEach((usuario, index) => {
        tabela.innerHTML += `
            <tr>
                <td>${usuario.nome}</td>
                <td>${usuario.email}</td>
                <td>${usuario.perfil}</td>
                <td>${usuario.cidade}</td>
                <td>
                    <button class="editar" onclick="editarUsuario(${index})">Editar</button>
                    <button class="excluir" onclick="excluirUsuario(${index})">Excluir</button>
                </td>
            </tr>
        `;
    });
}

function novoUsuario() {
    const nome = prompt("Digite o nome:");
    const email = prompt("Digite o email:");
    const perfil = prompt("Digite o perfil (USER ou ADMIN):");
    const cidade = prompt("Digite a cidade:");

    if (nome && email && perfil && cidade) {
        usuarios.push({ nome, email, perfil, cidade });
        carregarUsuarios();
    }
}

function editarUsuario(index) {
    const usuario = usuarios[index];

    const nome = prompt("Editar nome:", usuario.nome);
    const email = prompt("Editar email:", usuario.email);
    const perfil = prompt("Editar perfil:", usuario.perfil);
    const cidade = prompt("Editar cidade:", usuario.cidade);

    usuarios[index] = { nome, email, perfil, cidade };
    carregarUsuarios();
}

function excluirUsuario(index) {
    if (confirm("Tem certeza que deseja excluir?")) {
        usuarios.splice(index, 1);
        carregarUsuarios();
    }
}

carregarUsuarios(); 