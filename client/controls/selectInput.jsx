//"use strict";

var React = require('react');
var Select = require('react-select');

SelectInput = React.createClass({
    // list out our required and optional properties for this class
    propTypes: {
        name: React.PropTypes.string.isRequired,
        label: React.PropTypes.string.isRequired,
        value: React.PropTypes.string.isRequired,
        //defaultOption: React.PropTypes.string.isRequired,
        options: React.PropTypes.array.isRequired,
        onChange: React.PropTypes.func.isRequired,
        valueKey: React.PropTypes.string.isRequired,
        labelKey: React.PropTypes.string.isRequired,
        error: React.PropTypes.string
    },


    onChangeHandler: function(event) {
        //console.log("selectInput event ", event)
        this.props.onChange({
            target: {
                name: this.props.name,
                value: event
            }
        });
    },

    render: function () {
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
                    <Select
                        name={this.props.name}
                        value={this.props.value}
                        options={this.props.options}
                        onChange={this.onChangeHandler}
                        valueKey={this.props.valueKey}
                        labelKey={this.props.labelKey}
                    />
                    <div className="input">{this.props.error}</div>
                </div>
            </div>

        );
    }
});

module.exports = SelectInput;