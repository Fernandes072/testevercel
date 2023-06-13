const http = require('http');
const mysql = require('mysql2');

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

  // executar uma consulta
  connection.query(
    'SELECT * FROM dados',
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

// iniciar o servidor
server.listen(3000, () => {
  console.log('Servidor iniciado na porta 3000');
});