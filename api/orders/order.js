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
    customerCompanyDenormalizer.beforeInsert(userId, doc);
});

Orders.before.update(function (userId, doc, fieldNames, modifier, options) {
    console.log("Orders.before.update", doc);
    customerCompanyDenormalizer.beforeUpdate(userId, doc, fieldNames, modifier, options);
});

Orders.before.upsert(function (userId, selector, modifier, options) {
    console.log("Orders.before.upsert", modifier.$set);
    customerCompanyDenormalizer.beforeUpsert(userId, selector, modifier, options);
});


const customerCompanyDenormalizer = {
    _updateCompanyNameOnOrder(order) {
        //console.log("customerCompanyDenormalizer._updateCompanyNameOnOrder() ",
        //    order.customerId + " - " + order.customerName);

        // no action needed if the customerId is not set
        if (!order.customerId || order.customerId === null) { return; }

        //const handle = Meteor.subscribe('CustomerCompany.get', order.customerId);
        //const customer = CustomerCompanies.findOne({_id: order.customerId});
        //
        //if (!customer) {
        //    throw new Meteor.Error("The customer could not be found in the database");
        //}
        //
        //order.customerName = customer.name;
    },

    beforeInsert(userId, doc) {
        recalculateOrderTotals(doc);
        this._updateCompanyNameOnOrder(doc);
    },

    beforeUpdate(userId, doc, fieldNames, modifier, options) {
        recalculateOrderTotals(doc);
        this._updateCompanyNameOnOrder(doc);
    },

    beforeUpsert(userId, selector, modifier, options) {

        // Ensure all the line totals acrea correctly set, even if the UI already did this.
        recalculateOrderTotals(modifier.$set);

        // Ensure the company name is set correctly
        this._updateCompanyNameOnOrder(modifier.$set);
    }
};

export default Orders;
