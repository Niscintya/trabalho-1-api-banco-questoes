const { Assunto } = require('../../models');

async function listarTodas() {
  return await Assunto.findAll({
    order: [['id', 'ASC']]
  });
}

async function buscarPorId(id) {
  return await Assunto.findByPk(id);
}

async function criar(dados) {
  return await Assunto.create(dados);
}

async function atualizar(id, dados) {
  const assunto = await Assunto.findByPk(id);

  if (!assunto) {
    return null;
  }

  await assunto.update(dados);

  return assunto;
}

async function excluir(id) {
  const assunto = await Assunto.findByPk(id);

  if (!assunto) {
    return null;
  }

  await assunto.destroy();

  return assunto;
}

module.exports = {
  listarTodas,
  buscarPorId,
  criar,
  atualizar,
  excluir
};