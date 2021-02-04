import React, { Component, Fragment } from "react";

class Autocomplete extends Component {

    constructor(props) {
        super(props);
        this.state = {
            activeSuggestion: 0,
            filteredSuggestions: [],
            showSuggestions: false,
            userInput: "",
            data: this.props.data,
            scanAmount: "",
            addedDiscount: ""
        };
    }

    onChange = e => {
        
        var { suggestions } = this.props;
        var userInput = e.currentTarget.value;
        var filteredSuggestions = suggestions.filter(
            suggestion =>
                suggestion.toLowerCase().indexOf(userInput.toLowerCase()) > -1
        );
        var res = this.state.data.filter(val => 
            val.medicalBilling.toLowerCase().includes(e.target.value.toLowerCase()) 
        );
        this.setState({
            data: res,
            scanAmount: res[0].amount,
            activeSuggestion: 0,
            filteredSuggestions,
            showSuggestions: true,
            userInput: e.currentTarget.value
        });
        if(e.target.value == "") this.setState({data: this.props.data});
    };

    onClick = e => {
        var res = this.state.data.filter(val => 
            val.medicalBilling.toLowerCase().includes(e.target.innerText.toLowerCase()) 
        );
        this.setState({
            data: res,
            scanAmount: res[0].amount,
            activeSuggestion: 0,
            filteredSuggestions: [],
            showSuggestions: false,
            userInput: e.currentTarget.innerText
        });
    };

    onKeyDown = e => {
        const { activeSuggestion, filteredSuggestions } = this.state;

        if (e.keyCode === 13) {
            this.setState({
                activeSuggestion: 0,
                showSuggestions: false,
                userInput: filteredSuggestions[activeSuggestion]
            });
        } else if (e.keyCode === 38) {
            if (activeSuggestion === 0) {
                return;
            }
            this.setState({ activeSuggestion: activeSuggestion - 1 });
        }
        // User pressed the down arrow, increment the index
        else if (e.keyCode === 40) {
            if (activeSuggestion - 1 === filteredSuggestions.length) {
                return;
            }
            this.setState({ activeSuggestion: activeSuggestion + 1 });
        }
    };

    onChangeDiscount = e => {
        this.setState({addedDiscount : e.target.value});
    }

    onAddClick = e => {
        var arr = [];
        var addedRow = {
            id : 1,
            medicalBilling : this.state.userInput,
            amount: this.state.scanAmount,
            maxDiscount: this.state.addedDiscount,
            modality: ""
        }
        arr.push(addedRow);
        this.setState({data : arr});
    };

    onDeleteClick = e => {
        this.setState({data : []});
    }

    render() {
        const {
            onChange,
            onClick,
            onKeyDown,
            onAddClick,
            onDeleteClick,
            onChangeDiscount,
            state: {
                activeSuggestion,
                filteredSuggestions,
                showSuggestions,
                userInput
            }
        } = this;

        let suggestionsListComponent;

        if (showSuggestions && userInput) {
            if (filteredSuggestions.length) {
                suggestionsListComponent = (
                    <ul class="suggestions">
                        {filteredSuggestions.map((suggestion, index) => {
                            let className;

                            // Flag the active suggestion with a class
                            if (index === activeSuggestion) {
                                className = "suggestion-active";
                            }
                            return (
                                <li className={className} key={suggestion} onClick={onClick}>
                                    {suggestion}
                                </li>
                            );
                        })}
                    </ul>
                );
            } else {
                suggestionsListComponent = (
                    <div class="no-suggestions">
                        <em>No suggestions available.</em>
                    </div>
                );
            }
        }

        return (
            <Fragment>
                <input
                    type="text"
                    onChange={onChange}
                    onKeyDown={onKeyDown}
                    value={userInput}
                    placeholder="Autocomplete Search"
                />
                {suggestionsListComponent}

                <label htmlFor="scanAmount">Scan Amount</label>
                <input type="text" value={this.state.scanAmount} disabled/>
                <label htmlFor="discount">Discount</label>
                <input type="text" value={this.state.addedDiscount} onChange={onChangeDiscount}/>
                <input type="button" value="Add" onClick={onAddClick} style={{ marginLeft: 10 }}/>
                <span> | </span>
                <input type="button" value="Delete Row" onClick={onDeleteClick}/>
                <div className="card mt-50">
                    <table className="table">
                        <thead>
                            <tr className="table">
                                <th className="table-header">Sno</th>
                                <th className="table-header">Scan Name</th>
                                <th className="table-header">Scan Amount</th>
                                <th className="table-header">Discount</th>
                                <th className="table-header">Total Amount</th>
                   
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.data.map((item) => (
                                <tr>
                                    <td>{item.id}</td>
                                    <td>{item.medicalBilling}</td>
                                    <td>{item.amount}</td>
                                    <td>{item.maxDiscount}</td>
                                    <td>{item.amount - item.maxDiscount}</td>
                                </tr>
                            )
                            )}
                        </tbody>
                    </table>
                </div>
            </Fragment>

        );
    }
}

export default Autocomplete;