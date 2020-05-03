import React, { Component } from 'react';
import './App.css';

import RestaurantTable from './components/RestaurantTable/RestaurantTable';
import Spinner from './components/Spinner/Spinner';
import { Filter } from './components/Filter/Filter';

import * as sortUtils from './utils/sort';
import * as filterUtils from './utils/filter';
import * as stringUtis from './utils/string';
import * as hashUtils from './utils/hash';

import { Restaurant } from './models/Restaurant';
import * as constants from './constants'
import { Search } from './components/Search/Search';
require('dotenv').config()

class App extends Component {
  restaurants: Restaurant[] = [];
  genresLookup: any = {};
  cityLookup: any = {};
  stateLocationLookup: any = {};
  nameLookup: any = {};

  state = {
    filteredRestaurants: [],
    isLoaded: false,
    stateLocationFilter: "All",
    genreFilter: "All",
    searchTerm: ''
  }
  get stateLocationFilter() { return this.state.stateLocationFilter }
  get genreFilter() { return this.state.genreFilter }
  get searchTerm() { return this.state.searchTerm }

  get genreSet() { return this.state.genreFilter !== "All"};
  get stateLocationSet() { return this.state.stateLocationFilter !== "All"};

  componentDidMount() {
    fetch(`${process.env.REACT_APP_API_URL}`, { headers: { Authorization: process.env.REACT_APP_SECRET_KEY as string, }, })
      .then((response: any) => response.json())
      .then((response: Restaurant[]) => sortUtils.quickSort(response))
      .then((restaurants: Restaurant[]) => {
        this.restaurants = restaurants;
        this.setLookupMaps();

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

  setLookupMaps() {
    for (let index = 0; index < this.restaurants.length; index++) {
      let restaurant = this.restaurants[index];
      let name = stringUtis.cleanString(restaurant.name);
      let genres = restaurant.genre.split(",");
      let state = restaurant.state;
      let city = stringUtis.cleanString(restaurant.city);

      this.nameLookup = hashUtils.setHashMap(this.nameLookup, name, index)
      this.stateLocationLookup = hashUtils.setHashMap(this.stateLocationLookup, state, index)
      this.cityLookup = hashUtils.setHashMap(this.cityLookup, city, index);

      genres.forEach((genre: string) => {
        this.genresLookup = hashUtils.setHashMap(this.genresLookup, genre, index)
      });

      this.genresLookup['All'] = null;
      this.genresLookup = sortUtils.sortProperties(this.genresLookup);
    }
  }

  dropdownChange = (event: any) => {
    const value = event.target.value;
    const name = event.target.name;

    var partialState: any = {};
    partialState[name] = value;

    this.setState(partialState, () => this.narrowDownRestaurants())
  }

  searchTermChange = (event: any) => {
    const searchTerm = stringUtis.cleanString(event.target.value);

    this.setState({searchTerm});
  }

  handleSearch = (event: any) => {
    event.preventDefault();
    this.narrowDownRestaurants();
  }

  narrowDownRestaurants() {
    if (!this.searchTerm && !this.stateLocationSet && !this.genreSet) {
      this.setState({
        filteredRestaurants: this.restaurants
      });

      return;
    }

    let filterCount = 0;
    let indexes: number[] = [];

    if (this.stateLocationSet) {
      if(this.stateLocationLookup[this.stateLocationFilter]) {
        indexes = indexes.concat(this.stateLocationLookup[this.stateLocationFilter]);
      }

      filterCount++;
    }

    if (this.genreSet) {
      if (this.genresLookup[this.genreFilter]) {
        indexes = indexes.concat(this.genresLookup[this.genreFilter]);
      }

      filterCount++;
    }

    if (this.searchTerm) {
      let searchResults = this.searchRestaurants();
      indexes = indexes.concat(searchResults);
      filterCount++;
    }

    let resultIndexes: number[] = [];
    let indexesMap: any = {};

    for (let index of indexes) {
      indexesMap[index] = (indexesMap[index] || 0) + 1;
      if (indexesMap[index] === filterCount) {
        resultIndexes.push(index);
      }
    }

    let filteredRestaurants = filterUtils.filterByIndexes(this.restaurants, resultIndexes);

    this.setState({filteredRestaurants});
  }

  searchRestaurants(): number[] {
    let indexes: number[] = [];

    if(this.nameLookup[this.searchTerm]) {
      indexes = indexes.concat(this.nameLookup[this.searchTerm]);
    }

    if(this.cityLookup[this.searchTerm]) {
      const cityIndexes = this.cityLookup[this.searchTerm];
      indexes = indexes.concat(cityIndexes);
    }

    let searchGenre = stringUtis.capitalize(this.searchTerm);
    if(this.genresLookup[searchGenre]) {
      let genreIndexes = this.genresLookup[searchGenre];
      indexes = indexes.concat(genreIndexes);
    }

    return indexes;
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
                    <Search handleSearch={this.handleSearch} searchTermChange={this.searchTermChange} />
                    <Filter updateFilter={this.dropdownChange} itemType={'Genre'} name={'genreFilter'} currentFilter={this.genreFilter} options={Object.keys(this.genresLookup)} />
                    <Filter updateFilter={this.dropdownChange} itemType={'State'} name={'stateLocationFilter'} currentFilter={this.stateLocationFilter} options={constants.stateAbbreviations} />
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