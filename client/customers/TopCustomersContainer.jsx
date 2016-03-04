/*
 This class was added to allow the react animations to work correctly on the list.
 The issue was that render is called twice on the list, once with no data and then
 again when the data is present.  That was stopping the animations working, so
 broke the data retrieval out into a separate wrapper so that then on the child
 we can use shouldComponentUpdate to set whether the render should occur.
 */

import React, { Component, PropTypes } from 'react';

//import CustomerCompanies from '../../api/customers/customer-company';
import CustomersList from './CustomersList.jsx';
import CollapsiblePanel from '../controls/CollapsiblePanel.jsx';

import { toggleExpanded } from '../redux/customer-list-actions.jsx';

const MINIMISED_RECORD_COUNT = 3;
const EXPANDED_RECORD_COUNT = 9;

const TopCustomersContainer = React.createClass({

    mixins: [ReactMeteorData],

    getMeteorData() {
        //console.log("getMeteorData()");

        var data = {};

        var handle = Meteor.subscribe('CustomerCompanies.topCustomerCompanies', this.getRecordsToShow());

        if (handle.ready()) {
            //const customers = CustomerCompanies.find().fetch();
            //console.log("customers", customers);
            data.customers = CustomerCompanies.find(
                {},
                {
                    sort: {ordersTotalValue: -1},
                    limit: this.getRecordsToShow()
                }
            ).fetch();
        }

        data.dataReady = handle;
        return data;
    },

    getRecordsToShow() {
        let recordsToShow = MINIMISED_RECORD_COUNT;
        if (this.props.expanded) {
            recordsToShow = EXPANDED_RECORD_COUNT;
        }
        return recordsToShow;
    },

    render() {
        console.log("CustomersListWrapper.render() ");

        return (
            <CollapsiblePanel
                expanded={this.props.expanded}
                toggleExpanded={this.props.toggleExpanded}
                parentGotData={this.data.dataReady}
                panelTitle = "Top customers"
                itemType = "customer"
                newItemLink ="/addCustomer"
                allItemsLink ="/allCustomers"
            >
                <CustomersList
                    customers={this.data.customers ? this.data.customers : []}
                />
            </CollapsiblePanel>
        );
    }
});

TopCustomersContainer.propTypes = {
    expanded: PropTypes.bool.isRequired
};

function mapStateToProps(state) {
    console.log("TopCustomersContainer.mapStateToProps", state)
    return {
        expanded: state.userInterface.customerList.expanded
    };
}

export default connect(mapStateToProps, {
    toggleExpanded
})(TopCustomersContainer);
