
import { CustomerCompanies } from './customer-company'
//import { ValidatedMethod } from 'validated-method';




// The update method
export const update = new ValidatedMethod({

    // register the name
    name: 'CustomerCompanies.methods.update',

    // register a method for validation, what's going on here?
    validate: new SimpleSchema(Schemas.CustomerCompaniesSchema).validator(),

    // the actual database updating part
    // validate has already been run at this point
    run(id, newCustomer) {
    console.log("method: update");
        return CustomerCompanies.update(newCustomer);
    }
});
