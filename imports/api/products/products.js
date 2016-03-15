import { createCollection } from '../lib/collection-helpers.js';

// Make it available to the rest of the app
const Products = new createCollection("Products", Schemas.ProductSchema);

export default Products;