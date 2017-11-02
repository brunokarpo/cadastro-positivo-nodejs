module.exports = function (app) {
    var pessoaServices = app.services.pessoaServices;

    var controller = {};

    controller.index = function (req, res) {
        res.send("esta tudo rodando por aqui");
    };

    controller.buscar = function (req, res) {
        var cpf = req.params.cpf;
        var pessoaProcurada = pessoaServices.buscarPorCpf(cpf);

        if(pessoaProcurada === undefined) {
            res.status(404);
            var mensagem = 'Pessoa com cpf \'' + cpf + '\' nao encontrada';
            res.send(mensagem);
            return;
        }

        res.json(pessoaProcurada);
    }

    return controller;
}