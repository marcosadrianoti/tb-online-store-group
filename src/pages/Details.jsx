import PropTypes from 'prop-types';
import React, { Component } from 'react';

import { Link } from 'react-router-dom';
import { getProductById } from '../services/api';

class Details extends Component {
  state = {
    product: [],
  };

  componentDidMount() {
    this.fetchProduct();
  }

  fetchProduct = async () => {
    const { match: { params: { id } } } = this.props;
    const dataProduct = await getProductById(id);
    this.setState({ product: dataProduct });
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
    const { product } = this.state;
    return (
      <div>
        <h3 data-testid="product-detail-name">{product.title}</h3>
        <img
          src={ product.thumbnail }
          alt={ product.title }
          data-testid="product-detail-image"
        />
        <h4 data-testid="product-detail-price">{product.price}</h4>
        <button
          type="button"
          data-testid="product-detail-add-to-cart"
          onClick={ this.addToCart }
          value={ JSON.stringify(product) }
        >
          Adicionar ao carrinho
        </button>
        <button type="button">
          <Link to="/shopping-cart" data-testid="shopping-cart-button">
            Carrinho de Compras
          </Link>
        </button>

      </div>
    );
  }
}

Details.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }),
}.isRequired;

export default Details;
