/**
 * Created by bruno on 02/11/17.
 */
function Negativacao(cpf) {
    this.cpf = cpf;
    this.timestamp = new Date().getTime();
};

module.exports = function (app) {
    var negativacao1 = new Negativacao('73306718351');

    var negativacoes = [negativacao1];

    var negativacaoModel = {};

    negativacaoModel.save = function(cpf) {
        // TODO integrar com o mongo
        // colocando na lista estática por enquanto;
        negativacoes.push(new Negativacao(cpf));
    };

    negativacaoModel.findByCpf = function(cpf) {
        // TODO integrar com o mongo
        // procurando na lista estática por enquanto;
        return negativacoes.filter(function (negativacao) {
            return negativacao.cpf === cpf;
        });
    };

    return negativacaoModel;
};