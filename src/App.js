import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Details from './pages/Details';
import Home from './pages/Home';
import ShoppingCart from './pages/ShoppingCart';

function App() {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={ Home } />
        <Route path="/shopping-cart" component={ ShoppingCart } />
        <Route path="/details/:id" component={ Details } />
      </Switch>
    </div>
  );
}

export default App;
