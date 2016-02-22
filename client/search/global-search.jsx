var React = require('react');
import Select from 'react-select';
import Products from '../../api/products/products';
import Orders from '../../api/orders/order';
import accounting from 'accounting';

const GlobalSearch = React.createClass({

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

        let results = [];

        // Get the Products
        Meteor.call('Products.fullTextSearch.method', {
            searchValue: input
        }, (err, res) => {
            if (err) {
                sAlert("Could not retrieve Product search matches");
                console.log('Products.fullTextSearch.method Error: ', err);
            } else {
                //console.log("Products res", res);
                products = res;

                // Get the Orders
                Meteor.call('Orders.fullTextSearch.method', {
                    searchValue: input
                }, (err1, res1) => {
                    if (err1) {
                        sAlert("Could not retrieve Order search matches");
                        console.log('Orders.fullTextSearch.method Error: ', err1);
                    } else {
                        //console.log("Orders res", res1);
                        orders = res1;

                        orders = res1.map(function (order) {
                            return {
                                _id: order._id,
                                name: order.createdAt.toLocaleString() + " " +
                                        order.customerName + " " + accounting.formatMoney(order.totalValue, "£")
                            };
                        })

                        // Get the CustomerCompanies
                        Meteor.call('CustomerCompanies.fullTextSearch.method', {
                            searchValue: input
                        }, (err2, res2) => {
                            if (err2) {
                                sAlert("Could not retrieve Customer search matches");
                                console.log('CustomerCompanies.fullTextSearch.method Error: ', err2);
                            } else {
                                //console.log("CustomerCompanies res", res2);
                                customerCompanies = res2;

                                // Concatenate the whole lot into a single list with some headings
                                let options = [].concat(
                                    products.length > 0 ? [ {_id: '', name: "Products:", heading: true, disabled: true} ] : [],
                                    products,
                                    orders.length > 0 ? [ {_id: '', name: "Orders:", heading: true, disabled: true } ] : [],
                                    orders,
                                    customerCompanies.length > 0 ? [ {
                                        _id: '', name: "CustomerCompanies:", heading: true, disabled: true
                                    } ] : [],
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
                //optionRenderer={this.renderOption}
            />
        );
    }
});

export default GlobalSearch;
