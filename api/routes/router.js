const express = require("express");
const router = express.Router();
const Produto = require("../src/model/Produto");
const DAO = require("../src/controller/ProdutoDAO");

router.get('/produto', async function (req, res) {
    try {
        const dao = new DAO();
        await dao.listar();
        res.json(dao.tabela.rows);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: err.message });
    }
});

router.post('/produto', async function (req, res) {
    try {
        const produto = new Produto();
        const dao = new DAO();
        
        produto.descricao = req.body.descricao;
        produto.preco = req.body.preco;
        produto.qtde = req.body.qtde;

        await dao.gravar(produto);
        res.json({ 
            codigo: produto.codigo, 
            descricao: produto.descricao, 
            preco: produto.preco, 
            qtde: produto.qtde 
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: err.message });
    }
});

router.put('/produto/:codigo', async function (req, res) {
    try {
        const produto = new Produto();
        const dao = new DAO();
        
        produto.codigo = req.params.codigo;
        produto.descricao = req.body.descricao;
        produto.preco = req.body.preco;
        produto.qtde = req.body.qtde;

        await dao.alterar(produto);
        res.json({ message: "Produto alterado com sucesso" });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: err.message });
    }
});

router.delete('/produto/:codigo', async function (req, res) {
    try {
        const produto = new Produto();
        const dao = new DAO();
        
        produto.codigo = req.params.codigo;
        await dao.remover(produto);
        res.json({ message: "Produto removido com sucesso" });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
