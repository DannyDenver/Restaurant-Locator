import React from 'react';

export function Filter(props: any) {
    return (
        <form className="filter">
            <select onChange={props.updateFilter} name="filter-option" value={props.currentFilter}>
                {
                    props.options.map((option: string) => {
                        return (
                            <option value={option}>{option}</option>
                        )
                    })
                }
            </select>
        </form>
    )
}

