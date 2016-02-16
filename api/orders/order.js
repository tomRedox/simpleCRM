import { recalculateOrderTotals } from '../../lib/order-logic';

class ordersCollection extends Mongo.Collection {}

// Make it available to the rest of the app
const Orders = new ordersCollection("Orders");

// Deny all client-side updates since we will be using methods to manage this collection
Orders.deny({
    insert() { return true; },
    update() { return true; },
    remove() { return true; }
});

// Define the expected Schema for data going into,
// and coming out of the database
//Orders.schema = Schemas.OrdersSchema

// Bolt that schema onto the collection so that all mutator
// calls are automatically checked against the schema.
// Collection2 is what's allowing this to happen
Orders.attachSchema(Schemas.OrderSchema);

Orders.before.insert(function (userId, doc) {
    console.log("Orders.before.insert", doc);
    // Ensure all the line totals acrea correctly set, even if the UI already did this.
    recalculateOrderTotals(doc);
});

Orders.before.update(function (userId, doc, fieldNames, modifier, options) {
    console.log("Orders.before.update", doc);
    // Ensure all the line totals acrea correctly set, even if the UI already did this.
    recalculateOrderTotals(doc);
});

Orders.before.upsert(function (userId, selector, modifier, options) {
    // Ensure all the line totals acrea correctly set, even if the UI already did this.
    recalculateOrderTotals(modifier.$set);
});

export default Orders;
