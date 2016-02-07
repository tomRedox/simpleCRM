
//import { CustomerCompanies } from './customer-company'


CustomerCompanies.methods = {};


// Manual form specific update method that knows how to unpack the single
// object we get from autoform.
CustomerCompanies.methods.updateManualForm = new ValidatedMethod({

    // register the name
    name: 'CustomerCompanies.methods.updateManualForm',

    validate(args) {
        console.log("validating2");

        var schemaContext = Schemas.CustomerCompaniesSchema.namedContext("customerEditReactForm");
        schemaContext.validate(args.data);

        console.log("validation succeeded");
    },


    // the actual database updating part
    // validate has already been run at this point
    run(args)
    {
        console.log("run");
        console.log("args", args);
        return CustomerCompanies.upsert(args.customerId, {$set: args.data});
    }
});




//// shell of a manual update method
//CustomerCompanies.methods.updateManualFormLongHand = {
//    name: 'CustomerCompanies.methods.updateManualFormLongHand',
//
//    validate(args) {
//        console.log("validate", args);
//    },
//
//    run({ customerId, data }) {
//        console.log("run");
//    },
//
//    call(args, callback) {
//        const options = {
//            returnStubValue: true,     // (5)
//            throwStubExceptions: true  // (6)
//        };
//        console.log("callbacks");
//        Meteor.apply(this.name, [args], options, callback);
//    }
//};
//
//Meteor.methods({
//    [CustomerCompanies.methods.updateManualFormLongHand.name]: function (args) {
//        CustomerCompanies.methods.updateManualFormLongHand.validate.call(this, args);
//        CustomerCompanies.methods.updateManualFormLongHand.run.call(this, args);
//    }
//});
//
//// Autoform specific update method that knows how to unpack the single
//// object we get from autoform.
//CustomerCompanies.methods.updateAutoForm = new ValidatedMethod({
//
//    // register the name
//    name: 'CustomerCompanies.methods.updateAutoForm',
//
//    // register a method for validation.
//    validate(autoformArgs) {
//        console.log(autoformArgs);
//        // Need to tell the schema that we  are passing in a mongo modifier rather than just the data.
//        Schemas.CustomerCompaniesSchema.validate(autoformArgs.modifier , {modifier: true});
//    },
//
//    // the actual database updating part
//    // validate has already been run at this point
//    run(autoformArgs)
//    {
//        return CustomerCompanies.update(autoformArgs._id, autoformArgs.modifier);
//    }
//});
//
//// update method that doesn't use the recommended ValidatedMethod approach.
//// The params are in a specific order to match those sent by autoform.
//// To use this need to remove "singleMethodArgument=true" from form definition.
//Meteor.methods({
//    'CustomerCompanies.methods.updateAutoFormLongHand'( customerModifier, customerId ) {
//
//        // Simple-schema needs us to tell it that we are sending a mongo modifier rather
//        // than just the object: https://github.com/aldeed/meteor-simple-schema#validation-options
//        Schemas.CustomerCompaniesSchema.validate(customerModifier, {modifier: true});
//
//        CustomerCompanies.update(customerId, customerModifier);
//    }
//});