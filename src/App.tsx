import React, { Component } from 'react';
import './App.css';

import RestaurantTable from './components/RestaurantTable'
import * as sortUtils from './utils/quickSort'
import { Restaurant } from './models/Restaurant';
import Spinner from './components/Spinner/Spinner';
import { Filter } from './components/Filters';

const apiUrl = " https://code-challenge.spectrumtoolbox.com/api/restaurants";

class App extends Component {
  restaurants: Restaurant[] = [];
  state = {
    filteredRestaurants: [],
    genres: [],
    isLoaded: false,
    stateFilter: '',
    genreFilter: ''
  }


  genresLookup: any = {};
  stateLookup: any = {};

  componentDidMount() {
    fetch(apiUrl, { headers: { Authorization: "Api-Key q3MNxtfep8Gt", }, })
      .then(response => response.json())
      .then((response: Restaurant[]) => {
        return sortUtils.quickSort(response)
      })
      .then((restaurants: Restaurant[]) => {
        let uniqueGenres = this.hashGenres(restaurants);
        
        setTimeout(() => {
          this.restaurants = restaurants;

          this.setState({
            filteredRestaurants: restaurants,
            genres: uniqueGenres,
            isLoaded: true
          })
        }, 1500);
      }).catch(error => {
        this.setState({
          isLoaded: true,
          error
        })
      });
  }

  hashGenres(restaurants: Restaurant[]) {
    let uniqueGenres: string[] = [''];

    for (let index = 0; index < restaurants.length; index++) {
      let genres = restaurants[index].genre.split(',');

      genres.forEach((genre: string) => {
        if (this.genresLookup[genre]) {
          this.genresLookup[genre].push(index);
        } else {
          this.genresLookup[genre] = [index];
          uniqueGenres.push(genre);
        }
      });
    }
  }
 
  filterByGenre = (event: any) => {
    const genre = event.target.value;
    if (genre) {
      const indexes = this.genresLookup[genre];

      const filteredRestaurants = this.restaurants.filter((restaurant: Restaurant, restaurantIndex: number) => indexes.includes(restaurantIndex));

      this.setState({
        genreFilter: event.target.value,
        filteredRestaurants: filteredRestaurants
      });
    } else {
      this.setState({
        genreFilter: genre,
        filteredRestaurants: this.restaurants
      });
    }
  }

  render() {
    return (
      <div className="app">
        <header className="header">
          <h1>Restaurant Locator</h1>
          <div className="search-and-filter">
            <Filter updateFilter={this.filterByGenre} currentFilter={this.state.genreFilter} options={this.state.genres} />
          </div>
        </header>
        <main>
          {
            this.state.isLoaded ?
              <RestaurantTable filteredRestaurants={this.state.filteredRestaurants} />
              : <Spinner />
          }
        </main>
      </div>
    );
  }
}

export default App;