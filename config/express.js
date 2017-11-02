const express = require('express');
const load = require('express-load');

module.exports = function () {
    var app = express();
    var rotas = require('../app/routes/rotas');
    var bodyParser = require('body-parser');

    app.set('port', 3000);

    app.use(bodyParser.json());

    load('models', {cwd: 'app'})
        .then('services')
        .then('controllers')
        .then('routes')
        .into(app);

    return app;
};