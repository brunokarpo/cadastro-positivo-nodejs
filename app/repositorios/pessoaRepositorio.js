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
    var Pessoa = app.models.pessoaModel;

    var pessoasModel = {};

    pessoasModel.findByCpf = function (cpf) {

        var criterio = {"cpf": cpf};
        Pessoa.find(criterio).exec()
            .then(
                function (pessoa) {
                    return pessoa;
                },
                function (erro) {
                    console.error(erro);
                    return null;
                }
            );
    };

    pessoasModel.save = function (pessoa) {
        var pessoaModel = new Pessoa(pessoa);
        pessoaModel.save(function (erro, pessoa) {
            if(erro) {
                console.error(erro);
                return null;
            } else {
                return pessoaModel;
            }
        })
    };

    return pessoasModel;
};
