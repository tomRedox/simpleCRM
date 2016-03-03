import React, { Component, PropTypes } from 'react';

import OrderHeaderEdit from './OrderHeaderEdit.jsx';
import OrderLinesList from './OrderLinesList.jsx';

import { saveOrder, editOrder, selectOrder,
    selectNewOrder, editOrderLine, editOrderLineProduct,
    addNewOrderLine, deleteOrderLine,  } from '../redux/order-actions.jsx';


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
        console.log("shouldComponentUpdate", this.sub)
        return (!this.sub || this.sub.ready);
    },

    render() {
        console.log("OrderContainer.render()", this.props);
        if (this.sub && !this.sub.ready) {
            return (<h1>Loading</h1>);
        }

        //debugger // checkout this.props with debugger!
        return (
            <div className="panel panel-default">
                <form className="order_page" onSubmit={this.props.onSave}>
                    <div className="panel-body">

                        <h3>Sales Order</h3>

                        <OrderHeaderEdit
                            order={this.props.order}
                            onChange={this.props.onChange}
                            onSave={this.props.onSave}
                            errors={this.props.order.errors}
                            isValid={this.props.order.isValid}
                            salesRegionOptions={SalesRegions.find().fetch()}
                        />


                        <OrderLinesList
                            order={this.props.order}
                            onChildChange={this.props.editOrderLine}
                            onProductChange={this.props.editOrderLineProduct}
                            deleteOrderLine={this.props.deleteOrderLine}
                        />

                        <input
                            type="button"
                            className="btn btn-success"
                            id="newOrderLineButton"
                            onClick={this.props.addNewOrderLine}
                            value="New line"
                        />
                    </div>
                </form>
            </div>
        );
    }
});

OrderContainer.propTypes = {
    order: PropTypes.object,
    onSave: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    selectOrder: PropTypes.func.isRequired,
    selectNewOrder: PropTypes.func.isRequired,
    editOrderLine: PropTypes.func.isRequired,
    editOrderLineProduct: PropTypes.func.isRequired,
    addNewOrderLine: PropTypes.func.isRequired,
    deleteOrderLine: PropTypes.func.isRequired
};

function mapStateToProps(state) {
    console.log("OrderContainer.mapStateToProps", state);
    return {
        order: state.orderBeingEdited.order
    };
}

function mapDispatchToProps(dispatch) {
    //console.log("OrderContainer.mapDispatchToProps", OrderActions.orderSave)
    return;
}

export default connect(mapStateToProps, {
    onSave: saveOrder,
    onChange: editOrder,
    selectOrder,
    selectNewOrder,
    editOrderLine,
    editOrderLineProduct,
    addNewOrderLine,
    deleteOrderLine

})(OrderContainer);