import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Categories from '../components/Categories';
import ProductInfo from '../components/ProductInfo';
import { getProductsFromCategoryAndQuery } from '../services/api';

class Home extends Component {
  state = {
    product: '',
    productList: [],
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

  addToCart = async (event) => {
    const { target: { value } } = event;
    const cartlist = localStorage.getItem('cartlist');
    if (cartlist) {
      const productsId = JSON.parse(cartlist);
      productsId.push(value);
      localStorage.setItem('cartlist', JSON.stringify(productsId));
    } else {
      const newcart = [];
      newcart.push(value);
      localStorage.setItem('cartlist', JSON.stringify(newcart));
    }
  };

  render() {
    const { product, productList } = this.state;
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
          <Link to="shopping-cart" data-testid="shopping-cart-button">
            Carrinho de Compras
          </Link>
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
