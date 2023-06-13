const http = require('http');
const mysql = require('mysql2');
const url = require('url');

// criar uma conexão com o banco de dados
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '123456',
  database: 'atestados',
  port: '3306'
});

// criar o servidor HTTP
const server = http.createServer((req, res) => {
  // habilitar o CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // obter o código do parâmetro da URL
  const queryObject = url.parse(req.url, true).query;
  const codigo = queryObject.codigo;

  // executar a instrução DELETE
  connection.query(
    'DELETE FROM dados WHERE codigo = ?',
    [codigo],
    function(err, results, fields) {
      if (err) {
        console.error(err);
        res.statusCode = 500;
        res.end('Erro interno do servidor');
        return;
      }
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify(results));
    }
  );
});

// iniciar o servidor na porta 3000
server.listen(3002, () => {
  console.log('Servidor iniciado na porta 3002');
});