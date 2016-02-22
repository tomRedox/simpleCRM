var React = require('react');
import Select from 'react-select';
import Products from '../../api/products/products';
import Orders from '../../api/orders/order';


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

    getResults(input, callback) {
        console.log("getResults input:", input);

        let products = [];
        let orders = [];
        let customerCompanies = [];

        Meteor.call('Products.fullTextSearch.method', {
            searchValue: input
        }, (err, res) => {
            if (err) {
                sAlert("Could not retrieve Product search matches");
                console.log('Products.fullTextSearch.method Error: ', err);
            } else {
                //console.log("Products res", res);
                products = res;


               Meteor.call('Orders.fullTextSearch.method', {
                    searchValue: input
                }, (err1, res1) => {
                    if (err1) {
                        sAlert("Could not retrieve Order search matches");
                        console.log('Orders.fullTextSearch.method Error: ', err1);
                    } else {
                        //console.log("Orders res", res1);
                        orders = res1;


                        Meteor.call('CustomerCompanies.fullTextSearch.method', {
                            searchValue: input
                        }, (err2, res2) => {
                            if (err2) {
                                sAlert("Could not retrieve Customer search matches");
                                console.log('CustomerCompanies.fullTextSearch.method Error: ', err2);
                            } else {
                                //console.log("CustomerCompanies res", res2);
                                customerCompanies = res2;

                                // Concatenate the whole lot into a single list
                                let options = [].concat(
                                    products.length > 0 ? [ {_id: '', name: "Products:" } ] : [],
                                    products,
                                    orders.length > 0 ? [ {_id: '', name: "Orders:" } ] : [],
                                    orders,
                                    customerCompanies.length > 0 ? [ {_id: '', name: "CustomerCompanies:" } ] : [],
                                    customerCompanies
                                );

                                console.log("options: ", options);


                                var data = {
                                    options,
                                    complete: false
                                };

                                //console.log("data", data.options);


                                callback(null, data);
                            }
                        });

                    }
                });

            }
        });
    },

    render() {
        //console.log("render()", this.props);

        return (

            <Select.Async style={ {minWidth: '270px'} }
                name="globalSearch"
                //value={this.getValue()}
                loadOptions={_.debounce(this.getResults, 300)}
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
                filterOption = {function (option, filter) { return true; }}
    />
        );
    }
});

export default GlobalSearch;
