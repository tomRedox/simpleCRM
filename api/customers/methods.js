
//import { CustomerCompanies } from './customer-company'


// The update method
update = new ValidatedMethod({

    // register the name
    name: 'CustomerCompanies.methods.update',

    // register a method for validation, what's going on here?
    validate: new SimpleSchema({
        customerId: {type: String}

    }).validator(),

    // the actual database updating part
    // validate has already been run at this point
    run(customerId, customer) {
        console.log("method: update");
        return CustomerCompanies.update(customerId, {
            $set: {
                name: customer.name,
                email: customer.email,
                postcode: customer.postcode
            }
        });
    }
});


Meteor.methods({
    'CustomerCompanies.methods.update2'( customer, customerId ) {

        console.log("CustomerCompanies.methods.update2");
        console.log("param1", customer);
        console.log("param2", customerId);

        const thisCust = customer.$set;

        Schemas.CustomerCompaniesSchema.validate(thisCust);

        console.log("CustomerCompanies.methods.update2 - validation succeeded");

        //const todo = CustomerCompanies.findOne(customerId);

        //if (!todo.editableBy(this.userId)) {
        //    throw new Meteor.Error('Todos.methods.updateText.unauthorized',
        //        'Cannot edit todos in a private list that is not yours');
        //}

        console.log("customer._id ", thisCust._id);
        console.log("customer.name ", thisCust.name);

        CustomerCompanies.update(customerId, { $set: {name: thisCust.name, email: thisCust.email, postcode: thisCust.postcode } });

        console.log("CustomerCompanies.methods.update2 - update succeeded");

    }
});