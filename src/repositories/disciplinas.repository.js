const { Disciplina, Questao } = require('../../models');

async function listarTodas() {
  return await Disciplina.findAll({
    order: [['id', 'ASC']]
  });
}

async function buscarPorId(id) {
  return await Disciplina.findByPk(id);
}

async function criar(dados) {
  return await Disciplina.create(dados);
}

async function atualizar(id, dados) {
  const disciplina = await Disciplina.findByPk(id);

  if (!disciplina) {
    return null;
  }

  await disciplina.update(dados);

  return disciplina;
}

async function excluir(id) {
  const disciplina = await Disciplina.findByPk(id);

  if (!disciplina) {
    return null;
  }

  await disciplina.destroy();

  return disciplina;
}

async function listarQuestoes(id) {
  return await Questao.findAll({
    where: {
      disciplinaId: id
    },
    order: [['id', 'ASC']]
  });
}

module.exports = {
  listarTodas,
  buscarPorId,
  criar,
  atualizar,
  excluir,
  listarQuestoes
};