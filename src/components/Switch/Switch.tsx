import React from 'react';
import './Switch.css';

export function Switch(props: any) {
    return (
        <form className="form">
            <span className="toggler-label">
                {props.label}:
                    </span>
            <label className="toggler">
                <input type="checkbox" name={props.name} checked={props.checked} onChange={props.onChange} />
                <span className="slider round"></span>
            </label>
        </form>)
}