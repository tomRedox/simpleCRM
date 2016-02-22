var React = require('react');
import Select from 'react-select';


const GlobalSearch = React.createClass({
    //propTypes: {
    //    //order: React.PropTypes.object,
    //    //onSave: React.PropTypes.func.isRequired
    //},

    //mixins: [ ReactMeteorData ],

    getMeteorData() {
        //console.log("Empty.getMeteorData");
    },

    //getDefaultProps() {
    //    return {
    //        order: {}
    //    };
    //},

    getInitialState() {
        //console.log("Empty.getInitialState(): props", this.props);

        return {
            searchTerm: {
                _id: '',
                name: ''
            },
            error: ""
        };
    },

    onChange(selectedItem) {
        //return this.setState({searchTerm: });
    },

    //getResults() {
    //    Meteor.subscribe("CustomerCompanies.fullTextSearch", this.state.searchTerm);
    //    let customerHandle = CustomerCompanies.find({}, { sort: [ [ "score", "desc" ] ] });
    //
    //},

    loadOptions(input, callback) {
        console.log("OrderHeaderEdit.loadOptions() ", input);
        console.log("this.state.searchTerm ", this.state.searchTerm);

        Meteor.subscribe("CustomerCompanies.fullTextSearch", input);
        //let customerHandle = CustomerCompanies.find({}, { sort: [ [ "score", "desc" ] ] });

        var data = {
            options: CustomerCompanies.find({}, { sort: [ [ "score", "desc" ] ] }).fetch(),
            // this tells the select control whether this is the complete dataset of all possible options,
            // which in turn tells the control whether to bother re-querying the datasource or instead
            // just to use it's cached dataset.
            complete: false
        };

        console.log("data", data);

        setTimeout(function () {
            console.log("setTimeout", input);
            callback(null, data);
        }, 500);
    },

    render() {
        //console.log("render()", this.props);

        return (

            <Select.Async  style={ {minWidth: '270px'} }
                name="globalSearch"
                //value={this.getValue()}
                loadOptions={this.loadOptions}
                onChange={this.onChange}
                valueKey="_id"
                labelKey="name"
                placeholder= "Search" //{this.props.placeholder ? this.props.placeholder : humanizedName}
                // stop the control caching the results - if true only searches the list retrieved on first load
                cache={false}
                searchingText="Loading results..."
                minimumInput={1} // number of letters needed before a search starts
                autoload={false}
                matchProp="label" // Typed input is only matched to the label, not to the id as well
            />



        );
    }
});

export default GlobalSearch;
