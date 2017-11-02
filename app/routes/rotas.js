/**
 * Created by bruno on 02/11/17.
 */

module.exports = function (app) {
    var pessoaController = app.controllers.pessoas;


    app.get('/', pessoaController.index);
    app.get('/api/cadastro-positivo/pessoa/:cpf', pessoaController.buscar);
};