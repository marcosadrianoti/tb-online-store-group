import React from 'react';

class ShoppingCart extends React.Component {
  state = {
    cartlist: [],
  };

  async componentDidMount() {
    await this.teste();
  }

  teste = async () => {
    const getCartList = JSON.parse(localStorage.getItem('cartlist'));
    this.setState({ cartlist: getCartList });
  };

  increaseQuantity = (index) => {
    const { cartlist } = this.state;
    const temp = [...cartlist];
    temp[index].productQuantity += 1;
    this.setState({ cartlist: [...temp] });
    localStorage.setItem('cartlist', JSON.stringify(temp));
  };

  decreaseQuantity = (index) => {
    const { cartlist } = this.state;
    const temp = [...cartlist];
    if (temp[index].productQuantity === 1) return;
    temp[index].productQuantity -= 1;
    this.setState({ cartlist: [...temp] });
    localStorage.setItem('cartlist', JSON.stringify(temp));
  };

  removeItem = (id) => {
    const { cartlist } = this.state;
    const temp = cartlist.filter((productCart) => productCart.id !== id);
    this.setState({ cartlist: [...temp] });
    localStorage.setItem('cartlist', JSON.stringify(temp));
  };

  render() {
    const { cartlist } = this.state;
    return (
      <div>
        {cartlist.length === 0 ? (
          <p data-testid="shopping-cart-empty-message">Seu carrinho está vazio</p>
        ) : (
          <div>
            {cartlist.map((cartProduct, index) => (
              <div key={ cartProduct.id }>
                <p data-testid="shopping-cart-product-name">{cartProduct.title}</p>
                <p>{cartProduct.price}</p>
                <button
                  type="button"
                  data-testid="product-decrease-quantity"
                  onClick={ () => this.decreaseQuantity(index) }
                  value={ index }
                >
                  -

                </button>
                <p data-testid="shopping-cart-product-quantity">
                  {cartProduct.productQuantity}

                </p>
                <button
                  type="button"
                  data-testid="product-increase-quantity"
                  onClick={ () => this.increaseQuantity(index) }
                >
                  +

                </button>
                <button
                  type="button"
                  data-testid="remove-product"
                  onClick={ () => this.removeItem(cartProduct.id) }
                >
                  Remover Item

                </button>
              </div>
            ))}

          </div>
        )}

      </div>
    );
  }
}

export default ShoppingCart;
