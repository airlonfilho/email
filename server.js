const express = require('express');
const server = express();
var nodemailer = require("nodemailer");

server.use(express.json());

var remetente = nodemailer.createTransport({
    host: "smtp.gmail.com",
    service: "gmail",
    port: 465,
    secure: false,
    auth: {
        user: "astonmedsendmail@gmail.com",
        pass: "bIDkwp5g"
    }
});

server.post('/', (req, res) => {

    var text = req.body.text;
    req.body.text = `<br> ${req.body.nome} enviu um email pelo site com as seguintes informações:<br>` +
    `Nome: ${req.body.nome} <br>` +
    `Email: ${req.body.email} <br>` +
    `Telefone: ${req.body.telefone} <br>` +
    `Mensagem: ${text} <br>`;

    var emailASerEnviado = req.body;
    emailASerEnviado.from = "astonmedsendmail@gmail.com";
    emailASerEnviado.to = "filhoairlon@gmail.com";
    emailASerEnviado.subject = "Email enviado pelo site";
    emailASerEnviado.html = req.body.text;

    remetente.sendMail(emailASerEnviado, function (error) {
        if (error) {
            console.log(error);
        } else {
            console.log("Email enviado com sucesso.");
        }
    });
    
    var message = "Email enviado com sucesso!"
    return res.json(message);
})

server.listen(3000);