
import Orders from './order.js';


Orders.methods = {};


// Manual form specific update method that knows how to unpack the single
// object we get from autoform.
Orders.methods.upsert = new ValidatedMethod({

    // register the name
    name: 'Orders.methods.upsert',

    validate(args) {
        console.log("Orders.methods.upsert.validate(args) ");

        Schemas.OrderSchema.clean(args.data);

        var schemaContext = Schemas.OrderSchema.namedContext("OrderForm");
        schemaContext.validate(args.data);

        console.log("validation succeeded");
    },


    // the actual database updating part
    // validate has already been run at this point
    run(args) {
        //console.log("run");
        //console.log("args", args);
        //console.log("lines", args.data.orderLines);
        //console.log("lines[0]", args.data.orderLines[0]);
        //console.log("order", JSON.stringify(args.data));

        return Orders.upsert(args.orderId, {$set: args.data});
    }
});


Meteor.methods({
    'Orders.methods.remove'({ orderId }) {
        console.log("Orders.methods.remove", orderId);
        Orders.remove( { _id: orderId } );
    }
});
