class orderLinesCollection extends Mongo.Collection {};

// Make it available to the rest of the app
OrderLines = new orderLinesCollection("OrderLines");

// Deny all client-side updates since we will be using methods to manage this collection
OrderLines.allow({
    insert() { return true; },
    update() { return true; },
    remove() { return true; }
});

// Define the expected Schema for data going into,
// and coming out of the database
//OrderLines.schema = Schemas.OrderLinesSchema

// Bolt that schema onto the collection so that all mutator
// calls are automatically checked against the schema.
// Collection2 is what's allowing this to happen
OrderLines.attachSchema(Schemas.OrderLineSchema);
