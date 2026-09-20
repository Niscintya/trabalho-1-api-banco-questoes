const express = require('express');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const path = require('path');

const questoesRoutes = require('./routes/questoes.routes');
const disciplinasRoutes = require('./routes/disciplinas.routes');
const categoriasRoutes = require('./routes/categorias.routes');
const assuntosRoutes = require('./routes/assuntos.routes');

const erroMiddleware = require('./middlewares/erro.middleware');

const app = express();

// Carrega a documentação OpenAPI
const swaggerDocument = YAML.load(
   path.join(__dirname, 'docs/openapi.yaml')
);

app.use(express.json());

// Rota inicial
app.get('/', (req, res) => {
    res.json({
        mensagem: 'API Banco de Questões funcionando!',
        documentacao: 'http://localhost:3000/api-docs'
    });
});

// Documentação Swagger
app.use(
    '/api-docs',
    swaggerUi.serve,
    swaggerUi.setup(swaggerDocument)
);

// Rotas da API
app.use('/questoes', questoesRoutes);
app.use('/disciplinas', disciplinasRoutes);
app.use('/categorias', categoriasRoutes);
app.use('/assuntos', assuntosRoutes);

// Middleware de tratamento de erros
app.use(erroMiddleware);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
    console.log(`Swagger disponível em http://localhost:${PORT}/api-docs`);
});