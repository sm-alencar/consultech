const consultorService = require('../services/consultorService');

async function cadastrar(req, res) {
  try {
    const consultor = await consultorService.cadastrarConsultor(req.body);
    res.status(201).json(consultor);
  } catch (erro) {
    if (erro instanceof consultorService.ErroDeValidacao) {
      return res.status(400).json({ erro: erro.message });
    }
    console.error(erro);
    res.status(500).json({ erro: 'Erro interno do servidor.' });
  }
}

async function listar(req, res) {
  try {
    const consultores = await consultorService.listarConsultores();
    res.status(200).json(consultores);
  } catch (erro) {
    console.error(erro);
    res.status(500).json({ erro: 'Erro interno do servidor.' });
  }
}

module.exports = { cadastrar, listar };