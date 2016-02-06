// App component - represents the whole app

import React from 'react';
//import { Link } from 'react-router';

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



    renderCustomerTable() {
        //console.log("customers2", this.data.customers)

        // Get tasks from this.data.tasks
        return (
            <table className="table table-responsive table-striped">
                <tbody>
                <tr>
                    <th>Customer name</th>
                    <th>Postcode</th>
                    <th></th>
                </tr>
                {this.renderCustomerListItems()}
                </tbody>
            </table>

        )
    },

    renderCustomerListItems() {
        //console.log("customers2", this.data.customers)

        // Get tasks from this.data.tasks
        return this.data.customers.map((customer) => {

            return (

                <tr key={customer._id}>
                    <td>{customer.name}</td>
                    <td>{customer.postcode}</td>
                    <td><a className="btn btn-default btn-sm" href={"/customers/" + customer._id}>Edit</a></td>
                </tr>

            );
        });
    },



    render() {
        return (
            <div className="panel panel-default">
                <div className="panel-heading"><a href="#" className="pull-right">View all</a>
                    <h4>Top Customers</h4>
                </div>
                <div className="panel-body">

                        { this.data.customers ?
                                this.renderCustomerTable() :
                                <p>Loading</p> }
                </div>
            </div>
        );
    }
});


module.exports = CustomersList;