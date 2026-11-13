jest.mock('../src/models/consultorModel', () => ({
  criar: jest.fn().mockResolvedValue(1),
  listar: jest.fn(),
}));

const consultorModel = require('../src/models/consultorModel');
const { cadastrarConsultor, ErroDeValidacao } = require('../src/services/consultorService');

describe('Regra de negócio: especialidade obrigatória', () => {
  const dadosBase = { nome: 'Ana', contato: 'ana@email.com' };

  test('rejeita consultor sem especialidades', async () => {
    await expect(cadastrarConsultor({ ...dadosBase, especialidades: [] }))
      .rejects.toThrow(ErroDeValidacao);
    expect(consultorModel.criar).not.toHaveBeenCalled();
  });

  test('aceita consultor com pelo menos uma especialidade', async () => {
    const resultado = await cadastrarConsultor({ ...dadosBase, especialidades: ['Java'] });
    expect(resultado.id).toBe(1);
    expect(consultorModel.criar).toHaveBeenCalledTimes(1);
  });
});