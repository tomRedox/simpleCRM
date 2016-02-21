//"use strict";
//
var React = require('react');
var humanize = require('string-humanize');
import accounting from 'accounting';

NumberInput = React.createClass({
    // list out our required and optional properties for this class
    propTypes: {
        name: React.PropTypes.string.isRequired,
        label: React.PropTypes.string,
        onChange: React.PropTypes.func.isRequired,
        placeholder: React.PropTypes.string,
        value: React.PropTypes.number,
        //defaultValue: React.PropTypes.string,
        error: React.PropTypes.string,
        hideLabel: React.PropTypes.bool,
        isMoney: React.PropTypes.bool,
        decimalPlaces:  React.PropTypes.number
    },


    getDefaultProps() {
        return {
            hideLabel: false,
            isMoney: false,
            decimalPlaces: 0
        };
    },

    renderLabel() {
        if (!this.props.hideLabel) {
            return (
                <label htmlFor={this.props.name}>{this.props.label ? this.props.label : humanize(this.props.name)}</label>
            );
        }
    },

    onChange(event) {
        // get rid of any money formatting
        //if(this.props.isMoney) {
        //    event.target.value = accounting.unformat(event.target.value);
        //}

        // don't trigger on change if they have typed "11." or "11,"
        let lastChar =  event.target.value.toString().charAt(event.target.value.toString().length-1);
        if (isNaN(parseFloat(lastChar))) { return ;}

        // don't trigger the change if they typed a non-number
        //if (isNaN(parseFloat(event.target.value))) { return ;}

        // pass the value on
        this.props.onChange(event);
    },

    getValue() {
        //if(this.props.isMoney) {
        //    return accounting.formatNumber(this.props.value, 2)
        //} else {
        //    return this.props.value;
        //}


        // Check if the user entered a number
        if (isNaN(parseFloat(this.props.value)))
        {
            // if not, just show whatever they typed
            return this.props.value;
        } else {
            // if so, show the value formatted to a fixed number of DP.
            return parseFloat(this.props.value).toFixed(this.props.decimalPlaces);
        }
     },

    render() {
        //console.log("props: ", this.props);

        // This is for bootstrap, we want to wrap our label and textbox in a 'form-group'
        // class, and also to add 'has-error' (which gives us a red outline) if the data is in error
        let wrapperClass = 'form-group';
        if (this.props.error && this.props.error.length > 0) {
            console.log("has error ", this.props.error);
            wrapperClass += " " + 'has-error';
        }

        const humanizedName = humanize(this.props.name);

        return (
            <div className={wrapperClass}>
                {this.renderLabel()}
                <div className="field">
                    <input type="text"
                           name={this.props.name}
                           className="form-control"
                           placeholder={this.props.placeholder ? this.props.placeholder : humanizedName}
                           ref={this.props.name}
                           id={this.props.name}
                           value={this.getValue()}
                           //defaultValue={this.props.defaultValue}
                           onChange={this.onChange} />
                    <div className="input">{this.props.error}</div>
                </div>
            </div>

        );
    }
});

module.exports = NumberInput;