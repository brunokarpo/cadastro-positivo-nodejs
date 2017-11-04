module.exports = function (app) {
    var pessoaServices = app.services.pessoaServices;

    var controller = {};

    controller.index = function (req, res) {
        res.send("esta tudo rodando por aqui");
    };

    controller.buscar = function (req, res) {
        var cpf = req.params.cpf;

        pessoaServices.buscarPorCpf(cpf).then(function (pessoaProcurada) {
            if (!pessoaProcurada) {
                res.status(404);
                var mensagem = 'Pessoa com cpf \'' + cpf + '\' nao encontrada';
                res.send(mensagem);
                return;
            }

            res.json(pessoaProcurada);
        });
    };

    controller.criarNova = function (req, res) {
        var pessoaNova = req.body;

        pessoaServices.salvarNova(pessoaNova).then(function (pessoa) {
            if (pessoa) {
                res.status(200);
                res.json(pessoaNova);
                return;
            }

            res.status(400);
            res.send('Ja existe pessoa cadastrada com esse CPF');
        });
    };

    controller.alertar = function (req, res) {
        var cpf = req.params.cpf;

        pessoaServices.gerarAlerta(cpf).then(function (pessoa) {
            if (pessoa) {
                res.status(200);
                res.json(pessoa);
                return;
            }

            res.status(400);
            res.send('Nao existe pessoa com o CPF ' + cpf);
        });
    };

    controller.negativar = function (req, res) {
        var cpf = req.params.cpf;

        pessoaServices.negativar(cpf).then(function (pessoa) {
            if (pessoa) {
                res.status(200);
                res.json(pessoa);
                return;
            }

            res.status(400);
            res.send('Nao existe pessoa com o CPF ' + cpf);
        });
    };

    return controller;
};