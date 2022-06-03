const produtos = document.querySelector('.items');
const carrinho = document.querySelector('.cart__items');
const botaoLimpar = document.querySelector('.empty-cart');
const preco = document.querySelector('.total-price');

async function atualizaPreco(id) {
  const item = await fetchItem(id);
  const precoTotal = parseFloat(preco.innerText, 10) + parseFloat(item.price, 10);
  preco.innerText = precoTotal.toFixed(2);
}

async function atualizaPrecoRemocao(id) {
  const item = await fetchItem(id);
  const precoTotal = parseFloat(preco.innerText, 10) - parseFloat(item.price, 10);
  preco.innerText = precoTotal <= 0 ? 0 : precoTotal.toFixed(2);
}

function createProductImageElement(imageSource, className) {
  const img = document.createElement('img');
  img.className = className;
  img.src = imageSource;
  return img;
}

function createCustomElement(element, className, innerText) {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
}

function createProductItemElement({ sku, name, image, price }) {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createProductImageElement(image, 'item__image'));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(
    createCustomElement('span', 'item__price', `R$ ${price}`),
  );
  section.appendChild(createCustomElement('span', 'item__sku', sku));

  section.appendChild(
    createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'),
  );

  return section;
}

function getSkuFromProductItem(item) {
  return item.querySelector('span.item__sku').innerText;
}

function cartItemClickListener(event) {
  const divProduto = event.target.parentElement;
  const { id } = divProduto;
  atualizaPrecoRemocao(id);
  event.target.parentElement.remove();
  saveCartItems(carrinho.innerHTML);
}

function createCartItemElement({ sku, name, salePrice, thumbnail }) {
  const div = document.createElement('div');
  const botaoExcluir = createCustomElement(
    'div',
    'material-symbols-outlined',
    'cancel',
  );
  botaoExcluir.addEventListener('click', cartItemClickListener);

  div.appendChild(createProductImageElement(thumbnail, 'cart__item__image'));
  div.appendChild(createCustomElement('span', 'cart__item__text', name));
  div.appendChild(
    createCustomElement('span', 'cart__item__price', `R$ ${salePrice}`),
  );
  div.appendChild(botaoExcluir);
  div.id = sku;
  return div;
}

function textoCarregando() {
  const texto = createCustomElement('div', 'loading', 'Carregando...');
  produtos.appendChild(texto);
}

function removeTextoCarregando() {
  document.querySelector('.loading').remove();
}

async function listagemProdutos() {
  const produtosObj = await fetchProducts('computador');
  const { results } = produtosObj;

  results.forEach(({ id, title, thumbnail, price }) => {
    const obj = { sku: id, name: title, image: thumbnail, price };
    produtos.appendChild(createProductItemElement(obj));
  });

  removeTextoCarregando();
}

async function adicionarAoCarrinho(evento) {
  const botaoSelecionado = evento.target;
  const id = getSkuFromProductItem(botaoSelecionado.parentElement);
  const itemObj = await fetchItem(id);

  const { id: sku, title: name, price: salePrice, thumbnail } = itemObj;

  carrinho.appendChild(
    createCartItemElement({ sku, name, salePrice, thumbnail }),
  );

  saveCartItems(carrinho.innerHTML);
  atualizaPreco(id);
}

async function adicionarCliqueAoBotao() {
  await fetchProducts('computador');
  const botoesAdicionar = document.querySelectorAll('.item__add');
  botoesAdicionar.forEach((botao) =>
    botao.addEventListener('click', adicionarAoCarrinho));
}

function carregaLocalStorage() {
  const itensSalvos = getSavedCartItems();
  carrinho.innerHTML = itensSalvos;
  Object.keys(carrinho.children).forEach((elem) => {
    carrinho.children[elem].lastChild.previousSibling.addEventListener(
      'click',
      cartItemClickListener,
    );
    const elemento = carrinho.children[elem];
    const { id } = elemento;
    atualizaPreco(id);
  });
}

function limparCarrinho() {
  carrinho.innerHTML = '';
  localStorage.clear();
  preco.innerText = 0;
}

window.onload = () => {
  textoCarregando();
  listagemProdutos();
  adicionarCliqueAoBotao();
  carregaLocalStorage();
  botaoLimpar.addEventListener('click', limparCarrinho);
};
