//import './customer-company-edit.html';

//import { CustomerCompanies } from '../../api/customers/customer-company.js';
//import { update } from '../../api/customers/methods'

Template.customer_company_edit.onCreated(function() {

    console.log("Template.customer_company_edit.onCreated");

    this.errors = new ReactiveDict();

    this.autorun(() => {
        this.subscribe('CustomerCompany.get', FlowRouter.getParam('_id'));
    });
});

Template.customer_company_edit.rendered=function() {
    $('#nextContactDate').datepicker();
}

Template.customer_company_edit.helpers({


    // expose a single customer record to the template
    customerCompany() {
        const company = CustomerCompanies.findOne({_id: FlowRouter.getParam('_id')});
        //console.log("CustomerCompanies2 ", CustomerCompanies);
        //console.log("company ", company);
        return company;
    },

    // expose the errors dictionary to the template
    errors(fieldName) {
        //console.log("Template.instance().errors", Template.instance().errors);
        //console.log("field error ", Template.instance().errors.get(fieldName));
        return Template.instance().errors.get(fieldName);
    },

    isSelected: function (region, customer) {
        if (!customer) return false;

        return customer.salesRegionId === region._id;
    },

    salesRegionsOptions1: function () {
        return SalesRegions.find();
    }
});

Template.registerHelper("salesRegionsOptions", function() {

    const result = [];

    SalesRegions.find().map(function (obj) {
        result.push({
            label: obj.name,
            value: obj._id
        });
    });

    //console.log("sales region results ", result);
    return result;
});

Template.customer_company_edit.events({

    'submit'(event) {
        event.preventDefault();

        //console.log("Submit customer_company_edit ");

        // get the data out of the template (yuk)
        const dataFromForm = {
            name: event.target.name.value,
            email: event.target.email.value,
            postcode: event.target.postcode.value,
            nextContactDate: event.target.nextContactDate.date,
            salesRegionId: event.target.salesRegionId.value
        };

        //console.log("dataFromForm", dataFromForm);

        const custId = FlowRouter.getParam('_id')

        // call the method for upserting the data
        CustomerCompanies.methods.updateManualForm.call({
            customerId: custId,
            data: dataFromForm
        }, (err, res) => {
            //console.log ("CustomerCompanies.methods.updateManualForm.call was called");
            if (err) {
                if (err.error === 'validation-error') {

                    // Initialize error object
                    const errors = {
                        data: [],
                        customerId: [],
                        name: [],
                        email: [],
                        postcode: []
                    };

                    // Go through validation errors returned from Method
                    err.details.forEach((fieldError) => {
                        // XXX i18n
                        if (errors[fieldError.name]) {
                            errors[fieldError.name].push(fieldError.type);
                        }
                    });

                    // Update ReactiveDict, errors will show up in the UI

                    Template.instance().errors.set(errors);
                    //console.log("errors3 ", Template.instance().errors);
                }
                sAlert.error(err.message);
                console.log("Save error ", err);
            } else {
                sAlert.success("Save successful")
            }
        });
    }
});