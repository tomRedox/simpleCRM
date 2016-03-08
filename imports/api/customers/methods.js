import CustomerCompanies from './customer-company';

CustomerCompanies.methods = {};

// Manual form specific update method that knows how to unpack the single
// object we get from autoform.
export const upsert = new ValidatedMethod({

    // register the name
    name: 'CustomerCompanies.upsert',

    validate(args) {
        console.log("CustomerCompanies.upsert.validate(args) ", args);

        Schemas.CustomerCompaniesSchema.clean(args.data);

        var schemaContext = Schemas.CustomerCompaniesSchema.namedContext("customerEditReactForm");
        schemaContext.validate(args.data);

        console.log("validation succeeded");
    },


    // the actual database updating part
    // validate has already been run at this point
    run(args) {
        console.log("run");
        console.log("args", args);
        return CustomerCompanies.upsert(args.customerId, {$set: args.data});
    }
});

export const remove = new ValidatedMethod({

    name: 'CustomerCompanies.remove',

    validate: new SimpleSchema({
        customerId: { type: String }
    }).validator(),

    run({ customerId }) {
        console.log("CustomerCompanies.methods.remove", customerId);
        const order = CustomerCompanies.findOne(customerId);

        //if (!order.editableBy(this.userId)) {
        //    throw new Meteor.Error('orders.remove.accessDenied',
        //        'Cannot remove orders in a private list that is not yours');
        //}

        CustomerCompanies.remove(customerId);
    },
});
