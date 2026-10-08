# Plano do Trabalho 4

## Projeto Final

**Sistema de Acompanhamento de Questões com Notificações ao Vivo**

## Opção escolhida

Opção 3 – Sistema de Acompanhamento com Notificações ao Vivo.

O projeto será uma evolução da API de Banco de Questões desenvolvida nos trabalhos anteriores.

A proposta é permitir acompanhar a criação, atualização, exclusão e mudança de status das questões em tempo real.

---

## 1. Objetivo

O objetivo do projeto é transformar o Banco de Questões em uma aplicação web completa, com API REST, persistência em PostgreSQL, arquitetura em camadas, comunicação em tempo real e interface React.

Os usuários poderão acompanhar as questões de uma disciplina e receber atualizações sem precisar recarregar a página.

---

## 2. Domínio escolhido

O domínio será o acompanhamento de questões de um banco de questões educacionais.

As questões poderão possuir estados como:

```text
rascunho
em_revisao
aprovada
```

Quando o status de uma questão mudar, os usuários que estiverem acompanhando aquela disciplina receberão uma notificação em tempo real.

---

## 3. Recursos principais

O sistema continuará utilizando os recursos já existentes:

```text
Questões
Disciplinas
Categorias
Assuntos
```

Também será criado o recurso:

```text
Notificações
```

As notificações serão persistidas no banco de dados.

---

## 4. Banco de dados

O projeto utilizará PostgreSQL com Sequelize ORM.

Tabelas principais:

```text
disciplinas
categorias
assuntos
questoes
questao_assuntos
notificacoes
```

A tabela `questoes` também será evoluída para possuir um campo de status.

Exemplo:

```text
status = rascunho
status = em_revisao
status = aprovada
```

A tabela `notificacoes` poderá armazenar informações como:

```text
id
mensagem
tipo
questaoId
disciplinaId
lida
created_at
updated_at
```

---

## 5. Arquitetura

Será mantida a arquitetura consolidada no Trabalho 3:

```text
Routes
   ↓
Controllers
   ↓
Services
   ↓
Repositories
   ↓
Models / Sequelize
   ↓
PostgreSQL
```

Também serão mantidos os padrões já utilizados:

```text
Repository
Injeção de Dependência
DTO
```

A comunicação em tempo real será organizada em uma camada WebSocket.

Estrutura prevista:

```text
src/
├── config/
├── controllers/
├── dtos/
├── middlewares/
├── repositories/
├── routes/
├── services/
├── websocket/
└── app.js
```

---

## 6. Comunicação em tempo real

Será utilizado Socket.IO.

Os clientes poderão entrar em salas relacionadas às disciplinas.

Exemplo:

```text
disciplina:1
disciplina:2
disciplina:3
```

Dessa forma, uma atualização relacionada à disciplina 1 será enviada apenas aos clientes que estiverem acompanhando essa sala.

---

## 7. Eventos WebSocket

Já foram implementados eventos relacionados à entrada e saída de salas e às alterações de questões.

Eventos previstos:

```text
entrar_sala
sair_sala
sala_entrada_confirmada
sala_saida_confirmada
participantes_atualizados
questao_criada
questao_atualizada
questao_excluida
status_questao_alterado
notificacao_nova
erro_socket
```

O servidor deverá validar todas as mensagens recebidas antes de processá-las.

Também será tratado o processo de conexão, desconexão e reconexão dos clientes.

---

## 8. Interface

O front-end será desenvolvido em React com Vite.

A aplicação possuirá componentes como:

```text
StatusConexao
EntrarSala
ParticipantesConectados
PainelTempoReal
ListaQuestoes
CentralNotificacoes
FiltrosQuestoes
```

Já foram implementados os componentes:

```text
StatusConexao
EntrarSala
ParticipantesConectados
PainelTempoReal
```

O painel já reage aos eventos:

```text
questao_criada
questao_atualizada
questao_excluida
```

sem necessidade de atualizar a página.

---

## 9. Funcionalidades planejadas

### Questões

- listar questões;
- buscar por ID;
- criar questão;
- atualizar questão;
- excluir questão;
- alterar status;
- filtrar por dificuldade;
- filtrar por disciplina;
- realizar busca por palavra-chave.

### Tempo real

- entrada em salas;
- saída de salas;
- lista de participantes;
- atualização automática do painel;
- aviso de questão criada;
- aviso de questão atualizada;
- aviso de questão excluída;
- aviso de mudança de status;
- novas notificações em tempo real.

### Notificações

- criar notificação;
- listar notificações;
- marcar como lida;
- manter histórico no banco;
- atualizar a central de notificações em tempo real.

---

## 10. Fluxo de uma alteração

Exemplo de mudança de status:

```text
Usuário altera status da questão
          ↓
API REST
          ↓
Controller
          ↓
Service
          ↓
Repository
          ↓
PostgreSQL
          ↓
Notificação criada
          ↓
Socket.IO
          ↓
Sala da disciplina
          ↓
React recebe o evento
          ↓
Painel atualizado automaticamente
```

---

## 11. Organização do trabalho em equipe

O desenvolvimento será realizado de forma incremental.

### Etapa 1 – WebSocket

- integrar Socket.IO ao servidor;
- implementar emissão e escuta de eventos;
- implementar salas;
- testar com dois clientes.

### Etapa 2 – Interface

- criar front-end React;
- criar componentes que reagem aos eventos;
- mostrar participantes conectados;
- mostrar painel em tempo real.

### Etapa 3 – Status e notificações

- adicionar status às questões;
- criar tabela de notificações;
- criar endpoints de notificações;
- emitir evento quando o status mudar;
- implementar central de notificações.

### Etapa 4 – Integração completa

- carregar questões pela API;
- implementar filtros;
- implementar busca;
- sincronizar o painel com WebSocket.

### Etapa 5 – Docker

- criar Dockerfile;
- criar `.dockerignore`;
- criar `docker-compose.yml`;
- subir aplicação e PostgreSQL juntos;
- configurar variáveis de ambiente;
- criar endpoint `/health`.

### Etapa 6 – Testes e documentação

- testar com dois clientes simultâneos;
- testar reconexão;
- testar API REST;
- testar WebSocket;
- atualizar OpenAPI;
- atualizar README;
- atualizar ARQUITETURA.md;
- testar o projeto a partir de uma instalação limpa.

---

## 12. Possível divisão entre integrantes

A divisão poderá ser feita da seguinte maneira:

### Integrante 1

Backend e persistência:

```text
migrations
models
repositories
services
notificações
```

### Integrante 2

WebSocket e integração:

```text
Socket.IO
salas
eventos
reconexão
sincronização
```

### Integrante 3

Front-end e documentação:

```text
React
componentes
painel
central de notificações
README
documentação
```

As alterações devem ser integradas e testadas em conjunto.

---

## 13. Estratégia de desenvolvimento

O projeto será desenvolvido em etapas pequenas.

Depois de cada alteração:

```text
implementar
   ↓
testar
   ↓
registrar no Git
   ↓
integrar
```

Essa estratégia reduz o risco de quebrar funcionalidades que já estavam funcionando nos trabalhos anteriores.

---

## 14. Entrega final esperada

Ao final, o sistema deverá permitir que dois ou mais usuários acompanhem questões de uma disciplina ao mesmo tempo.

Quando uma questão for criada, alterada, excluída ou tiver seu status modificado, a interface deverá ser atualizada automaticamente.

A aplicação deverá reunir:

```text
React
+
API REST
+
Socket.IO
+
Sequelize
+
PostgreSQL
+
Docker
+
Docker Compose
```

O objetivo é que toda a aplicação possa ser iniciada com um único comando utilizando Docker Compose.