const saveCartItems = (arrayItens) => {
  localStorage.setItem('cartItems', arrayItens);
};

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
