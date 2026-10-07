const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const path = require('path');

const questoesRoutes = require('./routes/questoes.routes');
const disciplinasRoutes = require('./routes/disciplinas.routes');
const categoriasRoutes = require('./routes/categorias.routes');
const assuntosRoutes = require('./routes/assuntos.routes');

const erroMiddleware = require('./middlewares/erro.middleware');
const configurarWebSocket = require('./websocket/socket');

const app = express();

// Cria o servidor HTTP compartilhado entre Express e Socket.IO
const server = http.createServer(app);

// Cria o servidor Socket.IO
const io = new Server(server, {
    cors: {
        origin: '*'
    }
});
app.set('io', io);
// Configura os eventos em tempo real
configurarWebSocket(io);

// Carrega a documentação OpenAPI
const swaggerDocument = YAML.load(
    path.join(__dirname, 'docs/openapi.yaml')
);

app.use(express.json());

// Disponibiliza os arquivos da pasta public
app.use(
    express.static(
        path.join(__dirname, 'public')
    )
);

// Rota inicial
app.get('/', (req, res) => {
    res.json({
        mensagem: 'API Banco de Questões funcionando!',
        documentacao: 'http://localhost:3000/api-docs',
        websocket: 'Socket.IO ativo',
        testeWebSocket: 'http://localhost:3000/socket-teste.html'
    });
});

// Documentação Swagger
app.use(
    '/api-docs',
    swaggerUi.serve,
    swaggerUi.setup(swaggerDocument)
);

// Rotas REST
app.use('/questoes', questoesRoutes);
app.use('/disciplinas', disciplinasRoutes);
app.use('/categorias', categoriasRoutes);
app.use('/assuntos', assuntosRoutes);

// Middleware de tratamento de erros
app.use(erroMiddleware);

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
    console.log(`Swagger disponível em http://localhost:${PORT}/api-docs`);
    console.log(`Teste WebSocket em http://localhost:${PORT}/socket-teste.html`);
    console.log('Socket.IO ativo');
});