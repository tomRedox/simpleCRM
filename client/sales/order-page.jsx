import React from 'react';
import OrderHeaderEdit from './order-header-edit.jsx';
import OrderLinesList from './order-lines-list.jsx';
import OrderLineEdit from './order-line-edit.jsx';
//import _ from 'underscore';

const OrderPage = React.createClass({
    propTypes: {
        order: React.PropTypes.object,
        onSave: React.PropTypes.func.isRequired
    },


    getInitialState() {

        console.log("OrderPage.getInitialState", this.props);

        return {
            errors: {},
            isValid: false,
            newLine: {},
            nextOrderLineId: 1000
        };
    },

    getEmptyOrderLine() {
        return {
            description: "",
            quantity: 0,
            unitPrice: 0,
            lineValue: 0,
            isNewLine: true,
            _id: this.state.nextOrderLineId ++
        }
    },

    componentWillMount() {
        this.state.newLine = this.getEmptyOrderLine();
    },

    onOrderHeaderChanged: function (event) {

        console.log("event:", event.target);

        // update our order state to reflect the new value in the UI
        var field = event.target.name;
        var value = event.target.value;
        this.props.order[field] = value;
        console.log("New value ",this.props.order[field])


        // validate the order against the table schema
        this.state.errors = {};
        var schemaContext = Schemas.OrderSchema.namedContext("orderHeaderEdit");
        schemaContext.validate(this.props.order);

        schemaContext.invalidKeys().forEach(invalidKey => {
            var errMessage = schemaContext.keyErrorMessage(invalidKey.name);
            if (invalidKey.name != "_id") {
                this.state.errors[invalidKey.name] = errMessage;
                console.log("errMessage", errMessage);
            }
        });

        this.setFormIsValid();

        // Update the state, this will then cause the re-render
        return this.setState({order: this.props.order});

    },

    setFormIsValid: function() {
        this.state.isValid = (Object.keys(this.state.errors).length === 0);
    },

    onOrderLineChanged: function (orderLineId, field, value) {
        console.log("onOrderLineChanged", {orderLineId: orderLineId, field: field, value: value});


        const line = _.find(this.props.order.orderLines, function (line) {
            return line._id == orderLineId
        });

        console.log("matching line ", line)
        line[field] = value;
        return this.setState({order: this.props.order});
    },

    newOrderLineChanged: function (orderLineId, field, value) {
        console.log("newOrderLineChanged", {orderLineId: orderLineId, field: field, value: value});

        this.state.newLine[field] = value;
        return this.setState({newLine: this.state.newLine});

    },

    saveNewOrderLine (event) {
        console.log("saveNewOrderLine", event);
        event.preventDefault();

        this.props.order.orderLines.push(this.state.newLine);
        console.log("saveNewOrderLine",  this.props.order)
        this.state.newLine = this.getEmptyOrderLine();
        console.log("saveNewOrderLine",  this.props.order)

        // update the UI
        return this.setState({order: this.props.order});
    },

    saveOrder: function (event) {
        console.log("saveOrder", event);
        event.preventDefault();
        this.props.onSave(this.props.order);
    },

    render () {
        console.log("OrderPage props: ", this.props);
        this.setFormIsValid();

        return (
            <div className="panel panel-default col-md-6">
                <form className="order_page" onSubmit={this.props.onSave}>
                    <div className="panel-body">

                        <h3>Sales Order</h3>

                        <OrderHeaderEdit
                            order = {this.props.order}
                            onChange = {this.onOrderHeaderChanged}
                            onSave = {this.saveOrder}
                            errors = {this.state.errors}
                        />

                        <OrderLinesList
                            order = {this.props.order}
                            onChildChange = {this.onOrderLineChanged}
                            errors = {this.state.errors}
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