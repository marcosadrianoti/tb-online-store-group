import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Error from '../components/Error';

class Checkout extends Component {
  state = {
    name: '',
    cpf: '',
    email: '',
    tel: '',
    cep: '',
    address: '',
    complemento: '',
    number: '',
    city: '',
    cartlist: [],
    payment: '',
    isValidate: true,
  };

  componentDidMount() {
    this.getCart();
    this.getTotalPrice();
  }

  getCart = () => {
    const cartlist = JSON.parse(localStorage.getItem('cartlist')) ?? [];
    this.setState({ cartlist });
  };

  getTotalPrice = () => {
    const { cartlist } = this.state;
    let acumulator = 0;
    const total = cartlist.map((product) => {
      const currentPrice = (product.productQuantity * product.price).toFixed(2);
      acumulator += Number(currentPrice);
      return acumulator;
    });
    return total[total.length - 1];
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  };

  getTotalItemsCart = () => {
    const getCartList = JSON.parse(localStorage.getItem('cartlist')) ?? [];
    let totalItems = 0;
    getCartList.forEach((productCart) => {
      totalItems += productCart.productQuantity;
    });
    localStorage.setItem('totalItemsCart', totalItems);
  };

  validateInfo = () => {
    const {
      name,
      cpf,
      email,
      tel,
      address,
      cep,
      payment,
    } = this.state;
    const { history: { push } } = this.props;

    if (name.length !== 0 && cpf.length !== 0 && email.length !== 0
      && tel.length !== 0 && address.length !== 0 && cep.length !== 0
      && payment.length !== 0) {
      push('/');
      localStorage.removeItem('cartlist');
      this.getTotalItemsCart();
    } else {
      this.setState({ isValidate: false });
    }
  };

  render() {
    const {
      cartlist,
      name,
      cpf,
      email,
      tel,
      address,
      complemento,
      number,
      cep,
      city,
      isValidate,
    } = this.state;
    const total = this.getTotalPrice();
    return (
      <form>
        <div>
          <p>Revise seus produtos: </p>
          {cartlist.map((product) => (
            <div key={ product.id }>
              <p>{ product.title }</p>
              <p>{(product.productQuantity * product.price).toFixed(2)}</p>
            </div>
          ))}
          <p>{`Total: R$ ${total}`}</p>
        </div>
        <fieldset>
          <h3>Informações do comprador:</h3>
          <input
            value={ name }
            data-testid="checkout-fullname"
            onChange={ this.handleChange }
            type="text"
            placeholder="Nome completo"
            name="name"
          />
          <input
            value={ cpf }
            data-testid="checkout-cpf"
            onChange={ this.handleChange }
            type="tel"
            placeholder="cpf"
            name="cpf"
          />
          <input
            value={ email }
            data-testid="checkout-email"
            onChange={ this.handleChange }
            type="email"
            placeholder="email"
            name="email"
          />
          <input
            value={ tel }
            data-testid="checkout-phone"
            onChange={ this.handleChange }
            type="tel"
            placeholder="(xx) xxxxx-xxxx"
            name="tel"
          />
          <input
            value={ cep }
            data-testid="checkout-cep"
            onChange={ this.handleChange }
            type="tel"
            placeholder="cep"
            name="cep"
          />
          <input
            value={ address }
            data-testid="checkout-address"
            onChange={ this.handleChange }
            type="text"
            placeholder="Endereço"
            name="address"
          />
          <input
            value={ complemento }
            onChange={ this.handleChange }
            type="text"
            placeholder="Complemento"
            name="complemento"
          />
          <input
            value={ number }
            onChange={ this.handleChange }
            type="text"
            placeholder="Número"
            name="number"
          />
          <input
            value={ city }
            onChange={ this.handleChange }
            type="text"
            placeholder="cidade"
            name="city"
          />
        </fieldset>
        <div>
          <p>Método de pagamento:</p>
          <div>
            <label htmlFor="boleto">
              <input
                data-testid="ticket-payment"
                onChange={ this.handleChange }
                type="radio"
                id="boleto"
                name="payment"
                value="boleto"
              />
              Boleto
            </label>
            <label htmlFor="visa">
              <input
                data-testid="visa-payment"
                onChange={ this.handleChange }
                type="radio"
                id="visa"
                name="payment"
                value="Visa"
              />
              Visa
            </label>
            <label htmlFor="Mastercard">
              <input
                data-testid="master-payment"
                onChange={ this.handleChange }
                type="radio"
                name="payment"
                value="Mastercard"
              />
              Mastercard
            </label>
            <label htmlFor="Elo">
              <input
                data-testid="elo-payment"
                onChange={ this.handleChange }
                type="radio"
                name="payment"
                value="Elo"
              />
              Elo
            </label>
          </div>
        </div>
        <button
          data-testid="checkout-btn"
          type="button"
          onClick={ this.validateInfo }
        >
          Comprar
        </button>
        {!isValidate && <Error />}
      </form>
    );
  }
}

Checkout.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Checkout;
