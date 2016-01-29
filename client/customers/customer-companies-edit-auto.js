//import './customer-companies-edit-auto.html';

//import { CustomerCompanies } from '../../api/customers/customer-company.js';

Template.updateCustomerEdit.helpers({

    someDoc() {
        //console.log("someDoc: ", FlowRouter.getParam('_id'))

        const customerId = () => FlowRouter.getParam('_id');
        //console.log("customerId", customerId)
        const instance = Template.instance();

        instance.subscribe('CustomerCompany.get', customerId());

        //console.log("CustomerCompanies2 ", CustomerCompanies);
        //console.log("company ", company);

        const company = CustomerCompanies.findOne({_id: customerId()});
        return company;
    }
});
