import { createCollection } from '../lib/collection-helpers.js';

// Make it available to the rest of the app
const SalesRegions = new createCollection("SalesRegions", Schemas.SalesRegionSchema);

export default SalesRegions;