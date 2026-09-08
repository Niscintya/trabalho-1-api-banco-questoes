# API Banco de Questões de Matemática

Projeto desenvolvido para o Trabalho 1 da disciplina de Desenvolvimento de Software.

A aplicação consiste em uma API REST para gerenciamento de questões de Matemática, utilizando Node.js e Express.

## Tecnologias utilizadas

- Node.js
- Express
- Swagger / OpenAPI
- Insomnia
- JavaScript
- Dados armazenados em memória

## Recursos da API

A API possui três recursos principais:

- Questões
- Disciplinas
- Categorias

### Relacionamento

Cada questão possui:

- `disciplinaId`
- `categoriaId`

Também existe a rota relacionada:

`GET /disciplinas/{id}/questoes`

que permite consultar as questões de uma determinada disciplina.

## Funcionalidades

A API possui:

- Listagem de recursos
- Busca por ID
- Criação
- Atualização completa com PUT
- Atualização parcial com PATCH
- Exclusão com DELETE
- Filtro por dificuldade
- Busca por palavra-chave
- Paginação
- Validação de dados
- Tratamento de erros
- Documentação com Swagger

## Como executar o projeto

Instale as dependências:

```bash
npm install