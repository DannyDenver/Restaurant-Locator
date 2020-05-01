import { Restaurant } from '../models/Restaurant';
import * as sortUtils from '../utils/sort';


export function hashGenres(restaurants: Restaurant[]) {
    let genresHashMap: any = {};
    genresHashMap['All'] = 'All';

    for (let index = 0; index < restaurants.length; index++) {
      let genres = restaurants[index].genre.split(',');

      genres.forEach((genre: string) => {
        if (genresHashMap[genre]) {
          genresHashMap[genre].push(index);
        } else {
          genresHashMap[genre] = [index];
        }
      });
    }

    return sortUtils.sortObject(genresHashMap);
  }

export function hashState(restaurants: Restaurant[]) {
    let statesHashMap: any = {};

    for (let index = 0; index < restaurants.length; index++) {
      let state = restaurants[index].state;

      if (statesHashMap[state]) {
        statesHashMap[state].push(index);
      } else {
        statesHashMap[state] = [index];
      }
    }

    return statesHashMap;
  }