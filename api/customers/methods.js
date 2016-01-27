
import { CustomerCompanies } from './customer-company'
//import { ValidatedMethod } from 'validated-method';




// The upsert method
export const upsert = new ValidatedMethod({

    // register the name
    name: 'CustomerCompanies.methods.upsert',

    // register a method for validation, what's going on here?
    validate: new SimpleSchema({}).validator(),

    // the actual database updating part
    // validate has already been run at this point
    run(newCustomer) {
        return CustomerCompanies.upsert(newCustomer);
    }
});
