# ADR 001 - Adoção de Arquitetura em Camadas

## Contexto

A API do Banco de Questões foi desenvolvida inicialmente com foco no funcionamento dos endpoints.

Com a evolução do projeto, algumas responsabilidades estavam próximas demais, principalmente entre controllers e acesso aos dados.

Isso dificultava a separação das regras de negócio e aumentava o acoplamento entre partes da aplicação.

Também havia a necessidade de tornar o projeto mais fácil de manter, testar e evoluir.

## Decisão

Foi adotada uma arquitetura em camadas com a seguinte organização:

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