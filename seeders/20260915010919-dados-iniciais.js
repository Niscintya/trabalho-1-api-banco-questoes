'use strict';

module.exports = {
    async up(queryInterface, _Sequelize) {
        const agora = new Date();

        // 10 disciplinas
        await queryInterface.bulkInsert('disciplinas', [
            { nome: 'Matemática', created_at: agora, updated_at: agora },
            { nome: 'Português', created_at: agora, updated_at: agora },
            { nome: 'História', created_at: agora, updated_at: agora },
            { nome: 'Geografia', created_at: agora, updated_at: agora },
            { nome: 'Física', created_at: agora, updated_at: agora },
            { nome: 'Química', created_at: agora, updated_at: agora },
            { nome: 'Biologia', created_at: agora, updated_at: agora },
            { nome: 'Inglês', created_at: agora, updated_at: agora },
            { nome: 'Filosofia', created_at: agora, updated_at: agora },
            { nome: 'Sociologia', created_at: agora, updated_at: agora }
        ]);

        // 10 categorias
        await queryInterface.bulkInsert('categorias', [
            { nome: 'Álgebra', created_at: agora, updated_at: agora },
            { nome: 'Geometria', created_at: agora, updated_at: agora },
            { nome: 'Funções', created_at: agora, updated_at: agora },
            { nome: 'Porcentagem', created_at: agora, updated_at: agora },
            { nome: 'Equações', created_at: agora, updated_at: agora },
            { nome: 'Probabilidade', created_at: agora, updated_at: agora },
            { nome: 'Estatística', created_at: agora, updated_at: agora },
            { nome: 'Matemática Financeira', created_at: agora, updated_at: agora },
            { nome: 'Trigonometria', created_at: agora, updated_at: agora },
            { nome: 'Raciocínio Lógico', created_at: agora, updated_at: agora }
        ]);

        // 10 assuntos
        await queryInterface.bulkInsert('assuntos', [
            { nome: 'Equação do 1º grau', created_at: agora, updated_at: agora },
            { nome: 'Equação do 2º grau', created_at: agora, updated_at: agora },
            { nome: 'Função afim', created_at: agora, updated_at: agora },
            { nome: 'Função quadrática', created_at: agora, updated_at: agora },
            { nome: 'Porcentagem', created_at: agora, updated_at: agora },
            { nome: 'Juros simples', created_at: agora, updated_at: agora },
            { nome: 'Juros compostos', created_at: agora, updated_at: agora },
            { nome: 'Área de figuras planas', created_at: agora, updated_at: agora },
            { nome: 'Teorema de Pitágoras', created_at: agora, updated_at: agora },
            { nome: 'Estatística básica', created_at: agora, updated_at: agora }
        ]);

        // 10 questões
        await queryInterface.bulkInsert('questoes', [
            {
                enunciado: 'Resolva a equação 2x + 6 = 18.',
                disciplinaId: 1,
                categoriaId: 1,
                dificuldade: 'facil',
                status: 'rascunho',
                created_at: agora,
                updated_at: agora
            },
            {
                enunciado: 'Determine as raízes da equação x² - 5x + 6 = 0.',
                disciplinaId: 1,
                categoriaId: 5,
                dificuldade: 'media',
                status: 'rascunho',
                created_at: agora,
                updated_at: agora
            },
            {
                enunciado: 'Uma função é dada por f(x) = 3x + 2. Determine f(4).',
                disciplinaId: 1,
                categoriaId: 3,
                dificuldade: 'facil',
                status: 'rascunho',
                created_at: agora,
                updated_at: agora
            },
            {
                enunciado: 'Determine o vértice da função f(x) = x² - 4x + 3.',
                disciplinaId: 1,
                categoriaId: 3,
                dificuldade: 'media',
                status: 'rascunho',
                created_at: agora,
                updated_at: agora
            },
            {
                enunciado: 'Calcule 20% de 250.',
                disciplinaId: 1,
                categoriaId: 4,
                dificuldade: 'facil',
                status: 'rascunho',
                created_at: agora,
                updated_at: agora
            },
            {
                enunciado: 'Calcule o montante de uma aplicação de R$ 1.000,00 a juros simples.',
                disciplinaId: 1,
                categoriaId: 8,
                dificuldade: 'media',
                status: 'rascunho',
                created_at: agora,
                updated_at: agora
            },
            {
                enunciado: 'Calcule a área de um retângulo com 8 cm de comprimento e 5 cm de largura.',
                disciplinaId: 1,
                categoriaId: 2,
                dificuldade: 'facil',
                status: 'rascunho',
                created_at: agora,
                updated_at: agora
            },
            {
                enunciado: 'Um triângulo retângulo possui catetos medindo 3 cm e 4 cm. Determine a hipotenusa.',
                disciplinaId: 1,
                categoriaId: 2,
                dificuldade: 'facil',
                status: 'rascunho',
                created_at: agora,
                updated_at: agora
            },
            {
                enunciado: 'Determine a média aritmética dos números 6, 8, 10 e 12.',
                disciplinaId: 1,
                categoriaId: 7,
                dificuldade: 'facil',
                status: 'rascunho',
                created_at: agora,
                updated_at: agora
            },
            {
                enunciado: 'Uma mercadoria custa R$ 200,00 e recebeu desconto de 15%. Qual é o novo preço?',
                disciplinaId: 1,
                categoriaId: 4,
                dificuldade: 'media',
                status: 'rascunho',
                created_at: agora,
                updated_at: agora
            }
        ]);

        // Relacionamento N:N entre questões e assuntos
        await queryInterface.bulkInsert('questao_assuntos', [
            { questaoId: 1, assuntoId: 1, created_at: agora, updated_at: agora },
            { questaoId: 2, assuntoId: 2, created_at: agora, updated_at: agora },
            { questaoId: 3, assuntoId: 3, created_at: agora, updated_at: agora },
            { questaoId: 4, assuntoId: 4, created_at: agora, updated_at: agora },
            { questaoId: 5, assuntoId: 5, created_at: agora, updated_at: agora },
            { questaoId: 6, assuntoId: 6, created_at: agora, updated_at: agora },
            { questaoId: 7, assuntoId: 8, created_at: agora, updated_at: agora },
            { questaoId: 8, assuntoId: 9, created_at: agora, updated_at: agora },
            { questaoId: 9, assuntoId: 10, created_at: agora, updated_at: agora },
            { questaoId: 10, assuntoId: 5, created_at: agora, updated_at: agora }
        ]);
    },

    async down(queryInterface, _Sequelize) {
        await queryInterface.bulkDelete('questao_assuntos', null, {});
        await queryInterface.bulkDelete('questoes', null, {});
        await queryInterface.bulkDelete('assuntos', null, {});
        await queryInterface.bulkDelete('categorias', null, {});
        await queryInterface.bulkDelete('disciplinas', null, {});
    }
};