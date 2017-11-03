/**
 * Created by bruno on 02/11/17.
 */
function Alerta(cpf) {
    this.cpf = cpf;
    this.timestamp = new Date().getTime();
}

module.exports = function (app) {
    var AlertaModel = app.models.alertaModel;
    var alertaModel = {};

    alertaModel.save = function (cpf) {
        var alerta = new Alerta(cpf);
        var alertaModel = new AlertaModel(alerta);

        alertaModel.save(function (err) {
            if (err) return null;
        });
    };

    alertaModel.findByCpf = function (cpf) {
        return new Promise(function (resolve, reject) {
            var criterio = {cpf: cpf};

            AlertaModel.find(criterio).exec()
                .then(
                    function (alertas) {
                        resolve(alertas);
                    },
                    function (erro) {
                        console.error(erro);
                        reject(null);
                    }
                );
        });
    };

    return alertaModel;
};