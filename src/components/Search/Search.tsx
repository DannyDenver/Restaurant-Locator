import React from 'react';
import './Search.css';

export function Search(props: any) {
    return (
        <div className="search-wrapper">
            <form className="search-form" onSubmit={props.handleSearch}>
                <input type="text" placeholder="Search..." value={props.searchTerm} onChange={props.searchTermChange} />
                {
                    props.searchTerm ? (<button className="close-icon no-select" type="reset" value={''} onClick={ props.searchTermChange }></button>) : null
                }
            </form>
        </div>
    )
}
