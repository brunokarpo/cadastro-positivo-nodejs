/**
 * Created by bruno on 02/11/17.
 */
module.exports = function (app) {
    var pessoaRepositorio = app.repositorios.pessoaRepositorio;
    var alertaRepositorio = app.repositorios.alertaRepositorio;
    var negativacaoRepositorio = app.repositorios.negativacaoRepositorio;
    var pessoaServices = {};

    pessoaServices.buscarPorCpf = function (cpf) {
        return new Promise(function (resolve, reject) {
            pessoaRepositorio.findByCpf(cpf).then(
                function (result) {
                    resolve(calcularRisco(result));
                },
                function () {
                    reject(null);
                }
            );
        });
    };

    pessoaServices.salvarNova = function (pessoa) {
        if (!pessoaServices.buscarPorCpf(pessoa.cpf)) {
            var pessoaSalva = pessoaRepositorio.save(pessoa);
            return calcularRisco(pessoaSalva);
        }
        return null;
    };

    pessoaServices.gerarAlerta = function (cpf) {
        return new Promise(function (resolve, reject) {
            pessoaServices.buscarPorCpf(cpf).then(function (pessoaProcurada) {
                if (pessoaProcurada) {
                    alertaRepositorio.save(cpf);
                    resolve(calcularRisco(pessoaProcurada));
                }

                reject(null);
            });
        });
    };

    pessoaServices.negativar = function (cpf) {
        return new Promise(function (resolve, reject) {
            pessoaServices.buscarPorCpf(cpf).then(function (pessoaProcurada) {
                if (pessoaProcurada) {
                    negativacaoRepositorio.save(cpf);
                    resolve(calcularRisco(pessoaProcurada));
                }

                reject(null);
            });
        });
    };

    function calcularRisco(pessoa) {
        return new Promise(function (resolve, reject) {
            var cpf = pessoa.cpf;

            var retorno = {};
            retorno.id = pessoa.id;
            retorno.nome = pessoa.nome;
            retorno.cpf = pessoa.cpf;
            retorno.sexo = pessoa.sexo;
            retorno.nascimento = pessoa.nascimento;

            negativacaoRepositorio.findByCpf(cpf).then(
                function (negativado) {
                    if (negativado && negativado.length !== 0) {
                        retorno.risco = 5;
                        resolve(retorno);
                    }

                    alertaRepositorio.findByCpf(cpf).then(
                        function (alertas) {
                            console.log('alertas');
                            console.log(alertas);

                            if (alertas) {
                                var qtdAlertas = alertas.length;

                                if (qtdAlertas === 0) {
                                    retorno.risco = 1;

                                } else if (qtdAlertas <= 3) {
                                    retorno.risco = 2;

                                } else if (qtdAlertas <= 6) {
                                    retorno.risco = 3;

                                } else {
                                    retorno.risco = 4;
                                }

                            } else {
                                retorno.risco = 0;
                            }

                            resolve(retorno);
                        }
                    );
                }
            );
        });
    }

    return pessoaServices;
};