const questoesRepository = require('../repositories/questoes.repository');
const disciplinasRepository = require('../repositories/disciplinas.repository');
const categoriasRepository = require('../repositories/categorias.repository');
const assuntosRepository = require('../repositories/assuntos.repository');

const criarQuestoesService = require('../services/questoes.service');
const criarDisciplinasService = require('../services/disciplinas.service');
const criarCategoriasService = require('../services/categorias.service');
const criarAssuntosService = require('../services/assuntos.service');

// Injeção de dependência
const questoesService = criarQuestoesService(questoesRepository);
const disciplinasService = criarDisciplinasService(disciplinasRepository);
const categoriasService = criarCategoriasService(categoriasRepository);
const assuntosService = criarAssuntosService(assuntosRepository);

module.exports = {
    questoesService,
    disciplinasService,
    categoriasService,
    assuntosService
};