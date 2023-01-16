import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Categories from '../components/Categories';
import ProductInfo from '../components/ProductInfo';
import { getProductsFromCategoryAndQuery } from '../services/api';

class Home extends Component {
  state = {
    product: '',
    productList: [],
    totalItemsCart: JSON.parse(localStorage.getItem('totalItemsCart')) ?? 0,
  };

  inputText = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  };

  fetchProduct = async () => {
    const { product } = this.state;
    const dataProduct = await getProductsFromCategoryAndQuery('', product);
    this.setState({ productList: dataProduct });
  };

  fetchProductByCategory = async (event) => {
    const { target } = event;
    const categorieSelected = target.value;

    const dataProduct = await getProductsFromCategoryAndQuery(categorieSelected, '');
    this.setState({ productList: dataProduct });
  };

  addToCart = (newProduct) => {
    const cartlist = localStorage.getItem('cartlist');
    if (cartlist) {
      const products = JSON.parse(cartlist);
      if (products.some((product) => product.id === newProduct.id)) {
        const index = products.findIndex((product) => product.id === newProduct.id);
        products[index].productQuantity += 1;
        localStorage.setItem('cartlist', JSON.stringify(products));
      } else {
        newProduct.productQuantity = 1;
        localStorage.setItem('cartlist', JSON.stringify([...products, newProduct]));
      }
    } else {
      newProduct.productQuantity = 1;
      localStorage.setItem('cartlist', [JSON.stringify([newProduct])]);
    }
    this.getTotalItemsCart();
  };

  getTotalItemsCart = () => {
    const getCartList = JSON.parse(localStorage.getItem('cartlist')) ?? [];
    let totalItems = 0;
    getCartList.forEach((productCart) => {
      totalItems += productCart.productQuantity;
    });
    localStorage.setItem('totalItemsCart', totalItems);
    this.setState({ totalItemsCart: totalItems });
  };

  render() {
    const { product, productList, totalItemsCart } = this.state;
    return (
      <div>
        <input
          type="text"
          name="product"
          value={ product }
          data-testid="query-input"
          onChange={ this.inputText }
        />
        <p
          data-testid="home-initial-message"
        >
          Digite algum termo de pesquisa ou escolha uma categoria.
        </p>

        <button
          type="button"
          data-testid="query-button"
          onClick={ this.fetchProduct }
        >
          Pesquisar
        </button>

        <button type="button">
          <Link to="/shopping-cart" data-testid="shopping-cart-button">
            Carrinho de Compras
            <br />
          </Link>
          <span data-testid="shopping-cart-size">{ totalItemsCart }</span>
        </button>
        <Categories
          fetchProductByCategory={ this.fetchProductByCategory }
        />
        <ProductInfo
          productList={ productList }
          addToCart={ this.addToCart }
        />
      </div>
    );
  }
}

export default Home;
