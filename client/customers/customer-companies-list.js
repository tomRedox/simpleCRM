import './customer-companies-list.html';

import { CustomerCompanies } from '../../api/customers/customer-company.js';


Template.customer_companies_list.onCreated(function() {
    this.subscribe('CustomerCompanies.public');
});

Template.customer_companies_list.helpers({

    customerCompanies() {
        return CustomerCompanies.find();
    }

});