
import React from 'react';
import humanize from 'string-humanize';

import DateTimeField from 'react-bootstrap-datetimepicker';
import moment from 'moment';

DateInput = React.createClass({
    // list out our required and optional properties for this class
    propTypes: {
        name: React.PropTypes.string.isRequired,
        label: React.PropTypes.string,
        onChange: React.PropTypes.func.isRequired,
        placeholder: React.PropTypes.string,
        value: React.PropTypes.instanceOf(Date),
        //defaultValue: React.PropTypes.string,
        error: React.PropTypes.string,
        hideLabel: React.PropTypes.bool
    },

    onChangeHandler(event) {
        //event.target.name = this.props.name;

        this.props.onChange({
            target: {
                name: this.props.name,
                value: moment(event, "YYYY-MM-DD").toDate()
            }
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
       // console.log("props: ", this.props);

        // This is for bootstrap, we want to wrap our label and textbox in a 'form-group'
        // class, and also to add 'has-error' (which gives us a red outline) if the data is in error
        var wrapperClass = 'form-group';
        if (this.props.error && this.props.error.length > 0) {
            //console.log("has error ", this.props.error);
            wrapperClass += " " + 'has-error';
        }

        const format = "YYYY-MM-DD";
        const inputFormat = "DD/MM/YYYY";
        const mode = "date";
        const convertedDate = moment(this.props.value).format("YYYY-MM-DD");
        //console.log("convertedDate ", convertedDate );

        const humanizedName = humanize(this.props.name);

        return (
            <div className={wrapperClass}>
                {this.renderLabel()}
                <div className="field">
                    <DateTimeField
                        dateTime={convertedDate}
                        format={format}
                        inputFormat={inputFormat}
                        onChange={this.onChangeHandler}
                        viewMode={mode}
                    />
                    <div className="input">{this.props.error}</div>
                </div>
            </div>

        );

        // test branch
    }
});

export default DateInput;
                           //name={this.props.name}
                           //className="form-control"
                           ////placeholder={this.props.placeholder}
                           //ref={this.props.name}
                           //id={this.props.name}
                           ////defaultValue={this.props.defaultValue}
