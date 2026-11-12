const consultorModel = require('../models/consultorModel');

class ErroDeValidacao extends Error {}

function validarConsultor(dados) {
  const { nome, contato, especialidades, experiencia } = dados;

  if (typeof nome !== 'string' || nome.trim() === '') {
    throw new ErroDeValidacao('O campo "nome" é obrigatório.');
  }
  if (typeof contato !== 'string' || contato.trim() === '') {
    throw new ErroDeValidacao('O campo "contato" é obrigatório.');
  }
  if (
    !Array.isArray(especialidades) ||
    especialidades.filter((e) => typeof e === 'string' && e.trim() !== '').length === 0
  ) {
    throw new ErroDeValidacao('O consultor deve possuir pelo menos uma especialidade.');
  }
  if (experiencia !== undefined && (!Number.isInteger(experiencia) || experiencia < 0)) {
    throw new ErroDeValidacao('O campo "experiencia" deve ser um número inteiro maior ou igual a 0.');
  }
}

async function cadastrarConsultor(dados) {
  validarConsultor(dados);

  const consultor = {
    nome: dados.nome.trim(),
    contato: dados.contato.trim(),
    especialidades: dados.especialidades
      .filter((e) => typeof e === 'string' && e.trim() !== '')
      .map((e) => e.trim()),
    experiencia: dados.experiencia ?? 0,
    disponivel: dados.disponivel ?? true,
  };

  const id = await consultorModel.criar(consultor);
  return { id, ...consultor };
}

async function listarConsultores() {
  return consultorModel.listar();
}

module.exports = { cadastrarConsultor, listarConsultores, ErroDeValidacao };