/**
 * Created by bruno on 02/11/17.
 */
function Negativacao(cpf) {
    this.cpf = cpf;
    this.timestamp = new Date().getTime();
}

module.exports = function (app) {
    var NegativacaoModel = app.models.negativacaoModel;
    var negativacaoModel = {};

    negativacaoModel.save = function (cpf) {
        var negativacao = new Negativacao(cpf);
        var negativacaoModel = new NegativacaoModel(negativacao);

        negativacaoModel.save(function (err) {
            if (err) return null;
        });
    };

    negativacaoModel.findByCpf = function (cpf) {
        return new Promise(function (resolve, reject) {
            var criterio = {cpf: cpf};

            NegativacaoModel.find(criterio).exec()
                .then(
                    function (negativacoes) {
                        resolve(negativacoes);
                    },
                    function (erro) {
                        console.error(erro);
                        reject(null);
                    }
                );
        });
    };

    return negativacaoModel;
};