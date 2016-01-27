
import { CustomerCompanies } from '../customer-company.js';

Meteor.publish('CustomerCompanies.public', function() {
    return CustomerCompanies.find();
});
