// action creators are functions that take a param and return
// an 'action' that is consumed by a reducer. This may seem like
// unneeded boilerplate  but it's **really** nice to have a file
// with *all* possible ways to mutate the state of the app.

import { validateItemAndAddValidationResults } from '../../lib/validation-helpers';


//Redux
Meteor.startup(function () { // work around files not being defined yet
    //console.log("Meteor.startup(function ()");
    if (Meteor.isClient) { // work around not having actions in /both folder
        console.log("ActionCreators Meteor.startup isClient");
        // trigger action when this changes
        trackCollection(CustomerCompanies, customersCollectionChanged);
    }
});


// used when a mongo customers collection changes
export function customersCollectionChanged(newDocs) {
    console.log("Actions.customersCollectionChanged ", newDocs);
    return (dispatch, getState) => {
        dispatch({
            type: 'CUSTOMERS_COLLECTION_CHANGED',
            collection: newDocs
        });
    }
};


// doesn't return payload because our collection watcher
// will send a CHANGED action and update the store
export function saveCustomer(customer) {
    console.log("saveCustomer: ", customer);
    return (dispatch, getState) => {

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
                dispatch({
                    type: 'SAVE_CUSTOMER'
                });

            }
        });
    }
}

function dispatchCustomerChange(customer, newValues) {
    console.log("inner");

    // don't mutate it
    const updatedCustomer = _.clone(customer);

    // loop each change and apply to our clone
    for (let newValue of newValues) {
        updatedCustomer[newValue.name] = newValue.value;
    }

    // validate and set error messages
    validateItemAndAddValidationResults(updatedCustomer, Schemas.CustomerCompaniesSchema);

    return {
        type: 'EDIT_CUSTOMER',
        updatedCustomer
    };
}

export function editCustomer(customer, newValues) {
    console.log("Actions.editCustomer() event.target:" + newValues);
    return (dispatch, getState) => {
        console.log("inner");
        dispatch(dispatchCustomerChange(getState().userInterface.customerBeingEdited, newValues))
    }
}

function loadCustomerToEdit(customerId) {
    console.log("loadCustomerToEdit");
    const customer = CustomerCompanies.findOne({_id: customerId})
    console.log("loadCustomerToEdit ", customer);

    // perform initial validation and set error messages
    validateItemAndAddValidationResults(customer, Schemas.CustomerCompaniesSchema);

    return {
        type: 'SELECT_CUSTOMER',
        customer
    } ;
}

export function selectCustomer(customerId) {
    console.log("Actions.selectCustomer: " + customerId.toString());
    return (dispatch, getState) => {
        console.log("INNER Actions.selectCustomer: " + customerId.toString());
        dispatch(loadCustomerToEdit(customerId));
    }
};

export function selectNewCustomer() {
    console.log("Actions.selectNewCustomer ")
    return (dispatch, getState) => {

        const newCustomer = {
            name: "",
            email: "",
            postcode: "",
            salesRegionId: "",
            nextContactDate: new Date(),
            createdAt: new Date(),
            errors: {}
        };

        dispatch({
            type: 'SELECT_CUSTOMER',
            customer: newCustomer
        });
    }
};

