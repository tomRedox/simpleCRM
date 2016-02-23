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


Orders.after.insert(function (userId, doc) {
    console.log("Orders.after.insert", doc);
    customerCompanyDenormalizer.afterInsert(userId, doc);
});

Orders.after.update(function (userId, doc, fieldNames, modifier, options) {
    console.log("Orders.after.update", doc);
    customerCompanyDenormalizer.afterUpdate(userId, doc, fieldNames, modifier, options, this.previous);
});


const customerCompanyDenormalizer = {

    // Ensure that no matter what customerName we receive from the client,
    // the correct name for the selected customerId is always set.
    _updateCompanyNameOnOrder(order) {

        // We only want to do this update on the server - it was already done on the client
        // And wouldn't work on the client as we are accessing the customer table directly
        // and also because the client miniMongo data subset may not contain the customer
        // at that point in time
        if (Meteor.isServer) {
            console.log("customerCompanyDenormalizer._updateCompanyNameOnOrder() ",
                order.customerId + " - " + order.customerName);

            // no action needed if the customerId is not set
            if (!order.customerId || order.customerId === null) {
                return;
            }

            //const handle = Meteor.subscribe('CustomerCompany.get', order.customerId);
            const customer = CustomerCompanies.findOne({_id: order.customerId});

            if (!customer) {
                throw new Meteor.Error("The customer could not be found in the database");
            }

            order.customerName = customer.name;
        }
    },

    _updateCompanyOrderTotals(customerId, previousCustomerId) {
        if (Meteor.isServer) {
            //console.log("_updateCompanyOrderTotals", customerId);

            // no action needed if the customerId is not set
            if (!customerId || customerId === null) {
                return;
            }

            let customerIds = [ customerId ];

            // if the customer Id changed we also need to update the order totals for
            // the old customer
            if (customerId !== previousCustomerId) {
                customerIds.push(previousCustomerId);
            }

            customerIds.forEach(function (thisCustomerId) {
                let pipeline = [
                    {
                        $match: {
                            customerId: thisCustomerId
                        }
                    },
                    {
                        $group: {
                            _id: null,
                            ordersTotalValue: {$sum: "$totalValue"},
                            ordersCount: {$sum: 1}
                        }
                    }
                ];

                //console.log("thisCustomerId: ", thisCustomerId);
                let result = Orders.aggregate(pipeline, {customerId: thisCustomerId})[0];

                //console.log("result: ", result);
                //console.log("result: ", result ? result.ordersTotalValue : "no ordersTotalValue");
                //console.log("result: ", result ? result.ordersCount : "no ordersCount");
                CustomerCompanies.update(thisCustomerId, {
                    $set: {
                        // the result will be null if this customer now has no orders
                        ordersTotalValue: result ? result.ordersTotalValue : 0,
                        ordersCount: result ? result.ordersCount : 0
                        //email: "hi@hi.com" //+ new Date().toTimeString()
                    }
                });
            });

            //console.log("_updateCompanyOrderTotals Completed");
        }
    },

    _performCommonBeforeModifyActions(orderDoc) {
        recalculateOrderTotals(orderDoc);
        this._updateCompanyNameOnOrder(orderDoc);
    },
    
    _performCommonAfterModifyActions(orderDoc, previousDoc) {
        // Previous doc will be null for new records.
        this._updateCompanyOrderTotals(orderDoc.customerId, previousDoc ? previousDoc.customerId : null);
    },
    
    beforeInsert(userId, doc) {
        this._performCommonBeforeModifyActions(doc);
    },

    beforeUpdate(userId, doc, fieldNames, modifier, options) {
        this._performCommonBeforeModifyActions(doc);
    },

    beforeUpsert(userId, selector, modifier, options) {
        this._performCommonBeforeModifyActions(modifier.$set);
    },

    afterInsert(userId, doc) {
        this._performCommonAfterModifyActions(doc);
    },

    afterUpdate(userId, doc, fieldNames, modifier, options, previousDoc) {
        console.log("previousDoc: ", previousDoc);
        this._performCommonAfterModifyActions(doc, previousDoc);
    }   

};

export default Orders;
