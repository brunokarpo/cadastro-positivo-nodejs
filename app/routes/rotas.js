/**
 * Created by bruno on 02/11/17.
 */

module.exports = function (app) {
    var pessoaController = app.controllers.pessoas;


    app.get('/', pessoaController.index);
    app.get('/api/cadastro-positivo/pessoa/:cpf', pessoaController.buscar);
    app.post('/api/cadastro-positivo/pessoa', pessoaController.criarNova);
    app.post('/api/cadastro-positivo/pessoa/:cpf/alerta', pessoaController.alertar);
    app.post('/api/cadastro-positivo/pessoa/:cpf/negativa', pessoaController.negativar);
};