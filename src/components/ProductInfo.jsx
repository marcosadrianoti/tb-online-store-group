import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class ProductInfo extends Component {
  render() {
    const { productList, addToCart } = this.props;
    return (
      <div>
        {productList.length === 0
          ? 'Nenhum produto foi encontrado'
          : productList.results.map((product) => (
            <div data-testid="product" key={ product.id }>
              <Link to={ `/details/${product.id}` } data-testid="product-detail-link">

                <p>{product.title}</p>
                <img src={ product.thumbnail } alt={ product.title } />
                <p>{product.price}</p>
              </Link>
              <button
                id={ product.id }
                type="button"
                data-testid="product-add-to-cart"
                onClick={ () => addToCart(product) }
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
