const express = require('express');
const cors = require('cors');

const app = express();
const port = 3000;
const router = require(__dirname + '/routes/router');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', router);

app.listen(port, function (err) {
    if (err)
        console.log(err);
    else {
        console.log('Servidor escutando a porta: ', port);
    }
});
