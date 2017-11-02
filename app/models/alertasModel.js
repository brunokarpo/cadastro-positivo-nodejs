/**
 * Created by bruno on 02/11/17.
 */
function Alerta(cpf) {
    this.cpf = cpf;
    this.timestamp = new Date().getTime();
};

module.exports = function (app) {

    var alerta1 = new Alerta('28087301447');
    var alerta2 = new Alerta('28087301447');
    var alerta3 = new Alerta('03419849737');
    var alerta4 = new Alerta('03419849737');
    var alerta5 = new Alerta('03419849737');

    var alertas = [alerta1, alerta2, alerta3, alerta4, alerta5];

    var alertaModel = {};

    alertaModel.save = function(cpf) {
        // TODO integrar com o mongo
        // colocando na lista estática por enquanto;
        alertas.push(new Alerta(cpf));
    };

    alertaModel.findByCpf = function(cpf) {
        // TODO integrar com o mongo
        // procurando na lista estática por enquanto;
        return alertas.filter(function (alerta) {
           return alerta.cpf === cpf;
        });
    };


    return alertaModel;
};