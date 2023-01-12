import React from 'react';
import { getProductById } from '../services/api';

class ShoppingCart extends React.Component {
  state = {
    cartlist: [],
  };

  async componentDidMount() {
    const getCartList = JSON.parse(localStorage.getItem('cartlist'));
    console.log(getCartList);
    const getProductsInfo = await getCartList.map(async (id) => {
      const request = await getProductById(id);
      return request;
    });
    this.setState({ cartlist: getProductsInfo });
    console.log(getProductsInfo);
  }

  render() {
    const { cartlist } = this.state;
    return (
      <div>
        {!cartlist.length ? (
          <p data-testid="shopping-cart-empty-message">Seu carrinho está vazio</p>
        ) : (
          <div>
            {cartlist.map((cartProduct) => (
              <div key={ cartProduct.id }>
                <p data-testid="shopping-cart-product-name">{cartProduct.title}</p>
                <p>{cartProduct.price}</p>
                <p data-testid="shopping-cart-product-quantity"> 1</p>
              </div>
            ))}

          </div>
        )}

      </div>
    );
  }
}

export default ShoppingCart;
