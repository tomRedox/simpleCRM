import React from 'react';
import OrderHeaderEdit from './order-header-edit.jsx';
import OrderLinesList from './order-lines-list.jsx';
import OrderLineEdit from './order-line-edit.jsx';
import { recalculateOrderTotals } from '../../lib/order-logic';


const OrderPage = React.createClass({
    propTypes: {
        order: React.PropTypes.object,
        onSave: React.PropTypes.func.isRequired
    },

    getInitialState() {

        console.log("OrderPage.getInitialState(): props", this.props);

        return {
            order: this.props.order,
            errors: {},
            lineErrorSets: [],
            isValid: false,
            newLine: {}
        };
    },

    getEmptyOrderLine() {
        return {
            _id: Meteor.uuid(),
            description: "",
            quantity: 0,
            unitPrice: 0,
            lineValue: 0,
            isNewLine: true,
            createdAt: new Date()//,
        };
    },

    componentWillMount() {
        this.state.newLine = this.getEmptyOrderLine();
    },

    validateItemAgainstSchema(item, schemaContext) {
        const errors = {};
        console.log("OrderPage.validateItemAgainstSchema(): item ", item);
        schemaContext.validate(item);

        schemaContext.invalidKeys().forEach(invalidKey => {
            var errMessage = schemaContext.keyErrorMessage(invalidKey.name);
            if (invalidKey.name !== "_id") {
                errors[invalidKey.name] = errMessage;
                console.log("errMessage", errMessage);
            }
        });

        return errors;
    },

    validateOrderHeaderAndUpdateState() {
        // validate the order against the table schema
        this.state.errors = this.validateItemAgainstSchema(
            this.state.order, Schemas.OrderSchema.namedContext("orderHeaderEdit"));

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

    onOrderHeaderCustomerChanged(selectedItem) {
        //console.log("OrderPage.onOrderHeaderCustomerChanged() customer:", selectedItem.value + " - " + selectedItem.label);

        // update our order state to reflect the new value in the UI
        this.state.order.customerId = selectedItem.value;
        this.state.order.customerName = selectedItem.label;

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

        // update the calculated totals
        recalculateOrderTotals(this.state.order);

        this.validateOrderLine(line);

        return this.setState({order: this.state.order});
    },

    validateOrderLine(orderLine) {

        const errors = this.validateItemAgainstSchema(
            orderLine, Schemas.OrderLineSchema.namedContext("orderLineEdit")
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

    newOrderLineChanged(orderLineId, field, value) {
        //console.log("newOrderLineChanged", {orderLineId: orderLineId, field: field, value: value});

        this.state.newLine[field] = value;
        return this.setState({newLine: this.state.newLine});
    },

    saveNewOrderLine(event) {
        //console.log("saveNewOrderLine", event);
        event.preventDefault();

        this.state.order.orderLines.push(this.state.newLine);
        //console.log("saveNewOrderLine",  this.state.order)
        this.state.newLine = this.getEmptyOrderLine();
        //console.log("saveNewOrderLine",  this.state.order)

        // update the UI
        return this.setState({order: this.state.order});
    },

    deleteOrderLine(id) {
        console.log("OrderPage.deleteOrderLine", id);

        const line = this.state.order.orderLines.find(x => x._id === id);
        var pos = this.state.order.orderLines.indexOf(line);
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
        console.log("OrderPage.render() props: ", this.props);
        this.setFormIsValid();

        return (
            <div className="panel panel-default col-md-6">
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
                            deleteOrderLine = {this.deleteOrderLine}
                            lineErrorSets = {this.state.lineErrorSets}
                        />

                        <h4>Add new line</h4>

                        <OrderLineEdit
                            orderLine = {this.state.newLine}
                            onChange = {this.newOrderLineChanged}
                            errors = {this.state.errors}
                        />

                        <input
                            type="button"
                            className="btn btn-success"
                            id="saveNewOrderLineButton"
                            onClick={this.saveNewOrderLine}
                            value="Add line"
                        />

                    </div>
                </form>
            </div>
        );
    }
});

export default OrderPage;
