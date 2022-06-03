require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

describe('1 - Teste a função fecthProducts', () => {
  test('Testa se fetchProducts é uma função', () => {
    expect(typeof fetchProducts).toBe('function');
  });

  test("Testa se fetch foi chamada quando executada a função fetchProducts com o argumento 'computador'", async () => {
    await fetchProducts('computador');
    expect(fetch).toHaveBeenCalled();
  });

  test("Testa se ao chamar a função fetchProducts com o argumento 'computador' a função utiliza o endpoint correto", async () => {
    const url = 'https://api.mercadolibre.com/sites/MLB/search?q=computador';
    await fetchProducts('computador');
    expect(fetch).toHaveBeenCalledWith(url);
  });

  test("Testa se o retorno da função fetchProducts com o argumento 'computador' é uma estrutura de dados igual ao objeto computadorSearch", async () => {
    const retorno = await fetchProducts('computador');
    expect(retorno).toEqual(computadorSearch);
  });

  test('Testa se ao chamar a função fetchProducts sem argumento retorna um erro com a mensagem: You must provide an url', async () => {
    const retorno = await fetchProducts();
    expect(retorno).toEqual(new Error('You must provide an url'));
  });
});
