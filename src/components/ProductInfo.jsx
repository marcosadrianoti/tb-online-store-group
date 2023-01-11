import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ProductInfo extends Component {
  render() {
    const { productList } = this.props;
    return (
      <div>
        { productList.length === 0
          ? 'Nenhum produto foi encontrado'
          : productList.map((product) => (
            <div data-testid="product" key={ product.id }>
              <p>{ product.title }</p>
              <img src={ product.thumbnail } alt={ product.title } />
              <p>{ product.price }</p>
            </div>
          ))}
      </div>
    );
  }
}

ProductInfo.propTypes = {
  productList: PropTypes.arrayOf({}).isRequired,
};

export default ProductInfo;
