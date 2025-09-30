const express = require('express');

const app = express();
const port = 3000;
const router = require(__dirname + '/routes/router');

const path = require('path');
const bodyParser = require('body-parser'); //capturar dados do formulário
// //View engine que vai renderizar as páginas
// app.set('view engine', 'ejs');
// //pastas que vai ficar os templates para serem renderizados.
// //app.set("views", path.join(__dirname) + "\\src\\view");
// app.set("views", path.join(__dirname) + '/src/view');
//ler dados dos formularios

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//passa as rotas para o aquivo router
app.use('/', router);

//deixa o servidor no ar
app.listen(port, function (err) {
    if (err)
        console.log(err);
    else {
        console.log('Servidor escutando a porta: ', port);
    }
});
