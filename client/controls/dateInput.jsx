
var React = require('react');
var humanize = require('string-humanize');

import moment from 'moment';

import DatePicker from 'material-ui/lib/date-picker/date-picker';

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

    render() {
       // console.log("props: ", this.props);

        const format = "YYYY-MM-DD";
        const inputFormat = "DD/MM/YYYY";
        const mode = "date";
        const convertedDate = moment(this.props.value).format("YYYY-MM-DD");
        //console.log("convertedDate ", convertedDate );

        const humanizedName = humanize(this.props.name);

        return (
                    <DatePicker
                        hintText={humanizedName}
                        dateTime={convertedDate}
                        //formatDate={format}
                        inputFormat={inputFormat}
                        onChange={this.onChangeHandler}
                        viewMode={mode}
                        autoOk={true}
                        errorText={this.props.error} // undocumented feature
                    />
        );
    }
});

module.exports = DateInput;
