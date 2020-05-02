import React, { Component } from 'react';
import './App.css';

import RestaurantTable from './components/RestaurantTable';
import * as sortUtils from './utils/sort';
import * as filterUtils from './utils/filter';
import * as hashUtils from './utils/hash';

import { Restaurant } from './models/Restaurant';
import Spinner from './components/Spinner/Spinner';
import { Filter } from './components/Filters';
import * as constants from './constants'
require('dotenv').config()

class App extends Component {
  restaurants: Restaurant[] = [];
  genres: string[] = [];
  genresLookup: any = {};
  stateLookup: any = {};

  state = {
    filteredRestaurants: [],
    isLoaded: false,
    stateFilter: 'All',
    genreFilter: 'All'
  }

  componentDidMount() {
    fetch(`${process.env.REACT_APP_API_URL}`, { headers: { Authorization: process.env.REACT_APP_SECRET_KEY as string, }, })
      .then((response: any) => response.json())
      .then((response: Restaurant[]) => sortUtils.quickSort(response))
      .then((restaurants: Restaurant[]) => {
        this.restaurants = restaurants;
        this.genresLookup = hashUtils.hashGenres(this.restaurants);
        this.genres = Object.keys(this.genresLookup);
        this.stateLookup = hashUtils.hashState(restaurants);

        setTimeout(() => {
          this.setState({
            filteredRestaurants: this.restaurants,
            isLoaded: true
          })
        }, 1000);
      }).catch(error => {
        this.setState({
          isLoaded: true,
          error
        })
      });
  }

  filterByGenre = (event: any) => {
    const genre = event.target.value;

    this.setState({
      genreFilter: genre,
    }, () => this.filterRestaurants());
  }

  filterByState = (event: any) => {
    const state = event.target.value;

    this.setState({
      stateFilter: state,
    }, () => this.filterRestaurants());
  }

  filterRestaurants() {
    let filteredRestaurants = this.restaurants;

    const stateIndexes = this.state.stateFilter !== 'All' ? this.stateLookup[this.state.stateFilter] : null;
    const genreIndexes = this.state.genreFilter !== 'All' ? this.genresLookup[this.state.genreFilter] : null;

    if (stateIndexes && genreIndexes) {
      filteredRestaurants = filterUtils.filterByIndexes(this.restaurants, genreIndexes, stateIndexes)
    } else {
      if (genreIndexes) {
        filteredRestaurants = filterUtils.filterByIndexes(this.restaurants, genreIndexes)
      } else if (stateIndexes) {
        filteredRestaurants = filterUtils.filterByIndexes(this.restaurants, stateIndexes)
      }

      if (stateIndexes === undefined) {
        filteredRestaurants = [];
      }
    }

    this.setState({
      filteredRestaurants: filteredRestaurants
    });
  }


  render() {
    return (
      <div className="app">
        <header className="header">
          <h1>Restaurant Locator</h1>
        </header>
        <main>
          <div>
            {
              this.state.isLoaded ?
                <>
                  <div className="search-and-filter">
                    <Filter updateFilter={this.filterByGenre} currentFilter={this.state.genreFilter} options={this.genres} />
                    <Filter updateFilter={this.filterByState} currentFilter={this.state.stateFilter} options={constants.stateAbbreviations} />
                  </div>
                  <RestaurantTable filteredRestaurants={this.state.filteredRestaurants} />
                </>
                : <Spinner />
            }
          </div>
        </main>
      </div>
    );
  }
}

export default App;