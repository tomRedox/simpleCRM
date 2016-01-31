//import './customer-company-edit.html';

//import { CustomerCompanies } from '../../api/customers/customer-company.js';
//import { update } from '../../api/customers/methods'

Template.customer_company_edit.onCreated(function() {

    console.log("Template.customer_company_edit.onCreated");

    // create a reactive dictionary to hold any errors

    const customerId = () => FlowRouter.getParam('_id');

    console.log("customerId", customerId);

    this.autorun(() => {
        console.log("this0 ", this);
        this.subscribe('CustomerCompany.get', customerId());
    });

    console.log("this1 ", this);
    this.errorsReact = new ReactiveDict();
    console.log("errors1 ", this.errorsReact);
    console.log("CustomerCompanies1 ", CustomerCompanies);

});

Template.customer_company_edit.helpers({


    // expose a single customer record to the template
    customerCompany() {
        const company = CustomerCompanies.findOne({_id: FlowRouter.getParam('_id')});
        console.log("CustomerCompanies2 ", CustomerCompanies);
        //console.log("company ", company);
        return company;
    },

    // expose the errors dictionary to the template
    errors(fieldName) {

        const instance = Template.instance();

        console.log("this2 ", this);
        console.log("errors2 ", instance.errorsReact);
        return instance.errorsReact.get(fieldName);
    },

    options: function () {
        //return SalesRegions.find();
        //return [
        //    {label: "2013", value: 2013},
        //    {label: "2014", value: 2014},
        //    {label: "2015", value: 2015}
        //];
    }
});

Template.registerHelper("options", function() {

    const result = [];

    SalesRegions.find().map(function (obj) {
        result.push({
            label: obj.name,
            value: obj._id
        });
    });

    console.log("sales region results ", result);
      return result;
    //return [
    //    {label: "2013", value: 2013},
    //    {label: "2014", value: 2014},
    //    {label: "2015", value: 2015}
    //];
});

Template.customer_company_edit.events({

    'submit .customer_company_edit'(event) {
        console.log("CustomerCompanies3 ", CustomerCompanies);

        const up = update;

        // get a ref to the template
        const instance = Template.instance();

        // get the data out of the template (yuk)
        const dataFromForm = {
            name: event.target.name.value,
            email: event.target.email,
            postcode: event.target.postcode.value
        };

        // call the method for upserting the data
        up.call(dataFromForm, (err, res) => {
            console.log ("CustomerCompanies.methods.insert.call");
            if (err) {
                if (err.error === 'validation-error') {
                    // Initialize error object
                    const errors = {
                        name: [],
                        email: [],
                        postcode: []
                    };

                    // Go through validation errors returned from Method
                    err.details.forEach((fieldError) => {
                        // XXX i18n
                        errors[fieldError.name].push(fieldError.type);
                    });

                    // Update ReactiveDict, errors will show up in the UI

                    instance.errorsReact.set(errors);
                    console.log("errors3 ", instance.errorsReact);
                }
            }
        });
    }
});