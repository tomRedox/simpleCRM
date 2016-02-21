import React from 'react';
import accounting from 'accounting';

const CustomersList = React.createClass({
    // This mixin makes the getMeteorData method work
    mixins: [ ReactMeteorData ],

    // Loads items from the Tasks collection and puts them on this.data.tasks
    getMeteorData() {

        var data = {};

        var handle = Meteor.subscribe('CustomerCompanies.topCustomerCompanies');
        if (handle.ready()) {
            //const customers = CustomerCompanies.find().fetch();
            //console.log("customers", customers);
            data.customers = CustomerCompanies.find().fetch();
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
                    <th>No. orders</th>
                    <th>Total spend</th>
                    <th></th>
                </tr>
                {this.renderCustomerListItems()}
                </tbody>
            </table>
        );
    },

    renderCustomerListItems() {
        //console.log("customers2", this.data.customers)

        // Get tasks from this.data.tasks
        return this.data.customers.map((customer) => {

            return (

                <tr key={customer._id}>
                    <td>{customer.name}</td>
                    <td>{customer.postcode}</td>
                    <td>{customer.ordersCount}</td>
                    <td>{accounting.formatMoney(customer.ordersTotalValue, "£")}</td>
                    <td><a className="btn btn-default btn-sm" href={"/customers/" + customer._id}>Edit</a></td>
                </tr>

            );
        });
    },

    render() {
        return (
            <div className="panel panel-default">
                <div className="panel-heading">
                    <div className="pull-right text-right">
                        <p><a href="/addCustomer" className="pull-right">New Customer </a></p>
                        <p><a href="#"> View all</a></p>
                    </div>
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
