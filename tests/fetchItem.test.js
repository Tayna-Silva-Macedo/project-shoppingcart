require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

describe('2 - Teste a função fecthItem', () => {
  test('Testa se fetchItem é uma função', () => {
    expect(typeof fetchItem).toBe('function');
  });

  test("Testa se fetch é chamada quando a função fetchItem é executada com o argumento 'MLB1615760527'", async () => {
    await fetchItem('MLB1615760527');
    expect(fetch).toHaveBeenCalled();
  });

  test("Testa se ao chamar a função fetchItem com o argumento do item 'MLB1615760527', a função fetch utiliza o endpoint correto", async () => {
    const url = 'https://api.mercadolibre.com/items/MLB1615760527';
    await fetchItem('MLB1615760527');
    expect(fetch).toHaveBeenCalledWith(url);
  });

  test("Testa se o retorno da função fetchItem com o argumento do item 'MLB1615760527' é uma estrutura de dados igual ao objeto item que já está importado no arquivo", async () => {
    const retorno = await fetchItem('MLB1615760527');
    expect(retorno).toEqual(item);
  });

  test('Testa se, ao chamar a função fetchItem sem argumento, retorna um erro com a mensagem: You must provide an url', async () => {
    const retorno = await fetchItem();
    expect(retorno).toEqual(new Error ('You must provide an url'))
  });
});
