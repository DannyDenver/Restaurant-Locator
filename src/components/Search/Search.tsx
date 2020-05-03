import React from 'react';
import './Search.css';

export function Search(props: any) {
    return (
        <form className={"search-form"} onSubmit={props.handleSearch}>
            <input type="text" placeholder="Search.." name="searchTerm" onChange={props.searchTermChange} />
        </form>
    )
}
