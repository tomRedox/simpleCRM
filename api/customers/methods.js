
//import { CustomerCompanies } from './customer-company'


// The update method
update = new ValidatedMethod({

    // register the name
    name: 'CustomerCompanies.methods.update',

    // register a method for validation, what's going on here?
    validate(myArgs) {
        console.log("myArgs  ", myArgs );
        Schemas.CustomerCompaniesSchema.validate(myArgs.modifier , {modifier: true});
        console.log("CustomerCompanies.methods.update - validation succeeded");
    },

    // the actual database updating part
    // validate has already been run at this point
    run(myArgs)
    {
        console.log("CustomerCompanies.methods.update - run");
        console.log("myArgs ", myArgs);

        return CustomerCompanies.update(myArgs._id, myArgs.modifier);

        console.log("CustomerCompanies.methods.update - update succeeded");
    }
});


Meteor.methods({
    'CustomerCompanies.methods.update2'( customerModifier, customerId ) {

        console.log("CustomerCompanies.methods.update2");
        console.log("customerModifier ", customerModifier);
        console.log("customerId ", customerId);

        // autoForm sends us the mongo update query (i.e. a modifier), rather than
        // just the data to be updated, so to get at the actual customer data
        // we need to look in the $set property.
        const thisCust = customerModifier.$set;
        console.log("customer.name ", thisCust.name);

        // Simple-schema needs us to tell it that we are sending a mongo modifier rather
        // than just the object: https://github.com/aldeed/meteor-simple-schema#validation-options
        Schemas.CustomerCompaniesSchema.validate(customerModifier, {modifier: true});

        console.log("CustomerCompanies.methods.update2 - validation succeeded");

        CustomerCompanies.update(customerId, customerModifier);

        console.log("CustomerCompanies.methods.update2 - update succeeded");

    }
});