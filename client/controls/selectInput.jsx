
var React = require('react');
var Select = require('react-select');
var humanize = require('string-humanize');

SelectInput = React.createClass({
    // list out our required and optional properties for this class
    propTypes: {
        name: React.PropTypes.string.isRequired,
        label: React.PropTypes.string.isRequired,
        value: React.PropTypes.string,
        //defaultOption: React.PropTypes.string.isRequired,
        options: React.PropTypes.array.isRequired,
        onChange: React.PropTypes.func.isRequired,
        valueKey: React.PropTypes.string.isRequired,
        labelKey: React.PropTypes.string.isRequired,
        error: React.PropTypes.string,
        hideLabel: React.PropTypes.bool
    },


    onChangeHandler(selectedOption) {
        //console.log("selectInput event ", event)
        this.props.onChange({
            name: this.props.name,
            labelKey: this.props.labelKey,
            valueKey: this.props.valueKey,
            selectedOption //1.0.0 this is the selected row object, not just the id
        });
    },

    renderLabel() {
        if (!this.props.hideLabel) {
            return (
                <label htmlFor={this.props.name}>{this.props.label ? this.props.label : humanize(this.props.name)}</label>
            );
        }
    },

    render() {
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
                    <Select
                        name={this.props.name}
                        value={this.props.value}
                        options={this.props.options}
                        onChange={this.onChangeHandler}
                        valueKey={this.props.valueKey}
                        labelKey={this.props.labelKey}
                        placeholder={this.props.placeholder ? this.props.placeholder : humanizedName}
                    />
                    <div className="input">{this.props.error}</div>
                </div>
            </div>

        );
    }
});

module.exports = SelectInput;