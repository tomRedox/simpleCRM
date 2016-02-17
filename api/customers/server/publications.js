
//import { CustomerCompanies } from '../customer-company.js';

Meteor.publish('CustomerCompanies.public', function () {
    return CustomerCompanies.find();
});

Meteor.publish('CustomerCompany.get', function (_id) {

    //console.log("publication match ", CustomerCompanies.find({_id: custId}).fetch());

    return CustomerCompanies.find({_id});
});

Meteor.publish('CustomerCompanies.searchByName', function (searchTerm) {

    //console.log("CustomerCompanies.searchByName " + searchTerm, CustomerCompanies.find({name: new RegExp(searchTerm)}).fetch());

    return CustomerCompanies.find({name: new RegExp(searchTerm, 'i')});
})
