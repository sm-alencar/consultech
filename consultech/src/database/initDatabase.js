const pool = require('./connection');

const CRIAR_TABELA_CONSULTORES = `
  CREATE TABLE IF NOT EXISTS consultores (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(150) NOT NULL,
    experiencia_anos INT NOT NULL DEFAULT 0,
    disponivel BOOLEAN NOT NULL DEFAULT TRUE,
    contato VARCHAR(150) NOT NULL
  )`;

const CRIAR_TABELA_ESPECIALIDADES = `
  CREATE TABLE IF NOT EXISTS especialidades (
    id INT AUTO_INCREMENT PRIMARY KEY,
    consultor_id INT NOT NULL,
    nome VARCHAR(100) NOT NULL,
    FOREIGN KEY (consultor_id) REFERENCES consultores(id) ON DELETE CASCADE
  )`;

const esperar = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function initDatabase(tentativas = 10) {
  for (let i = 1; i <= tentativas; i++) {
    try {
      await pool.query(CRIAR_TABELA_CONSULTORES);
      await pool.query(CRIAR_TABELA_ESPECIALIDADES);
      console.log('Banco de dados conectado e tabelas prontas.');
      return;
    } catch (erro) {
      console.log(`Banco indisponível (tentativa ${i}/${tentativas}). Aguardando...`);
      await esperar(3000);
    }
  }
  throw new Error('Não foi possível conectar ao banco de dados.');
}

module.exports = initDatabase;