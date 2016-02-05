//"use strict";
//
//var React = require('react');

TextInput = React.createClass({
    // list out our required and optional properties for this class
    propTypes: {
        name: React.PropTypes.string.isRequired,
        label: React.PropTypes.string.isRequired,
        onChange: React.PropTypes.func.isRequired,
        placeholder: React.PropTypes.string,
        value: React.PropTypes.string,
        //defaultValue: React.PropTypes.string,
        error: React.PropTypes.string
    },

    render: function () {
        //console.log("props: ", this.props);

        // This is for bootstrap, we want to wrap our label and textbox in a 'form-group'
        // class, and also to add 'has-error' (which gives us a red outline) if the data is in error
        var wrapperClass = 'form-group';
        if (this.props.error && this.props.error.length > 0) {
            console.log("has error ", this.props.error);
            wrapperClass += " " + 'has-error';
        }

        return (
            <div className={wrapperClass}>
                <label htmlFor={this.props.name}>{this.props.label}</label>
                <div className="field">
                    <input type="text"
                           name={this.props.name}
                           className="form-control"
                           placeholder={this.props.placeholder}
                           ref={this.props.name}
                           id={this.props.name}
                           value={this.props.value}
                           //defaultValue={this.props.defaultValue}
                           onChange={this.props.onChange} />
                    <div className="input">{this.props.error}</div>
                </div>
            </div>

        );
    }
});

//module.exports = TextInput;