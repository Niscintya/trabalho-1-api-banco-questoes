const disciplinas = [
    {
        id: 1,
        nome: "Matemática"
    },
    {
        id: 2,
        nome: "Física"
    }
];

const categorias = [
    {
        id: 1,
        nome: "Equação do 2º grau"
    },
    {
        id: 2,
        nome: "Geometria"
    }
];

const questoes = [
    {
        id: 1,
        enunciado: "Qual é o resultado de 2 + 3?",
        disciplinaId: 1,
        categoriaId: 1,
        dificuldade: "facil"
    },
    {
        id: 2,
        enunciado: "Qual é a área de um quadrado de lado 5 cm?",
        disciplinaId: 1,
        categoriaId: 2,
        dificuldade: "media"
    },
    {
        id: 3,
        enunciado: "Qual é a raiz da equação x² - 9 = 0?",
        disciplinaId: 1,
        categoriaId: 1,
        dificuldade: "media"
    }
];

module.exports = {
    disciplinas,
    categorias,
    questoes
};