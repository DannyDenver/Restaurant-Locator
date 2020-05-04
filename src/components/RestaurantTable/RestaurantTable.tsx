import React from 'react';

import { Restaurant } from '../../models/Restaurant';
import './RestaurantTable.css';

export default class RestaurantTable extends React.Component<{ restaurants: Restaurant[] }, {currentPage: number}> {
    rowsPerPage = 10;

    constructor(props: any) {
        super(props);
        this.state = {
            currentPage: 1
        };
    }


    get maxPageNumber() { return Math.ceil(this.props.restaurants.length / 10) }
    get startingIndex() { return (this.state.currentPage - 1) * this.rowsPerPage }

    next(){
        if (this.state.currentPage < this.maxPageNumber) {
            const currentPage = this.state.currentPage;
            this.setState({
                currentPage: currentPage + 1
            });
        }
    }

    previous = () => {
        if (this.state.currentPage > 1) {
            const currentPage = this.state.currentPage;
            this.setState({
                currentPage: currentPage - 1
            });
        }
    }


    render() {
        return (
            <>
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
                            this.props.restaurants.length ?
                                this.props.restaurants.slice(this.startingIndex, this.startingIndex + this.rowsPerPage).map(restaurant => {
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
                <div className="flex-container">
                    <div className="paginator">
                        <button type="button">
                            <svg className="nav-arrow" onClick={this.previous} baseProfile="tiny" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 15 25" aria-hidden="true" focusable="false"><path d="M13.761 0L15 1.125 2.478 12.5 15 23.875 13.761 25 0 12.5z"></path></svg>
                        </button>
                        <div className="paginator-number">
                            &nbsp;
                        {this.state.currentPage} / {this.maxPageNumber}
                            &nbsp;
                        </div>
                        <button type="button">
                            <svg className="nav-arrow right" onClick={() => this.next()} baseProfile="tiny" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 15 25" aria-hidden="true" focusable="false"><path d="M13.761 0L15 1.125 2.478 12.5 15 23.875 13.761 25 0 12.5z"></path></svg>
                        </button>
                    </div>
                </div>
            </>
        )
    }
}
