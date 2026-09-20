'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    const agora = new Date();

    // 10 disciplinas
    await queryInterface.bulkInsert('disciplinas', [
      { nome: 'Matemática', createdAt: agora, updatedAt: agora },
      { nome: 'Português', createdAt: agora, updatedAt: agora },
      { nome: 'História', createdAt: agora, updatedAt: agora },
      { nome: 'Geografia', createdAt: agora, updatedAt: agora },
      { nome: 'Física', createdAt: agora, updatedAt: agora },
      { nome: 'Química', createdAt: agora, updatedAt: agora },
      { nome: 'Biologia', createdAt: agora, updatedAt: agora },
      { nome: 'Inglês', createdAt: agora, updatedAt: agora },
      { nome: 'Filosofia', createdAt: agora, updatedAt: agora },
      { nome: 'Sociologia', createdAt: agora, updatedAt: agora }
    ]);

    // 10 categorias
    await queryInterface.bulkInsert('categorias', [
      { nome: 'Álgebra', createdAt: agora, updatedAt: agora },
      { nome: 'Geometria', createdAt: agora, updatedAt: agora },
      { nome: 'Funções', createdAt: agora, updatedAt: agora },
      { nome: 'Porcentagem', createdAt: agora, updatedAt: agora },
      { nome: 'Equações', createdAt: agora, updatedAt: agora },
      { nome: 'Probabilidade', createdAt: agora, updatedAt: agora },
      { nome: 'Estatística', createdAt: agora, updatedAt: agora },
      { nome: 'Matemática Financeira', createdAt: agora, updatedAt: agora },
      { nome: 'Trigonometria', createdAt: agora, updatedAt: agora },
      { nome: 'Raciocínio Lógico', createdAt: agora, updatedAt: agora }
    ]);

    // 10 assuntos
    await queryInterface.bulkInsert('assuntos', [
      { nome: 'Equação do 1º grau', createdAt: agora, updatedAt: agora },
      { nome: 'Equação do 2º grau', createdAt: agora, updatedAt: agora },
      { nome: 'Função afim', createdAt: agora, updatedAt: agora },
      { nome: 'Função quadrática', createdAt: agora, updatedAt: agora },
      { nome: 'Porcentagem', createdAt: agora, updatedAt: agora },
      { nome: 'Juros simples', createdAt: agora, updatedAt: agora },
      { nome: 'Juros compostos', createdAt: agora, updatedAt: agora },
      { nome: 'Área de figuras planas', createdAt: agora, updatedAt: agora },
      { nome: 'Teorema de Pitágoras', createdAt: agora, updatedAt: agora },
      { nome: 'Estatística básica', createdAt: agora, updatedAt: agora }
    ]);

    // 10 questões
    await queryInterface.bulkInsert('questoes', [
      {
        enunciado: 'Resolva a equação 2x + 6 = 18.',
        disciplinaId: 1,
        categoriaId: 1,
        dificuldade: 'facil',
        createdAt: agora,
        updatedAt: agora
      },
      {
        enunciado: 'Determine as raízes da equação x² - 5x + 6 = 0.',
        disciplinaId: 1,
        categoriaId: 5,
        dificuldade: 'media',
        createdAt: agora,
        updatedAt: agora
      },
      {
        enunciado: 'Uma função é dada por f(x) = 3x + 2. Determine f(4).',
        disciplinaId: 1,
        categoriaId: 3,
        dificuldade: 'facil',
        createdAt: agora,
        updatedAt: agora
      },
      {
        enunciado: 'Determine o vértice da função f(x) = x² - 4x + 3.',
        disciplinaId: 1,
        categoriaId: 3,
        dificuldade: 'media',
        createdAt: agora,
        updatedAt: agora
      },
      {
        enunciado: 'Calcule 20% de 250.',
        disciplinaId: 1,
        categoriaId: 4,
        dificuldade: 'facil',
        createdAt: agora,
        updatedAt: agora
      },
      {
        enunciado: 'Calcule o montante de uma aplicação de R$ 1.000,00 a juros simples.',
        disciplinaId: 1,
        categoriaId: 8,
        dificuldade: 'media',
        createdAt: agora,
        updatedAt: agora
      },
      {
        enunciado: 'Calcule a área de um retângulo com 8 cm de comprimento e 5 cm de largura.',
        disciplinaId: 1,
        categoriaId: 2,
        dificuldade: 'facil',
        createdAt: agora,
        updatedAt: agora
      },
      {
        enunciado: 'Um triângulo retângulo possui catetos medindo 3 cm e 4 cm. Determine a hipotenusa.',
        disciplinaId: 1,
        categoriaId: 2,
        dificuldade: 'facil',
        createdAt: agora,
        updatedAt: agora
      },
      {
        enunciado: 'Determine a média aritmética dos números 6, 8, 10 e 12.',
        disciplinaId: 1,
        categoriaId: 7,
        dificuldade: 'facil',
        createdAt: agora,
        updatedAt: agora
      },
      {
        enunciado: 'Uma mercadoria custa R$ 200,00 e recebeu desconto de 15%. Qual é o novo preço?',
        disciplinaId: 1,
        categoriaId: 4,
        dificuldade: 'media',
        createdAt: agora,
        updatedAt: agora
      }
    ]);

    // Relacionamento N:N entre questões e assuntos
    await queryInterface.bulkInsert('questao_assuntos', [
      { questaoId: 1, assuntoId: 1, createdAt: agora, updatedAt: agora },
      { questaoId: 2, assuntoId: 2, createdAt: agora, updatedAt: agora },
      { questaoId: 3, assuntoId: 3, createdAt: agora, updatedAt: agora },
      { questaoId: 4, assuntoId: 4, createdAt: agora, updatedAt: agora },
      { questaoId: 5, assuntoId: 5, createdAt: agora, updatedAt: agora },
      { questaoId: 6, assuntoId: 6, createdAt: agora, updatedAt: agora },
      { questaoId: 7, assuntoId: 8, createdAt: agora, updatedAt: agora },
      { questaoId: 8, assuntoId: 9, createdAt: agora, updatedAt: agora },
      { questaoId: 9, assuntoId: 10, createdAt: agora, updatedAt: agora },
      { questaoId: 10, assuntoId: 5, createdAt: agora, updatedAt: agora }
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('questao_assuntos', null, {});
    await queryInterface.bulkDelete('questoes', null, {});
    await queryInterface.bulkDelete('assuntos', null, {});
    await queryInterface.bulkDelete('categorias', null, {});
    await queryInterface.bulkDelete('disciplinas', null, {});
  }
};