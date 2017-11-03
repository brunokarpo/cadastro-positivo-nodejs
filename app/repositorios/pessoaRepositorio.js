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
        return new Promise(function (resolve, reject) {
            var criterio = {cpf: cpf};

            Pessoa.find(criterio).exec()
                .then(
                    function (pessoas) {
                        console.log('Retornado do mongo', pessoas);
                        resolve(pessoas[0]);
                    },
                    function (erro) {
                        console.error(erro);
                        reject(null);
                    }
                );
        });
    };

    pessoasModel.save = function (pessoa) {
        var pessoaModel = new Pessoa(pessoa);
        pessoaModel.save(function (err) {
            if (err) return null;
        });
        return pessoa;
    };

    return pessoasModel;
};
