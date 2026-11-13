jest.mock('../src/models/consultorModel', () => ({
  criar: jest.fn().mockResolvedValue(1),
  listar: jest.fn().mockResolvedValue([
    { id: 1, nome: 'Ana', especialidades: ['Java'], experiencia: 5, disponivel: true, contato: 'ana@email.com' },
  ]),
}));

const request = require('supertest');
const app = require('../src/app');

describe('Rotas de consultores', () => {
  test('GET /consultores retorna a lista', async () => {
    const resposta = await request(app).get('/consultores');
    expect(resposta.status).toBe(200);
    expect(resposta.body).toHaveLength(1);
  });

  test('POST /consultores cadastra com sucesso', async () => {
    const resposta = await request(app)
      .post('/consultores')
      .send({ nome: 'Bruno', contato: 'bruno@email.com', especialidades: ['Dados'] });
    expect(resposta.status).toBe(201);
    expect(resposta.body.id).toBe(1);
  });

  test('POST /consultores sem especialidade retorna 400', async () => {
    const resposta = await request(app)
      .post('/consultores')
      .send({ nome: 'Bruno', contato: 'bruno@email.com', especialidades: [] });
    expect(resposta.status).toBe(400);
  });
});