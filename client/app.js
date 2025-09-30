const API_URL = "http://localhost:3000/produto";

async function listarProdutos() {
    try {
        const res = await fetch(API_URL);
        const produtos = await res.json();
        const lista = document.getElementById("lista");
        lista.innerHTML = "";

        produtos.forEach(p => {
            const li = document.createElement("li");
            li.innerHTML = `
                <strong>${p.codigo}</strong> - ${p.descricao} 
                - R$ ${p.preco} 
                - Qtd: ${p.qtde}
            `;
            lista.appendChild(li);
        });
    } catch (err) {
        console.error("Erro ao carregar produtos:", err);
    }
}

async function gravarProduto(e) {
    e.preventDefault();

    const produto = {
        descricao: document.getElementById("descricao").value,
        preco: parseFloat(document.getElementById("preco").value),
        qtde: parseInt(document.getElementById("qtde").value)
    };

    try {
        await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(produto)
        });

    } catch (err) {
        console.error("Erro ao salvar produto:", err);
    }
}

async function deletarProduto(codigo) {
    const produto = {
        descricao: document.getElementById("descricao").value,
        preco: parseFloat(document.getElementById("preco").value),
        qtde: parseInt(document.getElementById("qtde").value)
    };
    try {
        await fetch(`${API_URL}/${produto.qtde}`, {
            method: "DELETE"
        });
        listarProdutos();
    } catch (err) {
        console.error("Erro ao excluir produto:", err);
    }

}

async function alterarProduto() {
    const produto = {
        codigo: parseInt(document.getElementById("codigo").value),
        descricao: document.getElementById("descricao").value,
        preco: parseFloat(document.getElementById("preco").value),
        qtde: parseInt(document.getElementById("qtde").value)
    };
    try {
        await fetch(`${API_URL}/${produto.codigo}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(produto)
        });
    } catch (err) {
        console.error("Erro ao alterar produto:", err);
    }
}

document.getElementById("formProduto").addEventListener("submit", gravarProduto);

listarProdutos();
