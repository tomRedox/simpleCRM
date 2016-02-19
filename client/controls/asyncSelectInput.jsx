//"use strict";

import React from 'react';
import Select from 'react-select';

const AsyncSelectInput = React.createClass({
    // list out our required and optional properties for this class
    propTypes: {
        name: React.PropTypes.string.isRequired,
        label: React.PropTypes.string.isRequired,
        value: React.PropTypes.object.isRequired,
        //defaultOption: React.PropTypes.string.isRequired,
        loadOptions: React.PropTypes.func.isRequired,
        onChange: React.PropTypes.func.isRequired,
        valueKey: React.PropTypes.string.isRequired,
        labelKey: React.PropTypes.string.isRequired,
        error: React.PropTypes.string
    },


    onChangeHandler(selectedOption) {
        console.log("AsyncSelectInput.onChangeHandler selectedOption ",
            selectedOption[this.props.valueKey] + " " + selectedOption[this.props.labelKey])

        this.props.onChange({
            name: this.props.name,
            value: selectedOption[this.props.valueKey],
            label: selectedOption[this.props.labelKey]  //1.0.0
            //value: selectedOption //0.9
        });
    },


    //getOptions(input, callback) {
    //    console.log("getOptions", input);
    //    input = input.toLowerCase();
    //
    //    var data = {
    //        options: [
    //            { _id: '1', name: 'Hard' },
    //            { _id: '2', name: 'Hord' },
    //            { _id: '3', name: 'Harris' },
    //            { _id: '4', name: 'Ham' },
    //            { _id: '5', name: 'Hockney' },
    //            { _id: '6', name: 'Horris' },
    //            { _id: '7', name: 'Hamilton' },
    //            { _id: '8', name: 'Honest' }
    //        ],
    //        // CAREFUL! Only set this to true when there are no more options,
    //        // or more specific queries will not be sent to the server.
    //        complete: true
    //    };
    //
    //    setTimeout(function () {
    //        callback(null, data);
    //    }, 500);
    //},

    getValue() {
        console.log("AsyncSelectInput.getValue(): this.props.value = ", this.props.valueKey + " - " + this.props.labelKey);
        console.log("AsyncSelectInput.getValue(): this.props.value = ", this.props.value[this.props.valueKey] + " - " + this.props.value[this.props.labelKey]);


        return {
            _id: this.props.value._id,
            name: this.props.value.name
        };


        return this.props.value;
        // To work around react-select's weird input api
        const {val} = this.props.value;

        var result;

        if (!val) {
            result = {
                _id:  '',
                name: "forced value"
            };
        } else {
            return this.props.value;
        }

        return result;
    },

    //getOptions(input, callback) {
    //
    //    console.log("getOptions start", this.props.value);
    //    const results = this.props.loadOptions(input, callback);
    //
    //    if ( (!results || results.length === 0) && (this.props.value) ) {
    //        console.log("getOptions no match", this.props.value);
    //
    //        var data = {
    //            options: [ {
    //                _id: this.props.value,
    //                name: "hi there"
    //            }
    //            ],
    //            complete: true
    //        };
    //
    //        setTimeout(function () {
    //            console.log("setTimeout", input);
    //            callback(null, data);
    //        }, 1);
    //    }
    //},

    render() {
        console.log("AsyncSelectInput.render() - value=", this.props.value)
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
                        value={ this.getValue() } //getValue() }
                        //asyncOptions={this.props.loadOptions} // 0.9.x .loadOptions}
                        loadOptions={this.props.loadOptions} // 1.0
                        onChange={this.onChangeHandler}
                        valueKey={this.props.valueKey}
                        labelKey={this.props.labelKey}
                        //cacheAsyncResults={false} // 0.9.x syntax
                        cache={false} // 1.0.0 change this to 'cache' stop the control caching the results - if true only searches the list retrieved on first load
                        searchingText="Loading results..."
                        minimumInput={2} // number of letters needed before a search starts
                        autoload={false}
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
