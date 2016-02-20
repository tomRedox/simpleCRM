class productsCollection extends Mongo.Collection {}

// Make it available to the rest of the app
const Products = new productsCollection("Products");

// Deny all client-side updates since we will be using methods to manage this collection
Products.allow({
    insert() { return true; },
    update() { return true; },
    remove() { return true; }
});

// Define the expected Schema for data going into,
// and coming out of the database
//Products.schema = Schemas.ProductsSchema

// Bolt that schema onto the collection so that all mutator
// calls are automatically checked against the schema.
// Collection2 is what's allowing this to happen
Products.attachSchema(Schemas.ProductSchema);

export default Products;