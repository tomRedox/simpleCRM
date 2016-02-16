import React from 'react';
import Autosuggest from 'react-autosuggest';




const OrderHeaderEdit = React.createClass({
    propTypes: {
        order: React.PropTypes.object.isRequired,
        onChange: React.PropTypes.func.isRequired,
        onSave: React.PropTypes.func.isRequired,
        errors: React.PropTypes.object.isRequired,
        isValid: React.PropTypes.bool
    },

    getInitialState() {

        return {
            value: '',
            suggestions: this.getSuggestions('')
        };
    },

    languages: [
        {
            name: 'C',
            year: 1972
        },
        {
            name: 'Cobol',
            year: 1980
        },
        {
            name: 'C++',
            year: 2001
        },
        {
            name: 'Elm',
            year: 2012
        }

    ],

    getSuggestions(value) {
        const inputValue = value.trim().toLowerCase();
        const inputLength = inputValue.length;

        return inputLength === 0 ? [] : this.languages.filter(lang =>
            lang.name.toLowerCase().slice(0, inputLength) === inputValue
        );
    },

    getSuggestionValue(suggestion) { // when suggestion selected, this function tells
        return suggestion.name;                 // what should be the value of the input
    },

    renderSuggestion(suggestion) {
        return (
            <span>{suggestion.name}</span>
        );
    },


    onListChange(event, { newValue }) {
        this.setState({
            value: newValue
        });
    },

    onSuggestionsUpdateRequested({ value }) {
        this.setState({
            suggestions: this.getSuggestions(value)
        });
    },

    shouldRenderSuggestions(value) {
        return value.trim().length > 1;
    },

    render() {
        console.log("OrderHeaderEdit props: ", this.props);

        const inputProps = {
            placeholder: 'Type a programming language',
            value: this.state.value,
            onChange: this.onListChange
        };


        return (


            <div>
                <div className='form-group'>

                    <div className="field">
                <Autosuggest
                    suggestions={this.state.suggestions}
                    onSuggestionsUpdateRequested={this.onSuggestionsUpdateRequested}
                    getSuggestionValue={this.getSuggestionValue}
                    renderSuggestion={this.renderSuggestion}
                    shouldRenderSuggestions={this.shouldRenderSuggestions}
                    inputProps={inputProps}
                />
                    </div>
                </div>

                <TextInput
                    name="deliveryAddress1"
                    label="Delivery Address 1"
                    onChange={this.props.onChange}
                    placeholder="Delivery Address 1"
                    value={this.props.order.deliveryAddress1}
                    error={this.props.errors.deliveryAddress1}
                />


                <TextInput
                    name="notes"
                    label="Notes"
                    onChange={this.props.onChange}
                    placeholder="Notes"
                    value={this.props.order.notes}
                    error={this.props.errors.notes}
                />

                <div className="form-group">
                <label>Total Value: </label>
                <label name="orderTotal">{this.props.order.totalValue}</label>
                </div>

                <div className="form-group">
                <a className="btn btn-warning" id="cancelButton" href="/">Cancel</a>

                <input
                    type="submit"
                    value="Save"
                    className="btn btn-primary"
                    onClick={this.props.onSave}
                    disabled={!this.props.isValid}
                />
                </div>
            </div>
        );
    }
});

export default OrderHeaderEdit;
