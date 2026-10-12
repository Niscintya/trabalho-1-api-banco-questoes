# Sistema de Acompanhamento de Questões com Notificações ao Vivo

Projeto desenvolvido para a disciplina de Desenvolvimento de Software.

O sistema evolui o Banco de Questões desenvolvido nos trabalhos anteriores, integrando API REST, PostgreSQL, Sequelize ORM, arquitetura em camadas, React, Socket.IO e Docker.

Nesta etapa, além do CRUD dos recursos educacionais, a aplicação possui comunicação em tempo real, acompanhamento do status das questões, notificações persistentes e interface web responsiva.

## Trabalho 4

Tema escolhido:

**Opção 3 — Sistema de Acompanhamento de Questões com Notificações ao Vivo**

O sistema permite acompanhar alterações realizadas nas questões sem precisar atualizar manualmente a página.

As questões podem assumir os seguintes status:

- `rascunho`
- `em_revisao`
- `aprovada`

Quando o status de uma questão é alterado, o sistema registra uma notificação no PostgreSQL e envia eventos em tempo real aos usuários conectados à sala da disciplina.

## Tecnologias utilizadas

- Node.js
- Express
- React
- Vite
- Socket.IO
- PostgreSQL
- Sequelize ORM
- Sequelize CLI
- Swagger / OpenAPI
- Docker
- Docker Compose
- JavaScript
- dotenv

## Recursos principais

A aplicação possui os seguintes recursos:

- Questões
- Disciplinas
- Categorias
- Assuntos
- Notificações

Além dos recursos REST, a aplicação utiliza WebSockets para comunicação em tempo real.

## Funcionalidades

O sistema permite:

- cadastrar, consultar, atualizar e excluir questões;
- cadastrar e gerenciar disciplinas, categorias e assuntos;
- relacionar questões a vários assuntos;
- pesquisar questões pelo enunciado;
- filtrar questões por dificuldade e status;
- acompanhar alterações em tempo real;
- entrar em salas organizadas por disciplina;
- visualizar participantes conectados;
- alterar o status de uma questão;
- gerar notificações persistentes;
- marcar notificações como lidas;
- recuperar notificações após recarregar a página;
- reconectar automaticamente ao WebSocket;
- retornar automaticamente à sala após reconexão;
- executar toda a aplicação com Docker Compose.

## Modelo de dados

O banco PostgreSQL possui as seguintes tabelas principais:

```text
disciplinas
categorias
assuntos
questoes
questao_assuntos
notificacoes
```

A tabela `questao_assuntos` implementa o relacionamento muitos-para-muitos entre questões e assuntos.

A tabela `notificacoes` mantém o histórico das notificações mesmo após o servidor ser reiniciado.

## Relacionamentos

```text
Disciplina 1:N Questões

Categoria 1:N Questões

Questões N:N Assuntos

Disciplina 1:N Notificações

Questão 1:N Notificações
```

## Status das questões

O campo `status` possui três valores permitidos:

```text
rascunho
em_revisao
aprovada
```

O valor padrão de uma nova questão é:

```text
rascunho
```

A API valida o status antes de atualizar a questão.

## Notificações persistentes

As notificações são armazenadas na tabela:

```text
notificacoes
```

Cada notificação possui informações como:

```text
id
mensagem
tipo
lida
questaoId
disciplinaId
created_at
updated_at
```

Uma notificação pode ser marcada como lida e continuará com esse estado mesmo após atualizar a página ou reiniciar a aplicação.

## WebSockets

A comunicação em tempo real é implementada com Socket.IO.

Os usuários entram em salas organizadas por disciplina.

Exemplo:

```text
disciplina:1
```

Isso permite que os eventos sejam enviados somente aos usuários que acompanham aquela disciplina.

### Eventos principais

A aplicação utiliza, entre outros, os seguintes eventos:

```text
questao_criada
questao_atualizada
questao_excluida
status_questao_alterado
notificacao_nova
```

Também são utilizados eventos para gerenciamento das salas e participantes:

```text
entrar_sala
sair_sala
sala_entrada_confirmada
sala_saida_confirmada
participantes_atualizados
erro_socket
```

### Evento `questao_criada`

Emitido quando uma nova questão é cadastrada.

Exemplo de payload:

```json
{
  "id": 15,
  "enunciado": "Calcule 20% de 300.",
  "disciplinaId": 1,
  "categoriaId": 4,
  "dificuldade": "facil",
  "status": "rascunho"
}
```

### Evento `status_questao_alterado`

Emitido quando o status de uma questão muda.

Exemplo:

```json
{
  "questaoId": 12,
  "disciplinaId": 1,
  "statusAnterior": "rascunho",
  "statusAtual": "em_revisao"
}
```

### Evento `notificacao_nova`

Envia ao frontend a nova notificação criada e persistida no banco.

## Reconexão

O cliente Socket.IO está configurado para tentar reconectar automaticamente caso a conexão seja interrompida.

Após a reconexão, o usuário é inserido novamente na sala da disciplina que estava acompanhando.

Dessa forma, o sistema continua recebendo os eventos sem exigir que o usuário atualize a página.

## Frontend React

A interface foi desenvolvida com React e Vite.

Entre os componentes principais estão:

```text
StatusConexao
EntrarSala
ParticipantesConectados
ListaQuestoes
PainelTempoReal
CentroNotificacoes
```

A interface apresenta:

- status da conexão;
- sala atual;
- participantes conectados;
- questões cadastradas;
- busca e filtro por status;
- contadores de eventos;
- últimos eventos recebidos;
- notificações persistentes;
- indicação de notificações lidas e não lidas.

## Arquitetura

A aplicação segue arquitetura em camadas.

O fluxo principal é:

```text
Route
  ↓
Controller
  ↓
Service
  ↓
Repository
  ↓
Models / Sequelize
  ↓
PostgreSQL
```

O projeto mantém o acesso ao banco concentrado nos repositories.

Os controllers não acessam diretamente o Sequelize.

## Padrões utilizados

Entre os padrões aplicados estão:

### Repository

Responsável por concentrar o acesso ao banco de dados.

### Dependency Injection

Os repositories são injetados nos services por meio de:

```text
src/config/container.js
```

### DTO

Os dados recebidos pelas rotas de questões são organizados antes de chegar à camada de serviço.

Arquivo:

```text
src/dtos/questao.dto.js
```

## Estrutura principal

```text
Trabalho 1 API/
│
├── config/
│   └── config.js
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── services/
│   │   └── App.jsx
│   └── package.json
│
├── migrations/
│
├── models/
│   ├── index.js
│   ├── questao.js
│   ├── disciplina.js
│   ├── categoria.js
│   ├── assunto.js
│   └── notificacao.js
│
├── seeders/
│
├── src/
│   ├── config/
│   ├── controllers/
│   ├── docs/
│   │   └── openapi.yaml
│   ├── dtos/
│   ├── middlewares/
│   ├── public/
│   ├── repositories/
│   ├── routes/
│   ├── services/
│   ├── websocket/
│   └── app.js
│
├── Dockerfile
├── docker-compose.yml
├── .dockerignore
├── .env.example
├── ARQUITETURA.md
├── package.json
└── README.md
```

## Docker

A aplicação pode ser executada completamente com Docker Compose.

São criados dois serviços:

```text
app
db
```

O serviço `app` contém:

```text
Node.js
Express
Socket.IO
Frontend React compilado
```

O serviço `db` utiliza PostgreSQL.

O banco possui volume persistente para que os dados não sejam perdidos ao reiniciar os containers.

## Como executar com Docker

### 1. Clonar o repositório

```bash
git clone URL_DO_REPOSITORIO
```

Entre na pasta:

```bash
cd trabalho-1-api-banco-questoes
```

### 2. Subir a aplicação

```bash
docker compose up --build
```

O Docker aguarda o PostgreSQL ficar saudável, executa as migrations, executa o seed inicial e inicia a aplicação.

### 3. Acessar o sistema

Frontend e backend:

```text
http://localhost:3000
```

Swagger:

```text
http://localhost:3000/docs
```

Health check:

```text
http://localhost:3000/health
```

### 4. Encerrar

```bash
docker compose down
```

### 5. Limpeza completa

Para remover também o volume do PostgreSQL:

```bash
docker compose down -v
```

Depois é possível testar novamente como uma instalação limpa:

```bash
docker compose up --build
```

## Health check

A aplicação possui:

```text
GET /health
```

Exemplo de resposta:

```json
{
  "status": "ok",
  "api": "online",
  "websocket": "ativo"
}
```

O PostgreSQL e a aplicação possuem health checks configurados no Docker Compose.

## Swagger / OpenAPI

A documentação interativa está disponível em:

```text
http://localhost:3000/docs
```

A rota antiga também foi mantida:

```text
http://localhost:3000/api-docs
```

O Swagger documenta questões, disciplinas, categorias, assuntos, notificações, filtros e alteração de status.

## Principais endpoints

### Questões

```text
GET    /questoes
GET    /questoes/:id
POST   /questoes
PUT    /questoes/:id
PATCH  /questoes/:id
DELETE /questoes/:id
```

Exemplos de filtros:

```text
GET /questoes?dificuldade=facil
GET /questoes?status=em_revisao
GET /questoes?busca=porcentagem
GET /questoes?status=aprovada&busca=porcentagem
```

### Disciplinas

```text
GET    /disciplinas
GET    /disciplinas/:id
POST   /disciplinas
PUT    /disciplinas/:id
PATCH  /disciplinas/:id
DELETE /disciplinas/:id

GET /disciplinas/:id/questoes
```

### Categorias

```text
GET    /categorias
GET    /categorias/:id
POST   /categorias
PUT    /categorias/:id
PATCH  /categorias/:id
DELETE /categorias/:id
```

### Assuntos

```text
GET    /assuntos
GET    /assuntos/:id
POST   /assuntos
PUT    /assuntos/:id
PATCH  /assuntos/:id
DELETE /assuntos/:id
```

### Notificações

```text
GET    /notificacoes
POST   /notificacoes
GET    /notificacoes/:id
DELETE /notificacoes/:id

PATCH /notificacoes/:id/marcar-como-lida
PATCH /notificacoes/marcar-todas-como-lidas
```

## Exemplo de alteração de status

```text
PATCH /questoes/12
```

Body:

```json
{
  "status": "aprovada"
}
```

Quando o status muda, o sistema:

```text
1. atualiza a questão no PostgreSQL;
2. cria uma notificação persistente;
3. emite questao_atualizada;
4. emite status_questao_alterado;
5. emite notificacao_nova;
6. atualiza os clientes conectados em tempo real.
```

## Migrations

A estrutura do banco é controlada por migrations do Sequelize.

Entre as migrations existentes estão:

```text
criação das disciplinas
criação das categorias
criação das questões
criação dos assuntos
criação de questao_assuntos
padronização dos campos de auditoria
adição do status das questões
criação das notificações
```

No Docker, as migrations são executadas automaticamente na inicialização.

Execução manual:

```bash
npm run migrate
```

## Seed

Existe um seed com dados iniciais para disciplinas, categorias, assuntos, questões e relacionamentos.

Execução manual:

```bash
npm run seed
```

O Sequelize registra a execução do seeder para evitar sua repetição nas reinicializações seguintes.

## Transações

A criação e atualização de questões com assuntos utiliza transações do Sequelize.

Em caso de falha, é realizado rollback, evitando registros parciais no banco.

## Tratamento de erros

A aplicação possui middleware centralizado de erros.

Entre os códigos HTTP utilizados estão:

```text
200 - operação realizada com sucesso
201 - recurso criado
204 - recurso excluído
400 - dados inválidos
404 - recurso não encontrado
409 - conflito ou integridade
500 - erro interno
```

## Segurança das configurações

Credenciais reais não são versionadas.

O arquivo:

```text
.env
```

está fora do repositório.

O projeto disponibiliza apenas:

```text
.env.example
```

como referência para configuração.

## Testes realizados

Durante o desenvolvimento foram realizados testes com dois clientes conectados simultaneamente.

Foi validado que:

```text
dois usuários podem entrar na mesma sala;
a lista de participantes é sincronizada;
criações de questões aparecem sem recarregar;
alterações aparecem sem recarregar;
exclusões aparecem sem recarregar;
mudanças de status aparecem em tempo real;
notificações são recebidas em tempo real;
notificações permanecem no PostgreSQL;
o estado lida permanece após recarregar;
o cliente reconecta automaticamente;
o cliente retorna à sala após reconexão;
Docker Compose sobe aplicação e PostgreSQL;
o frontend é servido pelo backend na porta 3000;
o health check responde corretamente;
o Swagger está disponível em /docs.
```

## Documentação arquitetural

Mais detalhes sobre as decisões arquiteturais estão disponíveis em:

```text
ARQUITETURA.md
docs/adr/
```

## Execução final esperada

A partir de um clone limpo do repositório, o principal comando para iniciar todo o sistema é:

```bash
docker compose up --build
```

Após a inicialização:

```text
Aplicação: http://localhost:3000
Swagger:   http://localhost:3000/docs
Health:    http://localhost:3000/health
```