const API_URL = "http://127.0.0.1:3000/produtos";

async function carregarProdutos() {
    const res = await fetch(API_URL);
    const produtos = await res.json();
    const lista = document.getElementById("lista");
    lista.innerHTML = "";
    produtos.forEach(p => {
        const li = document.createElement("li");
        li.textContent = `${p.codigo} - ${p.descricao} - R$${p.preco} - Qtd: ${p.qtde}`;

        const btnEditar = document.createElement("button");
        btnEditar.textContent = "Editar";
        btnEditar.onclick = () => editarProduto(p);

        const btnExcluir = document.createElement("button");
        btnExcluir.textContent = "Excluir";
        btnExcluir.onclick = () => excluirProduto(p.codigo);

        li.append(" ", btnEditar, " ", btnExcluir);
        lista.appendChild(li);
    });
}

async function salvarProduto(e) {
    e.preventDefault();
    const codigo = document.getElementById("codigo").value;
    const produto = {
        descricao: document.getElementById("descricao").value,
        preco: parseFloat(document.getElementById("preco").value),
        qtde: parseInt(document.getElementById("qtde").value)
    };

    if (codigo) {
        await fetch(`${API_URL}/${codigo}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(produto)
        });
    } else {
        await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(produto)
        });
    }
    document.getElementById("formProduto").reset();
    carregarProdutos();
}

async function excluirProduto(codigo) {
    await fetch(`${API_URL}/${codigo}`, { method: "DELETE" });
    carregarProdutos();
}

function editarProduto(produto) {
    document.getElementById("codigo").value = produto.codigo;
    document.getElementById("descricao").value = produto.descricao;
    document.getElementById("preco").value = produto.preco;
    document.getElementById("qtde").value = produto.qtde;
}

document.getElementById("formProduto").addEventListener("submit", salvarProduto);
carregarProdutos();
