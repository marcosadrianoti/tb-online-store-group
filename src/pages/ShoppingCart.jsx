import React from 'react';

class ShoppingCart extends React.Component {
  state = {
    cartlist: [],
  };

  async componentDidMount() {
    this.teste();
  }

  teste = async () => {
    const getCartList = JSON.parse(localStorage.getItem('cartlist'));
    if (getCartList) {
      const productsInfo = getCartList.map((list) => JSON.parse(list));
      this.setState({ cartlist: productsInfo });
    }
  };

  render() {
    const { cartlist } = this.state;
    return (
      <div>
        {cartlist.length === 0 ? (
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
