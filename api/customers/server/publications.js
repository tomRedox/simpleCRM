
//import { CustomerCompanies } from '../customer-company.js';

Meteor.publish('CustomerCompanies.public', function() {
    return CustomerCompanies.find();
});

Meteor.publish('CustomerCompany.get', function (custId) {

    //console.log("publication match ", CustomerCompanies.find({_id: custId}).fetch());

    return CustomerCompanies.find({_id: custId});
});
