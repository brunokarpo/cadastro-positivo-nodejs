/**
 * Created by bruno on 02/11/17.
 */
function Negativacao(cpf) {
    this.cpf = cpf;
    this.timestamp = new Date().getTime();
};

module.exports = function (app) {

    var NegativacaoModel = app.models.negativacaoModel;

    var negativacaoModel = {};

    negativacaoModel.save = function(cpf) {
        var negativacao = new Alerta(cpf);
        var negativacaoModel = new NegativacaoModel(negativacao);

        negativacaoModel.save(function (erro, negativacao) {
            if(erro) {
                console.error(erro);
                return null;
            } else {
                return negativacao;
            }
        });
    };

    negativacaoModel.findByCpf = function(cpf) {
        var criterio = {"cpf": cpf};
        NegativacaoModel.find(criterio).exec()
            .then(
                function (negativacoes) {
                    return negativacoes;
                },
                function (erro) {
                    console.error(erro);
                    return null;
                }
            );
    };

    return negativacaoModel;
};