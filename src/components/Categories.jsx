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
    console.log(categories);
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
                    value={ categorie.name }
                  />
                </label>
              </li>
            ))}
        </ul>
      </div>
    );
  }
}
export default Categories;
