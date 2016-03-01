// import SimpleSchema from 'aldeed:simple.schema';
//import { Factory } from 'factory';

//import { getStore } from '../../client/redux/store.jsx';

/*
This is the representation of the mongo collection.  It exists on both the
client and server side, but will have different data.  The data is moved
from client to server by the publications.  Data is written back to the
collection via the Methods as we have explicitly denied permissions to
allow writing straight to the table in accordance with best practices.
 */

class customerCompanyCollection extends Mongo.Collection {}



// Make it available to the rest of the app
CustomerCompanies = new customerCompanyCollection("Companies");

// Deny all client-side updates since we will be using methods to manage this collection
CustomerCompanies.deny({
    insert() { return true; },
    update() { return true; },
    remove() { return true; }
});

// Bolt that schema onto the collection so that all mutator
// calls are automatically checked against the schema.
// Collection2 is what's allowing this to happen
CustomerCompanies.attachSchema(Schemas.CustomerCompaniesSchema);



//Redux
Meteor.startup(function () { // work around files not being defined yet
    console.log("Meteor.startup(function ()");
    if (Meteor.isClient) { // work around not having actions in /both folder
        console.log("Meteor.startup isClient");
        // trigger action when this changes
        trackCollection(CustomerCompanies, (data) => {
            store.dispatch(Actions.customersCollectionChanged(data));
        });
    }
});
