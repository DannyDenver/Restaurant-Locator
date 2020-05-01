import React, { Component } from 'react'
import { Restaurant } from '../models/Restaurant'

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
                                <tr>
                                    <td>{restaurant.name}</td>
                                    <td>{restaurant.city}</td>
                                    <td>{restaurant.state}</td>
                                    <td>{restaurant.telephone}</td>
                                    <td>{restaurant.genre}</td>
                                </tr>
                            )
                        }) : 
                        'No Restaurants found.'
                    }
                </tbody>
            </table>
        )
    }
}
