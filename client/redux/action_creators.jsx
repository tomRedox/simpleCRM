// action creators are functions that take a param and return
// an 'action' that is consumed by a reducer. This may seem like
// unneeded boilerplate  but it's **really** nice to have a file
// with *all* possible ways to mutate the state of the app.


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

    //const custId = FlowRouter.getParam('_id');

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


    //CustomerCompanies.update({_id: customer._Id}, {$set: {customer}});

    //return { type: 'SAVE_CUSTOMER' };
};


Actions.editCustomer = function editCustomer(customerId, event) {
    console.log("Actions.editCustomer() event.target:", event.target);

    return {
        type: 'EDIT_CUSTOMER',
        customerId,
        event
    };
};

Actions.selectCustomer = function selectCustomer(customerId) {
    console.log("Actions.selectCustomer: " + customerId.toString())
    return {
        type: 'SELECT_CUSTOMER',
        customerId
    };
};

export default Actions;
