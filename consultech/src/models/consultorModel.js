const pool = require('../database/connection');

async function criar({ nome, especialidades, experiencia, disponivel, contato }) {
  const conexao = await pool.getConnection();
  try {
    await conexao.beginTransaction();

    const [resultado] = await conexao.execute(
      'INSERT INTO consultores (nome, experiencia_anos, disponivel, contato) VALUES (?, ?, ?, ?)',
      [nome, experiencia, disponivel, contato]
    );
    const consultorId = resultado.insertId;

    for (const especialidade of especialidades) {
      await conexao.execute(
        'INSERT INTO especialidades (consultor_id, nome) VALUES (?, ?)',
        [consultorId, especialidade]
      );
    }

    await conexao.commit();
    return consultorId;
  } catch (erro) {
    await conexao.rollback();
    throw erro;
  } finally {
    conexao.release();
  }
}

async function listar() {
  const [linhas] = await pool.query(`
    SELECT c.id, c.nome, c.experiencia_anos, c.disponivel, c.contato,
           e.nome AS especialidade
    FROM consultores c
    JOIN especialidades e ON e.consultor_id = c.id
    ORDER BY c.id, e.id`);

  const consultoresPorId = new Map();
  for (const linha of linhas) {
    if (!consultoresPorId.has(linha.id)) {
      consultoresPorId.set(linha.id, {
        id: linha.id,
        nome: linha.nome,
        especialidades: [],
        experiencia: linha.experiencia_anos,
        disponivel: Boolean(linha.disponivel),
        contato: linha.contato,
      });
    }
    consultoresPorId.get(linha.id).especialidades.push(linha.especialidade);
  }
  return [...consultoresPorId.values()];
}

module.exports = { criar, listar };