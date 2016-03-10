import Orders from './order.js';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';


// Manual form specific update method that knows how to unpack the single
// object we get from autoform.
export const upsert = new ValidatedMethod({

    // register the name
    name: 'orders.upsert',

    validate(args) {
        //console.log("orders.upsert.validate(args) ");

        Schemas.OrderSchema.clean(args.data);

        var schemaContext = Schemas.OrderSchema.namedContext("OrderForm");
        schemaContext.validate(args.data);

        //console.log("validation succeeded");
    },


    // the actual database updating part
    // validate has already been run at this point
    run(args) {
        //console.log("order", JSON.stringify(args.data));

        return Orders.upsert(args.orderId, {$set: args.data});
    }
});

export const remove = new ValidatedMethod({

    name: 'orders.remove',

    validate: new SimpleSchema({
        orderId: { type: String }
    }).validator(),

    run({ orderId }) {
        //console.log("Orders.methods.remove", orderId);

        const order = Orders.findOne(orderId);

        // TODO: Security

        Orders.remove(orderId);
    },
});
