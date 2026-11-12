const app = require('./app');
const initDatabase = require('./database/initDatabase');

const PORTA = process.env.PORT || 3000;

async function iniciar() {
  await initDatabase();
  app.listen(PORTA, () => console.log(`ConsulTech rodando na porta ${PORTA}`));
}

iniciar().catch((erro) => {
  console.error(erro.message);
  process.exit(1);
});