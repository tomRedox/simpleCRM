import './customer-company-edit.html';

import { CustomerCompanies } from '../../api/customers/customer-company.js';

Template.customer_company_edit.onCreated(function() {

    this.errors = new ReactiveDict();

    const customerId = () => FlowRouter.getParam('_id');

    console.log("customerId", customerId)
    this.autorun(() => {
        this.subscribe('CustomerCompany.get', customerId());
    });
});

Template.customer_company_edit.helpers({

    customerCompany() {
        const company = CustomerCompanies.findOne({_id: FlowRouter.getParam('_id')});
        //console.log("company ", company);
        return company;
    },

    errors(fieldName) {
        return this.errors.get(fieldName);
    }
});