const Banco = require('../model/Banco');

class ProdutoDAO {
    codigo;
    tabela;

    async gravar(obj) {
        try {
            Banco.init();
            await Banco.conexao.query('INSERT INTO produto(descricao,preco,qtde) VALUES($1,$2,$3) RETURNING *', [obj.descricao, obj.preco, obj.qtde])
                .then(resposta => {
                    this.codigo = resposta.rows[0].codigo;
                    return (resposta.rows[0].codigo);
                })
                .catch(e => {
                    console.error("Erro ao gravar: " + e.stack);
                    return (0);
                });
            Banco.conexao.end();
        }
        catch (err) {
            console.log(err);
        }
    }

    async alterar(obj) {
        try {
            Banco.init();
            await Banco.conexao.query(
                'Update produto set descricao=$1,preco=$2,qtde=$3 where codigo=$4',
                [obj.descricao, obj.preco, obj.qtde, obj.codigo])
                .then(_resposta => {
                    console.error("Alterado com sucesso; ");
                    return (1);
                })
                .catch(e => {
                    console.error("Erro ao gravar: " + e.stack);
                    return (0);
                });
            Banco.conexao.end();
        }
        catch (err) {
            console.log(err);
        }

    }

    async remover(obj) {
        try {
            Banco.init();
            await Banco.conexao.query('Delete from produto where codigo = $1', [obj.codigo])
                .then(resposta => {
                    console.log("Removido com sucesso.");
                    return (1);
                })
                .catch(e => {
                    console.error("Erro ao Remover: " + e.stack);
                    return (0);
                });
            Banco.conexao.end();
        }
        catch (err) {
            console.log(err);
        }

    }
    async listar(obj) {
        try {
            Banco.init();
            await Banco.conexao.query('Select codigo,descricao,preco,qtde from produto')
                .then(table => {
                    this.tabela = table;
                })
                .catch(e => {
                    return (null);
                });
            Banco.conexao.end();
        }
        catch (err) {
            console.log(err);
        }

    }
}

module.exports = ProdutoDAO;
