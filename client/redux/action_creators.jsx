// action creators are functions that take a param and return
// an 'action' that is consumed by a reducer. This may seem like
// unneeded boilerplate  but it's **really** nice to have a file
// with *all* possible ways to mutate the state of the app.

import { validateItemAndAddValidationResults } from '../../lib/validation-helpers';


Actions = {};

// used when a mongo customers collection changes
Actions.customersCollectionChanged = function customersCollectionChanged(newDocs) {
    console.log("Actions.customersCollectionChanged ", newDocs);
    return {
        type: 'CUSTOMERS_COLLECTION_CHANGED',
        collection: newDocs
    };
};


// doesn't return payload because our collection watcher
// will send a CHANGED action and update the store
Actions.saveCustomer = function saveCustomer(customer) {
    console.log("saveCustomer: ", customer);

    // call the method for upserting the data
    CustomerCompanies.methods.updateManualForm.call({
        customerId: customer._id,
        data: customer
    }, (err, res) => {
        //console.log ("CustomerCompanies.methods.updateManualForm.call was called");
        if (err) {
            // TODO call FAILED action on error
            sAlert.error(err.message);
        } else {
            sAlert.success("Save successful");
            FlowRouter.go("/");
            return {type: 'SAVE_CUSTOMER'};

        }
    });
};


Actions.editCustomer = function editCustomer(customer, newValues) {
    console.log("Actions.editCustomer() event.target:" + newValues);

    // don't mutate it
    const updatedCustomer = _.clone(customer);

    // loop each change and apply to our clone
    for(let newValue of newValues) {
        updatedCustomer[newValue.name] = newValue.value;
    }

    // validate and set error messages
    validateItemAndAddValidationResults(updatedCustomer, Schemas.CustomerCompaniesSchema);

    return {
        type: 'EDIT_CUSTOMER',
        updatedCustomer
    };
};

Actions.selectCustomer = function selectCustomer(customerId) {
    console.log("Actions.selectCustomer: " + customerId.toString());

    const customer = CustomerCompanies.findOne({_id: customerId})

    // perform initial validation and set error messages
    validateItemAndAddValidationResults(customer, Schemas.CustomerCompaniesSchema);

    return {
        type: 'SELECT_CUSTOMER',
        customer
    };
};

Actions.selectNewCustomer = function selectNewCustomer() {
    console.log("Actions.selectNewCustomer ")

    const newCustomer = {
        name: "",
        email: "",
        postcode: "",
        salesRegionId: "",
        nextContactDate: new Date(),
        createdAt: new Date()
    };

    return {
        type: 'SELECT_CUSTOMER',
        newCustomer
    };
};

export default Actions;
