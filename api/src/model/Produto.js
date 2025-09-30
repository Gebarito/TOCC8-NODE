class Produto {
    //campos private
    #codigo;
    #descricao;
    #preco;
    #qtde;
    constructor() {
        this.#codigo = 0;
        this.#descricao = "";
        this.#preco = 0;
        this.#qtde = 0;
    }

    set codigo(c) {
        this.#codigo = c;
    }

    get codigo() {
        return this.#codigo;
    }

    set descricao(d) {
        this.#descricao = d;
    }

    get descricao() {
        return this.#descricao;
    }

    set preco(p) {
        if (p >= 0) {
            this.#preco = p;
        }
        else {
            throw "Erro: Quantidade negativa";
        }
    }

    get preco() {
        return this.#preco;
    }

    set qtde(q) {
        if (q >= 0) {
            this.#qtde = q;
        }
        else {
            throw "Erro: Quantidade negativa";
        }
    }

    get qtde(){
        return this.#qtde;
    }

}

module.exports = Produto;
