/**
 * Created by bruno on 02/11/17.
 */
module.exports = function (app) {
    var pessoasModel = app.models.pessoasModel;
    var alertaModel = app.models.alertasModel;

    var pessoaServices = {};

    pessoaServices.buscarPorCpf = function(cpf) {
        var pessoaProcurada = pessoasModel.findByCpf(cpf);
        return pessoaProcurada;
    };

    pessoaServices.salvarNova = function (pessoa) {
        if(pessoaServices.buscarPorCpf(pessoa.cpf) === undefined) {
            var pessoaSalva = pessoasModel.save(pessoa);
            return pessoaSalva
        }
        return null;
    };

    pessoaServices.gerarAlerta = function (cpf) {
        var pessoaProcurada = pessoaServices.buscarPorCpf(cpf);
        if (pessoaProcurada != null) {
            alertaModel.save(cpf);
            return pessoaProcurada;
        }
        return null;
    };

    return pessoaServices;
};