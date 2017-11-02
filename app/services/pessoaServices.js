/**
 * Created by bruno on 02/11/17.
 */
module.exports = function (app) {
    var pessoasModel = app.repositorios.pessoaRepositorio;
    var alertaModel = app.repositorios.alertaRepositorio;
    var negativacaoModel = app.repositorios.negativacaoRepositorio;

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

    pessoaServices.negativar = function (cpf) {
        var pessoaProcurada = pessoaServices.buscarPorCpf(cpf);
        if (pessoaProcurada != null) {
            negativacaoModel.save(cpf);
            return calcularRisco(pessoaProcurada);
        }
        return null;
    };

    function calcularRisco(pessoa) {
        var cpf = pessoa.cpf;

        var negativado = negativacaoModel.findByCpf(cpf);
        if (negativado && negativado.length !== 0) {
            pessoa.risco = 5;
            return pessoa;
        }

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