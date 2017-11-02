/**
 * Created by bruno on 02/11/17.
 */
module.exports = function (app) {
    var pessoasModel = app.models.pessoasModel;
    var alertaModel = app.models.alertasModel;

    var pessoaServices = {};

    pessoaServices.buscarPorCpf = function(cpf) {
        var pessoaProcurada = pessoasModel.findByCpf(cpf);
        if (pessoaProcurada == null) {
            return null;
        }
        return calcularRisco(pessoaProcurada);
    };

    pessoaServices.salvarNova = function (pessoa) {
        if(!pessoaServices.buscarPorCpf(pessoa.cpf)) {
            var pessoaSalva = pessoasModel.save(pessoa);
            return calcularRisco(pessoaSalva);
        }
        return null;
    };

    pessoaServices.gerarAlerta = function (cpf) {
        var pessoaProcurada = pessoaServices.buscarPorCpf(cpf);
        if (pessoaProcurada != null) {
            alertaModel.save(cpf);
            return calcularRisco(pessoaProcurada);
        }
        return null;
    };

    function calcularRisco(pessoa) {
        var cpf = pessoa.cpf;

        var alertas = alertaModel.findByCpf(cpf);

        if (alertas != null) {
            var qtdAlertas = alertas.length;
            if(qtdAlertas === 0) {
                pessoa.risco = 1;
            } else if(qtdAlertas <= 3) {
                pessoa.risco = 2;
            } else if(qtdAlertas <= 6) {
                pessoa.risco = 3;
            } else {
                pessoa.risco = 4;
            }
        } else {
            pessoa.risco = 0;
        }
        return pessoa;
    }

    return pessoaServices;
};