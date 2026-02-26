const params = new URLSearchParams(window.location.search);
const idUsuario = params.get('id');

const form = document.getElementById('usuarioForm');
const btnSalvar = document.getElementById('btnSalvar');
const titulo = document.getElementById('titulo');
const mensagem = document.getElementById('mensagem');
const grupoSenha = document.getElementById('grupoSenha');

if (idUsuario) {
    titulo.innerText = 'Editar Usuário';
    btnSalvar.innerText = 'Atualizar Usuário';
    //grupoSenha.style.display = 'none';
    carregarUsuario(idUsuario);
} else {
    senha.required = true;
}

function carregarUsuario(id) {
    fetch(`http://localhost:8080/usuarios/${id}`)
        .then(res => {
            if (!res.ok) throw new Error();
            return res.json();
        })
        .then(u => {
            document.getElementById('id').value = u.id;
            nome.value = u.nome;
            email.value = u.email;
            perfil.value = u.perfil;
            endereco.value = u.endereco || '';
            bairro.value = u.bairro || '';
            complemento.value = u.complemento || '';
            cep.value = u.cep || '';
            cidade.value = u.cidade || '';
            estado.value = u.estado || '';
        })
        .catch(() => {
            mensagem.innerHTML =
                '<span class="erro">Erro ao carregar usuário para edição.</span>';
        });
}

form.addEventListener('submit', function (e) {
    e.preventDefault();

    const usuario = {
        id: idUsuario ? Number(idUsuario) : undefined,
        nome: nome.value,
        email: email.value,
        perfil: perfil.value,
        endereco: endereco.value,
        bairro: bairro.value,
        complemento: complemento.value,
        cep: cep.value,
        cidade: cidade.value,
        estado: estado.value
    };

    // só envia senha se estiver cadastrando
    //if (!idUsuario) {
        usuario.senha = senha.value;
    //}

    //Operador Ternário
    //const url = condicao ? valorSeVerdadeiro : valorSeFalso; 
    const url = idUsuario
        ? `http://localhost:8080/usuarios/${idUsuario}`
        : 'http://localhost:8080/usuarios';

    const method = idUsuario ? 'PUT' : 'POST';

    fetch(url, {
        method,
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(usuario)
    })
    .then(res => {
        if (!res.ok) throw new Error();
        if (idUsuario) {
            window.location.href = 'usuarios.html';
        } else {
            window.location.href = 'usuarios.html';
        }
    })
    .catch(() => {
        mensagem.innerHTML =
            '<span class="erro">Erro ao salvar usuário.</span>';
    });
});