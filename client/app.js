const API_URL = "http://localhost:3000/produto";

async function carregarProdutos() {
    try {
        const res = await fetch(API_URL);
        const produtos = await res.json();
        const lista = document.getElementById("lista");
        lista.innerHTML = "";

        produtos.forEach(p => {
            const li = document.createElement("li");
            li.innerHTML = `
                <strong>${p.codigo}</strong> - ${p.descricao} 
                - R$ ${p.preco.toFixed(2)} 
                - Qtd: ${p.qtde}
            `;
            lista.appendChild(li);
        });
    } catch (err) {
        console.error("Erro ao carregar produtos:", err);
        alert("Erro ao carregar produtos: " + err.message);
    }
}

async function salvarProduto() {
    const codigo = document.getElementById("codigo").value;

    if (codigo) {
        return;
    }

    const produto = {
        descricao: document.getElementById("descricao").value,
        preco: parseFloat(document.getElementById("preco").value),
        qtde: parseInt(document.getElementById("qtde").value)
    };

    if (!produto.descricao || !produto.preco || !produto.qtde) {
        alert("Preencha todos os campos obrigatórios!");
        return;
    }

    try {
        await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(produto)
        });
        alert("Produto salvo com sucesso!");
        limparCampos();
        carregarProdutos();
    } catch (err) {
        console.error("Erro ao salvar produto:", err);
        alert("Erro ao salvar produto: " + err.message);
    }
}

async function editarProduto() {
    const codigo = document.getElementById("codigo").value;

    if (!codigo) {
        alert("Informe o código do produto para editar!");
        return;
    }

    const produto = {
        descricao: document.getElementById("descricao").value,
        preco: parseFloat(document.getElementById("preco").value),
        qtde: parseInt(document.getElementById("qtde").value)
    };

    if (!produto.descricao || !produto.preco || !produto.qtde) {
        alert("Preencha todos os campos obrigatórios!");
        return;
    }

    try {
        await fetch(`${API_URL}/${codigo}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(produto)
        });
        alert("Produto editado com sucesso!");
        limparCampos();
        carregarProdutos();
    } catch (err) {
        console.error("Erro ao editar produto:", err);
        alert("Erro ao editar produto: " + err.message);
    }
}

async function excluirProduto() {
    const codigo = document.getElementById("codigo").value;

    if (!codigo) {
        alert("Informe o código do produto para excluir!");
        return;
    }

    if (confirm(`Tem certeza que deseja excluir o produto código ${codigo}?`)) {
        try {
            await fetch(`${API_URL}/${codigo}`, {
                method: "DELETE"
            });
            alert("Produto excluído com sucesso!");
            limparCampos();
            carregarProdutos();
        } catch (err) {
            console.error("Erro ao excluir produto:", err);
            alert("Erro ao excluir produto: " + err.message);
        }
    }
}

function limparCampos() {
    document.getElementById("codigo").value = "";
    document.getElementById("descricao").value = "";
    document.getElementById("preco").value = "";
    document.getElementById("qtde").value = "";
}

carregarProdutos();
