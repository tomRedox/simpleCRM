import React, { Component, PropTypes } from 'react';
import OrderHeaderEdit from './order-header-edit.jsx';
import OrderActions from '../redux/order-actions.jsx';
import { orderChange, orderSave } from '../redux/action_creators.jsx';


export const OrderContainer = React.createClass({

    componentWillMount() {
        console.log("OrderContainer.componentWillMount()", this.props);

        const orderId = FlowRouter.getParam('_id');

        if (orderId) {
            this.sub = Meteor.subscribe('Order.get', orderId, this.setOrderInState);
        } else {
            this.props.selectNewOrder();
        }

    },

    setOrderInState() {
        console.log("setOrderInState");
        this.props.selectOrder(FlowRouter.getParam('_id'));
    },

    componentWillUnmount() {
        if (this.sub) {
            this.sub.stop();
        }
    },

    shouldComponentUpdate() {
        //console.log("shouldComponentUpdate", this.sub.ready)
        return (!this.sub || this.sub.ready);
    },

    render() {
        console.log("OrderContainer.render()", this.props);
        if (this.sub && !this.sub.ready) {
            return (<h1>Loading</h1>);
        }

        //debugger // checkout this.props with debugger!
        return (
            <OrderHeaderEdit
                order = {this.props.order}
                onChange = {this.props.onChange}
                onSave = {this.props.onSave}
                errors = {this.props.order.errors}
                isValid = {this.props.order.isValid}
                salesRegionOptions={SalesRegions.find().fetch()}
            />);
    }
});

OrderContainer.propTypes = {
    order: PropTypes.object,
    onSave: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    selectOrder: PropTypes.func.isRequired,
    selectNewOrder: PropTypes.func.isRequired,

};

function mapStateToProps(state) {
    console.log("OrderContainer.mapStateToProps", state)
    return {
        order: state.orderBeingEdited.order
    };
}

function mapDispatchToProps(dispatch) {
    //console.log("OrderContainer.mapDispatchToProps", OrderActions.orderSave)
    return {
        onSave: OrderActions.saveOrder,
        onChange: (order, event) => { dispatch(OrderActions.editOrder(order, event)); },
        selectOrder: (orderId) => { dispatch(OrderActions.selectOrder(orderId)); },
        selectNewOrder: () => { dispatch(OrderActions.selectNewOrder()); }
    };
}

export default connect(
    mapStateToProps, mapDispatchToProps
)(OrderContainer);