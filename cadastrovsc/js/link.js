
    document.getElementById("loginForm").addEventListener("submit", function(event) {
        event.preventDefault();
        const email = document.getElementById("email").value;
        const senha = document.getElementById("senha").value;
        const errorMsg = document.getElementById("errorMsg");
        errorMsg.textContent = "";

        fetch("http://localhost:8080/usuarios/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, senha })
        })
        .then(response => {
            if (!response.ok) throw new Error("Email ou senha inválidos");
            return response.json();
        })
        .then(usuario => {
            localStorage.setItem("usuarioLogado", JSON.stringify(usuario));
            alert("Bem-vindo " + usuario.nome);
            window.location.href = "usuarios2.html";
        })
        .catch(error => { errorMsg.textContent = error.message; });
    });


    function abrirModal() {
        document.getElementById("modalRecuperacao").style.display = "flex";
    }

    function fecharModal() {
        document.getElementById("modalRecuperacao").style.display = "none";
        document.getElementById("statusRecuperacao").textContent = "";
    }

    function enviarEmailRecuperacao() {
        const email = document.getElementById("emailRecuperar").value;
        const status = document.getElementById("statusRecuperacao");

        if (!email) {
            status.style.color = "red";
            status.textContent = "Digite um e-mail válido.";
            return;
        }

        status.style.color = "blue";
        status.textContent = "Processando...";

        fetch(`http://localhost:8080/usuarios/solicitar-recuperacao?email=${email}`, {
            method: "POST"
        })
        .then(response => {
            if (response.ok) {
                status.style.color = "green";
                status.textContent = "E-mail enviado! Verifique sua caixa.";
            } else {
                status.style.color = "red";
                status.textContent = "E-mail não encontrado.";
            }
        })
        .catch(() => {
            status.style.color = "red";
            status.textContent = "Erro ao conectar com o servidor.";
        });
    }

