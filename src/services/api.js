export async function getCategories() {
  const categoriesResponse = await fetch('https://api.mercadolibre.com/sites/MLB/categories');
  const response = await categoriesResponse.json();
  return response;
}

export async function getProductsFromCategoryAndQuery(categoryID, query) {
  const productsQuery = await fetch(`https://api.mercadolibre.com/sites/MLB/search?category=${categoryID}&q=${query}`);
  const response = await productsQuery.json();
  return response;
}

export async function getProductById(productId) {
  const product = await fetch(`https://api.mercadolibre.com/items/${productId}`);
  const productResponse = await product.json();
  return productResponse;
}
