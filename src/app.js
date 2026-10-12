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
const notificacoesRoutes = require('./routes/notificacoes.routes');

const erroMiddleware = require('./middlewares/erro.middleware');
const configurarWebSocket = require('./websocket/socket');

const app = express();

// Servidor HTTP compartilhado entre Express e Socket.IO
const server = http.createServer(app);

// Servidor Socket.IO
const io = new Server(server, {
    cors: {
        origin: '*'
    }
});

app.set('io', io);

// Configuração dos eventos em tempo real
configurarWebSocket(io);

// Documentação OpenAPI
const swaggerDocument = YAML.load(
    path.join(__dirname, 'docs/openapi.yaml')
);

app.use(express.json());

// Arquivos públicos
app.use(
    express.static(
        path.join(__dirname, 'public')
    )
);

// Rota inicial
app.get('/', (req, res) => {
    res.json({
        mensagem: 'API Banco de Questões funcionando!',
        documentacao: 'http://localhost:3000/docs',
        websocket: 'Socket.IO ativo',
        testeWebSocket:
            'http://localhost:3000/socket-teste.html'
    });
});

// Health check
app.get('/health', (req, res) => {
    res.status(200).json({
        status: 'ok',
        api: 'online',
        websocket: 'ativo'
    });
});

// Swagger principal exigido no Trabalho 4
app.use(
    '/docs',
    swaggerUi.serve,
    swaggerUi.setup(swaggerDocument)
);

// Mantém a URL antiga funcionando
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
app.use('/notificacoes', notificacoesRoutes);

// Middleware de tratamento de erros
app.use(erroMiddleware);

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
    console.log(
        `Servidor rodando em http://localhost:${PORT}`
    );

    console.log(
        `Swagger disponível em http://localhost:${PORT}/docs`
    );

    console.log(
        `Health check em http://localhost:${PORT}/health`
    );

    console.log(
        `Teste WebSocket em http://localhost:${PORT}/socket-teste.html`
    );

    console.log('Socket.IO ativo');
});