//"use strict";
//
var React = require('react');
var humanize = require('string-humanize');


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
        textRows: React.PropTypes.number
    },

    getDefaultProps() {
        return {
            hideLabel: false
        };
    },

    renderLabel() {
        if (!this.props.hideLabel) {
            return (
                <label htmlFor={this.props.name}>{this.props.label ? this.props.label : humanize(this.props.name)}</label>
            );
        }
    },

    renderTextArea() {
        const humanizedName = humanize(this.props.name);

        if (this.props.textRows) {
            return (
                <textarea
                       name={this.props.name}
                       rows={this.props.textRows}
                       className="form-control"
                       placeholder={this.props.placeholder ? this.props.placeholder : humanizedName}
                       ref={this.props.name}
                       id={this.props.name}
                       value={this.props.value}
                       onChange={this.props.onChange} />
            );
        } else {
            return (
                <input type="text"
                       name={this.props.name}
                       className="form-control"
                       placeholder={this.props.placeholder ? this.props.placeholder : humanizedName}
                       ref={this.props.name}
                       id={this.props.name}
                       value={this.props.value}
                       onChange={this.props.onChange} />
            );
        }
    },

    render() {
        //console.log("props: ", this.props);

        // This is for bootstrap, we want to wrap our label and textbox in a 'form-group'
        // class, and also to add 'has-error' (which gives us a red outline) if the data is in error
        let wrapperClass = 'form-group';
        if (this.props.error && this.props.error.length > 0) {
            //console.log("has error ", this.props.error);
            wrapperClass += " " + 'has-error';
        }


        return (
            <div className={wrapperClass}>
                {this.renderLabel()}
                <div className="field">
                    {this.renderTextArea()}
                    <div className="input text-muted">{this.props.error}</div>
                </div>
            </div>

        );
    }
});

module.exports = TextInput;