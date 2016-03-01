import React, { Component, PropTypes } from 'react';
import CustomerEditForm from './customer-edit-form.jsx';
import Actions from '../redux/action_creators.jsx';
import { customerChange, customerSave } from '../redux/action_creators.jsx';


export const CustomerContainer = React.createClass({


    componentWillMount() {
        console.log("CustomerContainer.componentWillMount()", this.props);

        const customerId = FlowRouter.getParam('_id');

        this.sub = Meteor.subscribe('CustomerCompany.get', customerId, this.setCustomerInState);

        this.props.selectCustomer(FlowRouter.getParam('_id'));
    },

    setCustomerInState() {
        console.log("setCustomerInState");
        this.props.selectCustomer(FlowRouter.getParam('_id'));
    },

    componentWillUnmount() {
        this.sub.stop();
    },

    shouldComponentUpdate() {
        console.log("shouldComponentUpdate", this.props.customer)
        if (this.sub.ready) {
            return true;
        }
        return false;
    },

    //
    //triggerLoad() {
    //    console.log("triggerLoad start");
    //
    //    console.log("triggerLoad end");
    //},

    //onChange() {
    //    store.dispatch(Actions.customerChange(event));
    //},
    //
    //onSave() {
    //    store.dispatch(Actions.customerSave());
    //},

    render() {
        console.log("CustomerContainer.render()", this.props);
        if (!this.sub.ready) {
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
            />);
    }
});

// choose what state we send to comp. above and it's children, in
// this app we're sending everything at once, we're also splitting
// it out into three properties to match previous state shape, you
// could easily just return `state` for this small app


CustomerContainer.propTypes = {
    customer: PropTypes.object,
    onSave: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    selectCustomer: PropTypes.func.isRequired,

};

function mapStateToProps(state) {
    console.log("CustomerContainer.mapStateToProps", state)
    return {
        customer: state.userInterface.customer
    };
}

function mapDispatchToProps(dispatch) {
    //console.log("CustomerContainer.mapDispatchToProps", Actions.customerSave)
    return {
        onSave: Actions.saveCustomer,
        onChange: (customerId, event) => { dispatch(Actions.editCustomer(customerId, event)); },
        selectCustomer: (customerId) => { dispatch(Actions.selectCustomer(customerId)); }
    };
}

export default connect(
    mapStateToProps, mapDispatchToProps
)(CustomerContainer);