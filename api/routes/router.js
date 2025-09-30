
const express = require("express");
const router = express.Router();
const Produto = require("../src/model/Produto");
const DAO = require("../src/controller/ProdutoDAO");
const path = require('path');

router.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, "..")+'/index.html');
});

router.post('/produto', async function (req, res) {
  const produto = new Produto();
  const dao = new DAO();
  const botao = req.body.b1;

  var tabela;
  var s = "";
  try {
    switch (botao.toLowerCase()) {
      case 'gravar':
        produto.descricao = req.body.txtDescricao;
        produto.preco = req.body.txtPreco;
        produto.qtde = req.body.txtQtde; 

        await dao.gravar(produto);
        produto.codigo = dao.codigo;
        res.render("mostrar", { codigo: produto.codigo, descricao: produto.descricao, preco: produto.preco, qtde: produto.qtde, msg: s });
        break;
      case 'alterar':
        produto.codigo = req.body.txtCodigo;
        produto.descricao = req.body.txtDescricao;
        produto.preco = req.body.txtPreco;
        produto.qtde = req.body.txtQtde; 
        dao.alterar(produto);
        res.render("mostrar", { codigo: produto.codigo, descricao: produto.descricao, preco: produto.preco, qtde: produto.qtde, msg: s });

        break;
      case 'remover':
        produto.codigo = req.body.txtCodigo;
        dao.remover(produto);
        res.render("mostrar", { codigo: produto.codigo, descricao: produto.descricao, preco: produto.preco, qtde: produto.qtde, msg: s });
        break;
      case 'listar':
        await dao.listar();
        resp = dao.tabela;
        res.render("mostrarTabela", { tabela: resp });

        break;
    }

  }
  catch (err) {
    console.log(err);
  }

});

module.exports = router;
