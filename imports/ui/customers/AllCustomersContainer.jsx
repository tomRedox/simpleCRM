
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import CustomerCompanies from '../../api/customers/customer-company';

import CustomersList from './CustomersList.jsx';
import PaginatedPanel from '../components/PaginatedPanel.jsx';


const AllCustomersContainer = React.createClass({

    mixins: [ReactMeteorData],

    getMeteorData() {
        //console.log("getMeteorData()");

        var data = {};

        var handle = Meteor.subscribe('CustomerCompanies.public');

        if (handle.ready()) {
            //console.log("customers", customers);
            data.customers = CustomerCompanies.find(
                {},
                {
                    sort: {name: 1},
                    //limit: this.getRecordsToShow()
                }
            ).fetch();
        }

        data.dataReady = handle;
        return data;
    },

    render() {
        //console.log("CustomersListWrapper.render() ");

        return (
            <PaginatedPanel
                parentGotData={this.data.dataReady}
                panelTitle = "All customers"
                itemType = "customer"
                newItemLink ="/addCustomer"
                allItemsLink ="/"
            >
                <CustomersList
                    customers={this.data.customers ? this.data.customers : []}
                />
            </PaginatedPanel>
        );
    }
});

AllCustomersContainer.propTypes = {
    // add prop types here
};

function mapStateToProps(state) {
    //console.log("TopCustomersContainer.mapStateToProps", state)
    return {
        // add bindings here
    };
}

export default connect(mapStateToProps, {
    // add function bindings here
})(AllCustomersContainer);
