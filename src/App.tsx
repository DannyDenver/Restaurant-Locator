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
import { LookupTables } from './models/LookupTables';
require('dotenv').config()

class App extends Component {
  restaurants: Restaurant[] = [];
  lookupTables = new LookupTables();

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
        this.lookupTables =  this.setLookupTables(this.restaurants);

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

  setLookupTables(restaurants: Restaurant[]): LookupTables {
    const lookupTables: LookupTables = new LookupTables();

    for (let index = 0; index < restaurants.length; index++) {
      let restaurant = this.restaurants[index];
      let name = stringUtis.cleanString(restaurant.name);
      let genres = restaurant.genre.split(",");
      let state = restaurant.state;
      let city = stringUtis.cleanString(restaurant.city);

      lookupTables.name = hashUtils.setHashMap(lookupTables.name, name, index)
      lookupTables.state = hashUtils.setHashMap(lookupTables.state, state, index)
      lookupTables.city = hashUtils.setHashMap(lookupTables.city, city, index);

      genres.forEach((genre: string) => {
        lookupTables.genre = hashUtils.setHashMap(lookupTables.genre, genre, index)
      });
    }
    lookupTables.genre['All'] = null;
    lookupTables.genre = sortUtils.sortProperties(lookupTables.genre);

    return lookupTables;
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
      indexes = hashUtils.addIndexes(this.lookupTables.state, this.stateLocationFilter, indexes);
      filterCount++;
    }

    if (this.genreSet) {
      indexes = hashUtils.addIndexes(this.lookupTables.genre, this.genreFilter, indexes);
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
    let searchGenre = stringUtis.capitalize(this.searchTerm);

    indexes = hashUtils.addIndexes(this.lookupTables.genre, searchGenre, indexes);
    indexes = hashUtils.addIndexes(this.lookupTables.name, this.searchTerm, indexes);
    indexes = hashUtils.addIndexes(this.lookupTables.city, this.searchTerm, indexes);

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
                    <Filter updateFilter={this.dropdownChange} itemType={'Genre'} name={'genreFilter'} currentFilter={this.genreFilter} options={Object.keys(this.lookupTables.genre)} />
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