//"use strict";
//
var React = require('react');
var humanize = require('string-humanize');

import TextField from 'material-ui/lib/text-field';

TextInput = React.createClass({
    // list out our required and optional properties for this class
    propTypes: {
        name: React.PropTypes.string.isRequired,
        label: React.PropTypes.string,
        onChange: React.PropTypes.func.isRequired,
        placeholder: React.PropTypes.string,
        value: React.PropTypes.string,
        //defaultValue: React.PropTypes.string,
        error: React.PropTypes.string,
        hideLabel: React.PropTypes.bool,
        textRows: React.PropTypes.number,
        showFloatingLabels: React.PropTypes.bool,
        fullWidth: React.PropTypes.bool
    },

    getDefaultProps() {
        return {
            hideLabel: false,
            showFloatingLabels: false,
            fullWidth: false
        };
    },


    render() {
        const humanizedName = humanize(this.props.name);

        if (this.props.textRows) {
            return (
                <TextField
                    type="text"
                    name={this.props.name}
                    floatingLabelText={this.props.showFloatingLabels}
                    hintText={this.props.placeholder ? this.props.placeholder : humanizedName}
                    errorText={this.props.error}
                    rows={this.props.textRows}
                    ref={this.props.name}
                    id={this.props.name}
                    value={this.props.value}
                    onChange={this.props.onChange}
                    fullWidth={this.props.fullWidth}
                />
            );
        } else {
            return (
                <TextField
                    type="text"
                    name={this.props.name}
                    floatingLabelText={this.props.showFloatingLabels}
                    hintText={this.props.placeholder ? this.props.placeholder : humanizedName}
                    errorText={this.props.error}
                    ref={this.props.name}
                    id={this.props.name}
                    value={this.props.value}
                    onChange={this.props.onChange}
                    fullWidth={this.props.fullWidth}
                />
            );
        }
    }
});

module.exports = TextInput;