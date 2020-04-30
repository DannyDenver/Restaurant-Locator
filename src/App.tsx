import React, { Component } from 'react';
import './App.css';

import RestaurantTable from './components/RestaurantTable'
import * as sortUtils from './utils/quickSort'
import { Restaurant } from './models/Restaurant';

const apiUrl = " https://code-challenge.spectrumtoolbox.com/api/restaurants";

class App extends Component {
  state = {
    resturants: [],
    filteredRestaurants: [],
    isLoaded: false,
  }

  componentDidMount() {
    fetch(apiUrl, { headers: { Authorization: "Api-Key q3MNxtfep8Gt", }, })
      .then(response => response.json())
      .then((response: Restaurant[]) => {
        return sortUtils.quickSort(response)
      })
      .then(response => {
        this.setState({
          resturants: response,
          filteredRestaurants: response,
          isLoaded: true
        })
      }).catch(error => {
        this.setState({
          isLoaded: true,
          error
        })
      });
  }

  render() {
    return (
      <div className="app">
        <header className="header">
          <h1>Restaurant Locator</h1>
        </header>
        <main>
          <RestaurantTable filteredRestaurants={this.state.filteredRestaurants} />
        </main>
      </div>
    );
  }
}

export default App;