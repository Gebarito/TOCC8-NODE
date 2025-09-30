const Banco = require('../model/Banco');

class ProdutoDAO {
    codigo;
    tabela;

    async gravar(obj) {
        try {
            Banco.init();
            const resposta = await Banco.conexao.query(
                'INSERT INTO produto(descricao,preco,qtde) VALUES($1,$2,$3) RETURNING *', 
                [obj.descricao, obj.preco, obj.qtde]
            );
            this.codigo = resposta.rows[0].codigo;
            Banco.conexao.end();
            return this.codigo;
        }
        catch (err) {
            console.error("Erro ao gravar: " + err);
            throw err;
        }
    }

    async alterar(obj) {
        try {
            Banco.init();
            await Banco.conexao.query(
                'UPDATE produto SET descricao=$1,preco=$2,qtde=$3 WHERE codigo=$4',
                [obj.descricao, obj.preco, obj.qtde, obj.codigo]
            );
            Banco.conexao.end();
            return true;
        }
        catch (err) {
            console.error("Erro ao alterar: " + err);
            throw err;
        }
    }

    async remover(obj) {
        try {
            Banco.init();
            await Banco.conexao.query('DELETE FROM produto WHERE codigo = $1', [obj.codigo]);
            Banco.conexao.end();
            return true;
        }
        catch (err) {
            console.error("Erro ao remover: " + err);
            throw err;
        }
    }

    async listar() {
        try {
            Banco.init();
            const resultado = await Banco.conexao.query('SELECT codigo,descricao,preco,qtde FROM produto');
            this.tabela = resultado;
            Banco.conexao.end();
            return resultado.rows;
        }
        catch (err) {
            console.error("Erro ao listar: " + err);
            throw err;
        }
    }
}

module.exports = ProdutoDAO;
