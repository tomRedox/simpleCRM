// action creators are functions that take a param and return
// an 'action' that is consumed by a reducer. This may seem like
// unneeded boilerplate  but it's **really** nice to have a file
// with *all* possible ways to mutate the state of the app.

import { validateItemAndAddValidationResults, validateItemAgainstSchema } from '../../lib/validation-helpers';
import { recalculateOrderTotals } from '../../lib/order-logic';

import Orders from '../../api/orders/order';

OrderActions = {};

// used when a mongo orders collection changes
OrderActions.ordersCollectionChanged = function ordersCollectionChanged(newDocs) {
    console.log("OrderActions.ordersCollectionChanged ", newDocs);
    return {
        type: 'ORDERS_COLLECTION_CHANGED',
        collection: newDocs
    };
};


// doesn't return payload because our collection watcher
// will send a CHANGED action and update the store
OrderActions.saveOrder = function saveOrder(order) {
    console.log("saveOrder: ", order);

    // call the method for upserting the data
    Orders.methods.upsert.call({
        orderId: order._id,
        data: order
    }, (err, res) => {
        //console.log ("Orders.methods.updateManualForm.call was called");
        if (err) {
            // TODO call FAILED action on error
            sAlert.error(err.message);
        } else {
            sAlert.success("Save successful");
            FlowRouter.go("/");
            return {type: 'SAVE_ORDER'};
        }
    });
};


OrderActions.editOrder = function editOrder(order, newValues) {
    console.log("OrderActions.editOrder() event.target:" + newValues);

    // don't mutate it
    const updatedOrder = _.clone(order);

    // loop each change and apply to our clone
    for(let newValue of newValues) {
        updatedOrder[newValue.name] = newValue.value;
    }

    // validate and set error messages
    validateItemAndAddValidationResults(updatedOrder, Schemas.OrderSchema);

    return {
        type: 'EDIT_ORDER',
        updatedOrder
    };
};

OrderActions.editOrderLine = function editOrder(orderLine, field, value) {
    console.log("OrderActions.editOrder() event.value:" + value);

    // don't mutate it
    const updatedOrderLine = _.clone(orderLine);

    updatedOrderLine[field] = value;

    // validate and set error messages
    validateOrderLine(updatedOrderLine);

    return {
        type: 'EDIT_ORDER',
        updatedOrderLine
    };
};

function validateOrderLine(orderLine) {

    // update the calculated totals
    recalculateOrderTotals(this.state.order);

    const errors = validateItemAgainstSchema(
        orderLine, Schemas.OrderLineSchema
    );

    let errorSet = this.state.lineErrorSets.find(x => x._id === orderLine._id);

    if (errorSet) {
        errorSet.errors = errors;
    } else {
        errorSet = {};
        errorSet._id = orderLine._id;
        errorSet.errors = errors;
        this.state.lineErrorSets.push(errorSet);
    }

    return this.setState({order: this.state.order});
};


OrderActions.selectOrder = function selectOrder(orderId) {
    console.log("OrderActions.selectOrder: " + orderId.toString());

    const order = Orders.findOne({_id: orderId})

    // perform initial validation and set error messages
    validateItemAndAddValidationResults(order, Schemas.OrderSchema);

    return {
        type: 'SELECT_ORDER',
        order
    };
};

OrderActions.selectNewOrder = function selectNewOrder() {
    console.log("OrderActions.selectNewOrder ")

    const newOrder = {
        orderLines: [],
        createdAt: new Date()
    };

    return {
        type: 'SELECT_ORDER',
        newOrder
    };
};

export default OrderActions;
