
import { createCollection } from '../lib/collection-helpers.js';

// Make it available to the rest of the app
const CustomerCompanies = createCollection("Companies", Schemas.CustomerCompaniesSchema);

export default CustomerCompanies;
