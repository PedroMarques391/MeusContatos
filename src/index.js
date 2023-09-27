const express = require('express');
const routes = require('./routes');
require('express-async-errors')

const app = express();

app.use(express.json());

app.use(routes);

app.use((error, request, response, next) => {
    console.log(error);
    response.sendDate(500);
});

app.listen(3000, () => console.log('Servidor ativo em http://localhost:3000'));
