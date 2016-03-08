
import React, { Component, PropTypes } from 'react';

import CustomerCompanies from '../../api/customers/customer-company';

import CustomersList from './CustomersList.jsx';
import PaginatedPanel from '../components/PaginatedPanel.jsx';

//import { toggleExpanded } from '../redux/customer-list-actions.jsx';

//const MINIMISED_RECORD_COUNT = 3;
//const EXPANDED_RECORD_COUNT = 9;

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

    //getRecordsToShow() {
    //    let recordsToShow = MINIMISED_RECORD_COUNT;
    //    if (this.props.expanded) {
    //        recordsToShow = EXPANDED_RECORD_COUNT;
    //    }
    //    return recordsToShow;
    //},

    render() {
        console.log("CustomersListWrapper.render() ");

        return (
            <PaginatedPanel
                //expanded={this.props.expanded}
                //toggleExpanded={this.props.toggleExpanded}
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
    //expanded: PropTypes.bool.isRequired
};

function mapStateToProps(state) {
    console.log("TopCustomersContainer.mapStateToProps", state)
    return {
        //expanded: state.userInterface.customerList.expanded
    };
}

export default connect(mapStateToProps, {
    //toggleExpanded
})(AllCustomersContainer);
