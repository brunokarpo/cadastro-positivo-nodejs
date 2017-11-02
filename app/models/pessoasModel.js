/**
 * Created by bruno on 02/11/17.
 */

function Pessoa(nome, cpf, sexo, nascimento) {
    this.nome = nome;
    this.cpf = cpf;
    this.sexo = sexo;
    this.nascimento = nascimento;
}

module.exports = function (app) {

    /*
     * Criando lista estática para testes.
     * TODO: Integar com o Mongo depois
     */
    var pessoa1 = new Pessoa('Laís Eduarda Marcela da Silva', '28087301447', 'FEMININO', '1995-03-10');
    var pessoa2 = new Pessoa('Alana Lara Monteiro', '42969577089', 'FEMININO', '1995-02-26');
    var pessoa3 = new Pessoa('Lucca Hugo Joaquim Rodrigues', '03419849737', 'MASCULINO', '1989-11-11');
    var pessoa4 = new Pessoa('Eduardo Bernardo Fernandes', '73306718351', 'MASCULINO', '1989-01-10');
    var pessoas = [pessoa1, pessoa2, pessoa3, pessoa4];


    var pessoasModel = {};

    pessoasModel.findByCpf = function (cpf) {

        var pessoaProcurada = pessoas.filter(function (pessoa) {
            return pessoa.cpf === cpf;
        })[0];

        return pessoaProcurada;
    };

    pessoasModel.save = function (pessoa) {
        // Colocando na lista dinâmica por enquanto.
        // TODO: mandar para o Mongo DB
        pessoas.push(pessoa);
        return pessoa;
    };

    return pessoasModel;
};
