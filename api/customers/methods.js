
import { CustomerCompanies } from './customer-company'
//import { ValidatedMethod } from 'validated-method';


export const insert = new ValidatedMethod({
    name: 'CustomerCompanies.methods.insert',
    validate: new SimpleSchema({}).validator(),
    run() {
        return CustomerCompanies.insert({});
    }
});
