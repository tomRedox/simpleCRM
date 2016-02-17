//"use strict";

import React from 'react';
import Select from 'react-select';

const AsyncSelectInput = React.createClass({
    // list out our required and optional properties for this class
    propTypes: {
        name: React.PropTypes.string.isRequired,
        label: React.PropTypes.string.isRequired,
        value: React.PropTypes.string.isRequired,
        //defaultOption: React.PropTypes.string.isRequired,
        loadOptions: React.PropTypes.func.isRequired,
        onChange: React.PropTypes.func.isRequired,
        valueKey: React.PropTypes.string.isRequired,
        labelKey: React.PropTypes.string.isRequired,
        error: React.PropTypes.string
    },


    onChangeHandler(selectedOption) {
        //console.log("selectInput event ", event)
        this.props.onChange({
            target: {
                name: this.props.name,
                value: selectedOption[this.props.valueKey]
            }
        });
    },


    getOptions(input, callback) {
        console.log("getOptions", input);
        input = input.toLowerCase();

        var data = {
            options: [
                { _id: '1', name: 'Hard' },
                { _id: '2', name: 'Hord' },
                { _id: '3', name: 'Harris' },
                { _id: '4', name: 'Ham' },
                { _id: '5', name: 'Hockney' },
                { _id: '6', name: 'Horris' },
                { _id: '7', name: 'Hamilton' },
                { _id: '8', name: 'Honest' }
            ],
            // CAREFUL! Only set this to true when there are no more options,
            // or more specific queries will not be sent to the server.
            complete: true
        };

        setTimeout(function () {
            callback(null, data);
        }, 500);
    },


    render() {
        console.log("render", this.props)
        // This is for bootstrap, we want to wrap our label and textbox in a 'form-group'
        // class, and also to add 'has-error' (which gives us a red outline) if the data is in error
        var wrapperClass = 'form-group';
        if (this.props.error && this.props.error.length > 0) {
            wrapperClass += " " + 'has-error';
        }

        return (
            <div className={wrapperClass}>
                <label htmlFor={this.props.name}>{this.props.label}</label>
                <div className="field">
                    <Select.Async
                        name={this.props.name}
                        value={this.props.value}
                        loadOptions={this.props.loadOptions}
                        onChange={this.onChangeHandler}
                        valueKey={this.props.valueKey}
                        labelKey={this.props.labelKey}
                        //cache={false} // stop the control caching the results - if true only searches the list retrieved on first load
                        minimumInput={3} // number of letters needed before a search starts
                    />
                    <div className="input">
                        {this.props.error}
                    </div>
                </div>
            </div>

        );
    }
});

export default AsyncSelectInput;
