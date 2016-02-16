class salesRegionsCollection extends Mongo.Collection {}

// Make it available to the rest of the app
SalesRegions = new salesRegionsCollection("SalesRegions");

// Deny all client-side updates since we will be using methods to manage this collection
SalesRegions.allow({
    insert() { return true; },
    update() { return true; },
    remove() { return true; }
});

// Define the expected Schema for data going into,
// and coming out of the database
//SalesRegions.schema = Schemas.SalesRegionsSchema

// Bolt that schema onto the collection so that all mutator
// calls are automatically checked against the schema.
// Collection2 is what's allowing this to happen
SalesRegions.attachSchema(Schemas.SalesRegionSchema);
