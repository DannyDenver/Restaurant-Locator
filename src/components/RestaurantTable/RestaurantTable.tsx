import React, { Component } from 'react';
import { Restaurant } from '../../models/Restaurant';
import './RestaurantTable.css';

export default class RestaurantTable extends Component<{ filteredRestaurants: Restaurant[] }> {
    render() {
        return (
            <table className="data-table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>City</th>
                        <th>State</th>
                        <th>Phone Number</th>
                        <th>Genre</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        this.props.filteredRestaurants.length ?
                            this.props.filteredRestaurants.map(restaurant => {
                                return (
                                    <tr key={restaurant.telephone}>
                                        <td>{restaurant.name}</td>
                                        <td>{restaurant.city}</td>
                                        <td>{restaurant.state}</td>
                                        <td>{restaurant.telephone}</td>
                                        <td>{restaurant.genre}</td>
                                    </tr>
                                )
                            }) :
                            <tr>
                                <td className="no-results" colSpan={5}>{'No Restaurants found.'}</td>
                            </tr>
                    }
                </tbody>
            </table>
        )
    }
}
