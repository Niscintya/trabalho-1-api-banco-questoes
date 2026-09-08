const express = require('express');
const swaggerUi = require('swagger-ui-express');
const fs = require('fs');
const yaml = require('yaml');

const questoesRoutes = require('./routes/questoes.routes');
const disciplinasRoutes = require('./routes/disciplinas.routes');
const categoriasRoutes = require('./routes/categorias.routes');

const erroMiddleware = require('./middlewares/erro.middleware');

const app = express();

app.use(express.json());

// Rotas da API
app.use('/questoes', questoesRoutes);
app.use('/disciplinas', disciplinasRoutes);
app.use('/categorias', categoriasRoutes);

// Documentação Swagger
const arquivoSwagger = fs.readFileSync(
    './src/docs/openapi.yaml',
    'utf8'
);

const swaggerDocument = yaml.parse(arquivoSwagger);

app.use(
    '/docs',
    swaggerUi.serve,
    swaggerUi.setup(swaggerDocument)
);

// Rota inicial
app.get('/', (req, res) => {
    res.status(200).json({
        mensagem: 'API Banco de Questões funcionando!'
    });
});

// Middleware centralizado de erros
app.use(erroMiddleware);

// Servidor
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});