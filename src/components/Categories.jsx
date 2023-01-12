import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { getCategories } from '../services/api';

class Categories extends Component {
  state = {
    categories: [],
  };

  componentDidMount() {
    this.fetchCategories();
  }

  fetchCategories = async () => {
    const dataCategories = await getCategories();
    this.setState({ categories: dataCategories });
  };

  render() {
    const { categories } = this.state;
    const { fetchProductByCategory } = this.props;
    return (
      <div>
        <ul>
          {categories.length === 0
            ? ''
            : categories.map((categorie) => (
              <li key={ categorie.id }>
                <label htmlFor={ categorie.name } data-testid="category">
                  {categorie.name}
                  <input
                    type="radio"
                    name="categorie"
                    id={ categorie.name }
                    value={ categorie.id }
                    onClick={ fetchProductByCategory }
                  />
                </label>
              </li>
            ))}
        </ul>
      </div>
    );
  }
}

Categories.propTypes = {
  fetchProductByCategory: PropTypes.func.isRequired,
};

export default Categories;
