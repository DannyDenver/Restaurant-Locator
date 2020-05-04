import React from 'react';
import './Table.css';
import { TableColumn } from '../../models/TableColumn';

export default class Table extends React.Component<{ items: any[], columns: TableColumn[], rowsPerPage: number, rowKey: string }, { currentPage: number }> {
    get maxPageNumber() { return Math.ceil(this.props.items.length / 10) }
    get startingIndex() { return (this.state.currentPage - 1) * this.props.rowsPerPage }

    constructor(props: any) {
        super(props);
        this.state = {
            currentPage: 1
        };
    }

    componentDidUpdate(prevProps: any) {
        if (prevProps.items !== this.props.items) {
            this.setState({ currentPage: 1 })
        }
    }

    next() {
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
                <div className="table-container">
                    <table className="data-table">
                        <thead>
                            <tr>
                                {
                                    Array.from(this.props.columns).map(column => {
                                        return (<th key={column.header} style={{ width: column.columnWidth }} >{column.header}</th>)
                                    })
                                }
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.props.items.length ?
                                    this.props.items.slice(this.startingIndex, this.startingIndex + this.props.rowsPerPage).map(item => {
                                        return (
                                            (<tr key={item[this.props.rowKey]}>
                                                {
                                                    Array.from(this.props.columns).map(column => {
                                                        return (<td key={item[this.props.rowKey] + item[column.property]}>
                                                            {item[column.property]}
                                                        </td>)
                                                    })
                                                }
                                            </tr>)
                                        )
                                    }) :
                                    <tr>
                                        <td className="no-results" colSpan={5}>{'No results found.'}</td>
                                    </tr>
                            }
                        </tbody>
                    </table>
                </div>
                {
                    this.props.items.length ?
                        (<div className="flex-container">
                            <div className="paginator">
                                <button type="button">
                                    <svg className="nav-arrow" onClick={this.previous} baseProfile="tiny" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 15 25" aria-hidden="true" focusable="false"><path d="M13.761 0L15 1.125 2.478 12.5 15 23.875 13.761 25 0 12.5z"></path></svg>
                                </button>
                                <div className="paginator-number">
                                    &nbsp; {this.state.currentPage} / {this.maxPageNumber} &nbsp;
                                </div>
                                <button type="button">
                                    <svg className="nav-arrow right" onClick={() => this.next()} baseProfile="tiny" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 15 25" aria-hidden="true" focusable="false"><path d="M13.761 0L15 1.125 2.478 12.5 15 23.875 13.761 25 0 12.5z"></path></svg>
                                </button>
                            </div>
                        </div>)
                        : null
                }
            </>
        )
    }
}
