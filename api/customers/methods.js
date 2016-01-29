
//import { CustomerCompanies } from './customer-company'


// Autoform specific update method that knows how to unpack the single
// object we get from autoform.
update = new ValidatedMethod({

    // register the name
    name: 'CustomerCompanies.methods.updateAutoForm',

    // register a method for validation.
    validate(autoformArgs) {
        console.log(autoformArgs);
        // Need to tell the schema that we  are passing in a mongo modifier rather than just the data.
        Schemas.CustomerCompaniesSchema.validate(autoformArgs.modifier , {modifier: true});
    },

    // the actual database updating part
    // validate has already been run at this point
    run(autoformArgs)
    {
        return CustomerCompanies.update(autoformArgs._id, autoformArgs.modifier);
    }
});

// update method that doesn't use the recommended ValidatedMethod approach.
// The params are in a specific order to match those sent by autoform.
// To use this need to remove "singleMethodArgument=true" from form definition.
Meteor.methods({
    'CustomerCompanies.methods.updateAutoFormLongHand'( customerModifier, customerId ) {

        // Simple-schema needs us to tell it that we are sending a mongo modifier rather
        // than just the object: https://github.com/aldeed/meteor-simple-schema#validation-options
        Schemas.CustomerCompaniesSchema.validate(customerModifier, {modifier: true});

        CustomerCompanies.update(customerId, customerModifier);
    }
});