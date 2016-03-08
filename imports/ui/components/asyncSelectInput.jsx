import React from 'react';
import Select from 'react-select';
var humanize = require('string-humanize');

const AsyncSelectInput = React.createClass({
    // list out our required and optional properties for this class
    propTypes: {
        name: React.PropTypes.string.isRequired,
        label: React.PropTypes.string,
        // The value needs to be an object with two properties called the same as the valueKey and the labelKey
        value: React.PropTypes.object.isRequired,
        loadOptions: React.PropTypes.func.isRequired,
        onChange: React.PropTypes.func.isRequired,
        valueKey: React.PropTypes.string.isRequired,
        labelKey: React.PropTypes.string.isRequired,
        error: React.PropTypes.string,
        hideLabel: React.PropTypes.bool
    },

    onChangeHandler(selectedOption) {
        //console.log("AsyncSelectInput.onChangeHandler selectedOption ",
        //    selectedOption[this.props.valueKey] + " " + selectedOption[this.props.labelKey])

        this.props.onChange({
            name: this.props.name,
            labelKey: this.props.labelKey,
            valueKey: this.props.valueKey,
            // selectedOption is null when the user presses the 'x' button
            selectedOption
        });
    },

    loadOptions(input, callback) {
        console.log("OrderHeaderEdit.loadOptions() ", input);

        var data = {
            options: this.props.loadOptions(input),
            // this tells the select control whether this is the complete dataset of all possible options,
            // which in turn tells the control whether to bother re-querying the datasource or instead
            // just to use it's cached dataset.
            complete: false
        };

        setTimeout(function () {
            console.log("setTimeout", input);
            callback(null, data);
        }, 500);
    },

    // The value needs to be an object with two properties called the same as the valueKey and the labelKey
    getValue() {
        //console.log("AsyncSelectInput.getValue(): this.props.value = ",
        //    this.props.valueKey + " - " + this.props.labelKey);
        //console.log("AsyncSelectInput.getValue(): this.props.value = ",
        //    this.props.value[this.props.valueKey] + " - " + this.props.value[this.props.labelKey]);

        return {
            [this.props.valueKey]: this.props.value[this.props.valueKey],
            [this.props.labelKey]: this.props.value[this.props.labelKey]
        };
    },

    renderLabel() {
        if (!this.props.hideLabel) {
            return (
                <label htmlFor={this.props.name}>{this.props.label ? this.props.label : humanize(this.props.name)}</label>
            );
        }
    },

    render() {
        //console.log("AsyncSelectInput.render() - value=", this.props.value)

        // This is for bootstrap, we want to wrap our label and textbox in a 'form-group'
        // class, and also to add 'has-error' (which gives us a red outline) if the data is in error
        var wrapperClass = 'form-group';
        if (this.props.error && this.props.error.length > 0) {
            wrapperClass += " " + 'has-error';
        }

        const humanizedName = humanize(this.props.name);

        return (
            <div className={wrapperClass}>
                {this.renderLabel()}
                <div className="field">
                    <Select.Async
                        name={this.props.name}
                        value={this.getValue()}
                        loadOptions={this.loadOptions}
                        onChange={this.onChangeHandler}
                        valueKey={this.props.valueKey}
                        labelKey={this.props.labelKey}
                        placeholder= "yo" //{this.props.placeholder ? this.props.placeholder : humanizedName}
                        // stop the control caching the results - if true only searches the list retrieved on first load
                        cache={true}
                        searchingText="Loading results..."
                        minimumInput={1} // number of letters needed before a search starts
                        autoload={false}
                        matchProp="label" // Typed input is only matched to the label, not to the id as well
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

