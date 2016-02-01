//import './customer-companies-edit-auto.html';

//import { CustomerCompanies } from '../../api/customers/customer-company.js';

Template.updateCustomerEdit.helpers({

    customerDoc() {
        const customerId = () => FlowRouter.getParam('_id');
        const instance = Template.instance();

        instance.subscribe('CustomerCompany.get', customerId());

        return CustomerCompanies.findOne({_id: customerId()});
    }
});

Template.updateCustomerEdit.events({

    'click #cancelButton': function () {
        sAlert.success("Changes cancelled");
        FlowRouter.go('home');
    }
});

//noinspection JSUnusedLocalSymbols
AutoForm.hooks({
    updateCustomerEdit: {
        onSuccess: function(formType, result) {
            sAlert.success("Save successful");
        },

        onError: function(formType, error) {
            sAlert.error("Error saving");
        }

    }
});
