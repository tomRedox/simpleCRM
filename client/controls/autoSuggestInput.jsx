import React from 'react';
import Autosuggest from 'react-autosuggest';




const AutoSuggestInput = React.createClass({
    propTypes: {
        name: React.PropTypes.string.isRequired,
        label: React.PropTypes.string.isRequired,
        suggestions: React.PropTypes.func.isRequired,
        onChange: React.PropTypes.func.isRequired,
        placeholder: React.PropTypes.string.isRequired,
        errors: React.PropTypes.object.isRequired

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

            // value: newValue

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
            value: this.props.value,
            onChange: this.onListChange
        };


        return (

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


        );
    }
});

export default AutoSuggestInput;
