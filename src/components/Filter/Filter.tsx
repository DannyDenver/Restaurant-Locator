import React from 'react';
import './Filter.css'

export function Filter(props: any) {
    return (
        <form className="filter">
            <label>Filter {props.itemType}: </label>
            <select className={'filter'} onChange={props.updateFilter} name={props.name} value={props.currentFilter}>
                {
                    props.options.map((option: string) => {
                        return (
                            <option key={option} value={option}>{option}</option>
                        )
                    })
                }
            </select>
        </form>
    )
}

