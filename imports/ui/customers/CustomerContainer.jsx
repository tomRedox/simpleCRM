import React, { Component, PropTypes } from 'react';
import CustomerEditForm from './CustomerEditForm.jsx';
import { editCustomer, selectCustomer, selectNewCustomer, saveCustomer } from '../redux/customer_actions.jsx';
import CustomerCompanies from '../../api/customers/customer-company';
import SalesRegions from '../../api/sales-regions/sales-region';

export const CustomerContainer = React.createClass({

    componentWillMount() {
        console.log("CustomerContainer.componentWillMount()", this.props);

        const customerId = FlowRouter.getParam('_id');

        if (customerId) {
            this.sub = Meteor.subscribe('CustomerCompany.get', customerId, this.setCustomerInState);
        } else {
            this.props.selectNewCustomer();
        }

    },

    setCustomerInState() {
        console.log("setCustomerInState");
        this.props.selectCustomer(FlowRouter.getParam('_id'));
    },

    componentWillUnmount() {
        if (this.sub) {
            this.sub.stop();
        }
    },

    shouldComponentUpdate() {
        console.log("shouldComponentUpdate", this.sub);
        return (!this.sub || this.sub.ready);
    },

    render() {
        console.log("CustomerContainer.render()", this.props);
        if (this.sub && !this.sub.ready) {
            return (<h1>Loading</h1>);
        }

        //debugger // checkout this.props with debugger!
        return (
            <CustomerEditForm
                customer = {this.props.customer}
                onChange = {this.props.onChange}
                onSave = {this.props.onSave}
                errors = {this.props.customer.errors}
                isValid = {this.props.customer.isValid}
                salesRegionOptions={SalesRegions.find().fetch()}
            />);
    }
});

CustomerContainer.propTypes = {
    customer: PropTypes.object,
    onSave: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    selectCustomer: PropTypes.func.isRequired,
    selectNewCustomer: PropTypes.func.isRequired,

};

function mapStateToProps(state) {
    console.log("CustomerContainer.mapStateToProps", state)
    return {
        customer: state.userInterface.customerBeingEdited
    };
}

export default connect(mapStateToProps, {
    onSave: saveCustomer,
    onChange: editCustomer,
    selectCustomer,
    selectNewCustomer
})(CustomerContainer);