//import { SimpleSchema } from 'aldeed:simple-schema';
//import { Factory } from 'factory';

class customerCompanyCollection extends Mongo.Collection {
    insert(customerCompany, callback) {
        //if (!customerCompany.name) {
        //    let nextLetter = 'A';
        //    customerCompany.name = `List ${nextLetter}`;
        //
        //    while (!!this.findOne({name: customerCompany.name})) {
        //        // not going to be too smart here, can go past Z
        //        nextLetter = String.fromCharCode(nextLetter.charCodeAt(0) + 1);
        //        customerCompany.name = `List ${nextLetter}`;
        //    }
        //}

        return super.insert(customerCompany, callback);
    }
}

export const CustomerCompanies = new customerCompanyCollection("Companies");

