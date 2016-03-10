/*
This is the representation of the mongo collection.  It exists on both the
client and server side, but will have different data.  The data is moved
from client to server by the publications.  Data is written back to the
collection via the Methods as we have explicitly denied permissions to
allow writing straight to the table in accordance with best practices.
 */

class customerCompanyCollection extends Mongo.Collection {}

// Make it available to the rest of the app
const CustomerCompanies = new customerCompanyCollection("Companies");

// Bolt that schema onto the collection so that all mutator
// calls are automatically checked against the schema.
// Collection2 is what's allowing this to happen
CustomerCompanies.attachSchema(Schemas.CustomerCompaniesSchema);

export default CustomerCompanies;
