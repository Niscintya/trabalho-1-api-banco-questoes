const { Categoria } = require('../../models');

async function listarTodas() {
  return await Categoria.findAll({
    order: [['id', 'ASC']]
  });
}

async function buscarPorId(id) {
  return await Categoria.findByPk(id);
}

async function criar(dados) {
  return await Categoria.create(dados);
}

async function atualizar(id, dados) {
  const categoria = await Categoria.findByPk(id);

  if (!categoria) {
    return null;
  }

  await categoria.update(dados);

  return categoria;
}

async function excluir(id) {
  const categoria = await Categoria.findByPk(id);

  if (!categoria) {
    return null;
  }

  await categoria.destroy();

  return categoria;
}

module.exports = {
  listarTodas,
  buscarPorId,
  criar,
  atualizar,
  excluir
};