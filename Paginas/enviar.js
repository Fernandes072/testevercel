const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');

const app = express();

app.use(express.static('public'));

// Configura o middleware body-parser
app.use(bodyParser.urlencoded({ extended: true }));

// Cria a conexão com o banco de dados
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '123456',
  database: 'atestados'
});

// Verifica a conexão
connection.connect(function(err) {
  if (err) throw err;
  console.log('Conectado ao banco de dados MySQL!');
});

// Cria uma rota para receber os dados do formulário
app.post('/enviar-dados', function(req, res) {
  const nome = req.body.nome;
  const matricula = req.body.matricula;
  const cpf = req.body.cpf;
  const email = req.body.email;
  const telefone = req.body.telefone;
  const curso = req.body.curso;
  const turma = req.body.turma;
  const msg = req.body.msg;

  // Insere os dados no banco de dados
  const sql = "INSERT INTO dados (nome, matricula, cpf, email, telefone, curso, turma, informacoes) VALUES (?,?,?,?,?,?,?,?)";
  connection.query(sql, [nome, matricula, cpf, email, telefone, curso, turma, msg], function(err, result) {
    if (err) throw err;
    console.log('Dados inseridos com sucesso!');
    res.send('Formulário enviado com sucesso!');
  });
});

// Inicia o servidor
app.listen(3001, function() {
  console.log('Servidor iniciado na porta 3001!');
});