import React from 'react';

export function Filter(props: any) {
    return (
        <form className="filter">
            <select onChange={props.updateFilter} name={props.name} value={props.currentFilter}>
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

