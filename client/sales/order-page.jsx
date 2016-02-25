import React from 'react';
import OrderHeaderEdit from './order-header-edit.jsx';
import OrderLinesList from './order-lines-list.jsx';
import OrderLineEdit from './order-line-edit.jsx';
import { recalculateOrderTotals } from '../../lib/order-logic';
import { validateItemAgainstSchema } from '../../lib/validation-helpers';


const OrderPage = React.createClass({
    propTypes: {
        order: React.PropTypes.object,
        onSave: React.PropTypes.func.isRequired
    },

    getInitialState() {

        // console.log("OrderPage.getInitialState(): props", this.props);

        return {
            order: this.props.order,
            errors: {},
            lineErrorSets: [],
            isValid: false
        };
    },

    getEmptyOrderLine() {
        return {
            _id: Meteor.uuid(),
            productId: null,
            description: null,
            quantity: 0,
            unitPrice: 0,
            lineValue: 0,
            createdAt: new Date()//,
        };
    },

    componentWillMount() {

    },

    validateOrderHeaderAndUpdateState() {
        // validate the order against the table schema
        this.state.errors = validateItemAgainstSchema(this.state.order, Schemas.OrderSchema);

        this.setFormIsValid();
        //
        //// Update the state, this will then cause the re-render
        this.setState({order: this.state.order});
    },

    onOrderHeaderChanged(event) {
        //console.log("OrderPage.onOrderHeaderChanged:", event.target);

        // update our order state to reflect the new value in the UI
         this.state.order[event.target.name] = event.target.value;
        //console.log("New value ",this.state.order[event.target.name])

        this.validateOrderHeaderAndUpdateState();
    },

    onOrderHeaderCustomerChanged(newValue) {
        //console.log("OrderPage.onOrderHeaderCustomerChanged() customer:", selectedItem.value + " - " + selectedItem.label);

        // update our order state to reflect the new value in the UI
        this.state.order.customerId = newValue.selectedOption._id;
        this.state.order.customerName = newValue.selectedOption.name;

        this.validateOrderHeaderAndUpdateState();
    },

    setFormIsValid() {
        //console.log("Order: setFormIsValid", Object.keys(this.state.errors).length)
        const lineErrors = this.state.lineErrorSets.find(x => Object.keys(x.errors).length > 0);

        this.state.isValid =
            (Object.keys(this.state.errors).length === 0 && !lineErrors);
    },

    onOrderLineChanged(orderLineId, field, value) {
        //console.log("onOrderLineChanged", {orderLineId: orderLineId, field: field, value: value});
        const line = this.state.order.orderLines.find(x => x._id === orderLineId);
        //console.log("matching line ", line);

        line[field] = value;

        this.validateAndUpdateOrderLine(line);
    },

    onOrderLineProductChanged(orderLineId, newValue) {
        //console.log("OrderPage.onOrderLineProductChanged() customer:", selectedItem.value + " - " + selectedItem.label);
        const line = this.state.order.orderLines.find(x => x._id === orderLineId);

        // update our order state to reflect the new value in the UI
        line.productId = newValue.selectedOption._id;
        line.description = newValue.selectedOption.name;
        line.unitPrice = newValue.selectedOption.price;

        this.validateAndUpdateOrderLine(line);
    },

    validateAndUpdateOrderLine(line) {

        // update the calculated totals
        recalculateOrderTotals(this.state.order);

        this.validateOrderLine(line);

        return this.setState({order: this.state.order});
    },

    validateOrderLine(orderLine) {

        const errors = validateItemAgainstSchema(
            orderLine, Schemas.OrderLineSchema
        );

        let errorSet = this.getErrorSetForOrderLine(orderLine);

        if (errorSet) {
            errorSet.errors = errors;
        } else {
            errorSet = {};
            errorSet._id = orderLine._id;
            errorSet.errors = errors;
            this.state.lineErrorSets.push(errorSet);
        }
    },

    getErrorSetForOrderLine(orderLine) {
        return this.state.lineErrorSets.find(x => x._id === orderLine._id);
    },

    addNewOrderLine(event) {
        //console.log("addNewOrderLine", event);
        event.preventDefault();

        this.state.order.orderLines.push(this.getEmptyOrderLine());

        // update the UI
        return this.setState({order: this.state.order});
    },

    deleteOrderLine(id) {
        console.log("OrderPage.deleteOrderLine", id);

        const line = this.state.order.orderLines.find(x => x._id === id);
        const pos = this.state.order.orderLines.indexOf(line);
        console.log("pos index ", pos);

        this.state.order.orderLines.splice(pos, 1);

        // update the calculated totals
        recalculateOrderTotals(this.state.order);

        // update the UI
        return this.setState({order: this.state.order});
    },

    saveOrder(event) {
        console.log("OrderPage.saveOrder", event);
        event.preventDefault();
        this.props.onSave(this.state.order);
    },

    render() {
        // console.log("OrderPage.render() props: ", this.props);
        this.setFormIsValid();

        return (
            <div className="panel panel-default">
                <form className="order_page" onSubmit={this.props.onSave}>
                    <div className="panel-body">

                        <h3>Sales Order</h3>

                        <OrderHeaderEdit
                            order = {this.state.order}
                            onChange = {this.onOrderHeaderChanged}
                            onCustomerChange = {this.onOrderHeaderCustomerChanged}
                            onSave = {this.saveOrder}
                            errors = {this.state.errors}
                            isValid={this.state.isValid}
                        />

                        <OrderLinesList
                            order = {this.state.order}
                            onChildChange = {this.onOrderLineChanged}
                            onProductChange = {this.onOrderLineProductChanged}
                            deleteOrderLine = {this.deleteOrderLine}
                            lineErrorSets = {this.state.lineErrorSets}
                        />

                        <input
                            type="button"
                            className="btn btn-success"
                            id="newOrderLineButton"
                            onClick={this.addNewOrderLine}
                            value="New line"
                        />
                    </div>
                </form>
            </div>
        );
    }
});

export default OrderPage;
