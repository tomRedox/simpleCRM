// App component - represents the whole app

import React from 'react';

CustomersList = React.createClass({
    // This mixin makes the getMeteorData method work
    mixins: [ReactMeteorData],

    // Loads items from the Tasks collection and puts them on this.data.tasks
    getMeteorData() {

        var data = {};

        var handle = Meteor.subscribe('CustomerCompanies.public');
        if (handle.ready()) {
            const customers = CustomerCompanies.find().fetch();
            console.log("customers", customers);
            data.customers = customers;
        }

        return data;
    },

    renderCustomerListItem() {
        console.log("customers2", this.data.customers)

        // Get tasks from this.data.tasks
        return this.data.customers.map((customer) => {

            return <CustomerListItem key={customer._id} customer={customer}/>;
        });
    },

    render() {
        return (
            <div className="panel panel-default">
                <div className="panel-heading"><a href="#" className="pull-right">View all</a>
                    <h4>Top Customers</h4>
                </div>
                <div className="panel-body">
                    <div className="col-md-6">


                        <ul>
                            { this.data.customers ?
                                this.renderCustomerListItem() :
                                null }
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
});


module.exports = CustomersList;