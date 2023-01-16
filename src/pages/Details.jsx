import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Error from '../components/Error';
import { getProductById } from '../services/api';

const one = 1;
const two = 2;
const three = 3;
const four = 4;
const five = 5;

class Details extends Component {
  state = {
    product: [],
    ratingIndex: [one, two, three, four, five],
    email: '',
    rating: '',
    text: '',
    isValid: true,
    totalItemsCart: JSON.parse(localStorage.getItem('totalItemsCart')) ?? 0,
    // isDisabled: true,
  };

  componentDidMount() {
    this.fetchProduct();
  }

  fetchProduct = async () => {
    const { match: { params: { id } } } = this.props;
    const dataProduct = await getProductById(id);
    this.setState({ product: dataProduct });
  };

  addToCart = (newProduct) => {
    const cartlist = localStorage.getItem('cartlist');
    if (cartlist) {
      const products = JSON.parse(cartlist);
      if (products.some((product) => product.id === newProduct.id)) {
        const index = products.findIndex((product) => product.id === newProduct.id);
        products[index].productQuantity += 1;
        localStorage.setItem('cartlist', JSON.stringify(products));
      } else {
        newProduct.productQuantity = 1;
        localStorage.setItem('cartlist', JSON.stringify([...products, newProduct]));
      }
    } else {
      newProduct.productQuantity = 1;
      localStorage.setItem('cartlist', [JSON.stringify([newProduct])]);
    }
    this.getTotalItemsCart();
  };

  getTotalItemsCart = () => {
    const getCartList = JSON.parse(localStorage.getItem('cartlist')) ?? [];
    let totalItems = 0;
    getCartList.forEach((productCart) => {
      totalItems += productCart.productQuantity;
    });
    localStorage.setItem('totalItemsCart', totalItems);
    this.setState({ totalItemsCart: totalItems });
  };

  validate = () => {
    const { email, rating } = this.state;
    const emailRegex = /^[a-z0-9.-_]+@[a-z0-9]+\.[a-z]+\)?$/i.test(email);
    if (email.length !== 0
      && emailRegex && rating.length !== 0) {
      this.addRating();
      this.setState({
        isValid: true,
        email: '',
        text: '',
        rating: '',
      });
      return;
    }
    this.setState({
      isValid: false,
    });
  };

  addRating = () => {
    const { match: { params: { id } } } = this.props;
    const { email, rating, text } = this.state;
    const evaluator = localStorage.getItem(id);
    if (evaluator) {
      const newRatings = {
        email,
        text,
        rating,
      };
      const ratings = JSON.parse(evaluator);
      localStorage.setItem(id, JSON.stringify([...ratings, newRatings]));
    } else {
      const newRatings = {
        email,
        text,
        rating,
      };
      localStorage.setItem(id, JSON.stringify([newRatings]));
    }
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  };

  render() {
    const { product, ratingIndex, email, text, isValid, totalItemsCart } = this.state;
    const { match: { params: { id } } } = this.props;
    const getRatings = localStorage.getItem(id);
    const ratings = JSON.parse(getRatings);
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
          id={ product.id }
          type="button"
          data-testid="product-detail-add-to-cart"
          onClick={ () => this.addToCart(product) }
        >
          Adicionar ao carrinho
        </button>
        <button type="button">
          <Link to="/shopping-cart" data-testid="shopping-cart-button">
            Carrinho de Compras
            <br />
            <span data-testid="shopping-cart-size">{ totalItemsCart }</span>
          </Link>
        </button>
        <div>
          <fieldset>
            <form>
              <input
                data-testid="product-detail-email"
                type="email"
                name="email"
                value={ email }
                id="email"
                placeholder="e-mail"
                onChange={ this.handleChange }
              />
              <div>
                {
                  ratingIndex.map((index) => (
                    <input
                      key={ index }
                      type="radio"
                      value={ index }
                      data-testid={ `${index}-rating` }
                      name="rating"
                      onChange={ this.handleChange }
                    />))
                }
              </div>
              <textarea
                data-testid="product-detail-evaluation"
                name="text"
                value={ text }
                placeholder="digite seu comentário"
                onChange={ this.handleChange }
              />
              <button
                type="button"
                data-testid="submit-review-btn"
                onClick={ () => this.validate(id) }
              >
                Avaliar Produto
              </button>
            </form>
            {!isValid
            && (<Error />)}
          </fieldset>
          <fieldset>
            {ratings && ratings.map((rating, index) => (
              <div key={ index }>
                <p data-testid="review-card-email">{ rating.email }</p>
                <p data-testid="review-card-rating">{ rating.rating }</p>
                <p data-testid="review-card-evaluation">{ rating.text }</p>
              </div>
            ))}
          </fieldset>
        </div>
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
