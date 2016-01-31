class orderHeadersCollection extends Mongo.Collection {};

// Make it available to the rest of the app
OrderHeaders = new orderHeadersCollection("OrderHeaders");

// Deny all client-side updates since we will be using methods to manage this collection
OrderHeaders.allow({
    insert() { return true; },
    update() { return true; },
    remove() { return true; }
});

// Define the expected Schema for data going into,
// and coming out of the database
//OrderHeaders.schema = Schemas.OrderHeadersSchema

// Bolt that schema onto the collection so that all mutator
// calls are automatically checked against the schema.
// Collection2 is what's allowing this to happen
OrderHeaders.attachSchema(Schemas.OrderHeaderSchema);
