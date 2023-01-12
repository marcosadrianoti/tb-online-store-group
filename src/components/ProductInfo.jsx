import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ProductInfo extends Component {
  render() {
    const { productList, addToCart } = this.props;
    return (
      <div>
        { productList.length === 0
          ? 'Nenhum produto foi encontrado'
          : productList.results.map((product) => (
            <div data-testid="product" key={ product.id }>
              <p>{ product.title }</p>
              <img src={ product.thumbnail } alt={ product.title } />
              <p>{ product.price }</p>
              <button
                id={ product.id }
                type="button"
                data-testid="product-add-to-cart"
                onClick={ addToCart }
              >
                Adicionar ao carrinho
              </button>
            </div>
          ))}
      </div>
    );
  }
}

ProductInfo.propTypes = {
  productList: PropTypes.arrayOf({}).isRequired,
  addToCart: PropTypes.func.isRequired,
};

export default ProductInfo;
