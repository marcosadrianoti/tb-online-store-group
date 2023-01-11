import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Home extends Component {
  render() {
    return (
      <div>
        <input type="text" name="busca" />
        <p
          data-testid="home-initial-message"
        >
          Digite algum termo de pesquisa ou escolha uma categoria.
        </p>

        <button type="button">
          <Link to="shopping-cart" data-testid="shopping-cart-button">
            Carrinho de Compras
          </Link>
        </button>

      </div>
    );
  }
}

export default Home;
