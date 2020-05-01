import React, { Component } from 'react';
import './App.css';

import RestaurantTable from './components/RestaurantTable';
import * as sortUtils from './utils/sort';
import * as filterUtils from './utils/filter';
import * as hashUtils from './utils/hash';

import { Restaurant } from './models/Restaurant';
import Spinner from './components/Spinner/Spinner';
import { Filter } from './components/Filters';

const apiUrl = " https://code-challenge.spectrumtoolbox.com/api/restaurants";
const stateAbbreviations = [
  'All', 'AL', 'AK', 'AS', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'DC', 'FM', 'FL', 'GA',
  'GU', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MH', 'MD', 'MA',
  'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND',
  'MP', 'OH', 'OK', 'OR', 'PW', 'PA', 'PR', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT',
  'VT', 'VI', 'VA', 'WA', 'WV', 'WI', 'WY'
];

class App extends Component {
  restaurants: Restaurant[] = [];
  genres: string[] = [];

  state = {
    filteredRestaurants: [],
    isLoaded: false,
    stateFilter: 'All',
    genreFilter: 'All'
  }


  genresLookup: any = {};
  stateLookup: any = {};

  componentDidMount() {
    fetch(apiUrl, { headers: { Authorization: "Api-Key q3MNxtfep8Gt", }, })
      .then(response => response.json())
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
                    <Filter updateFilter={this.filterByState} currentFilter={this.state.stateFilter} options={stateAbbreviations} />

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