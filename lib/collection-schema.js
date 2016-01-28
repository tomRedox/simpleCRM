Schemas = {};

Schemas.CustomerCompaniesSchema = new SimpleSchema({

    name: {
        type: String,
        max: 100,
        optional: false
    },

    email: {
        type: String,
        max: 100,
        regEx: SimpleSchema.RegEx.Email,
        optional: true
    },

    postcode: {
        type: String,
        max: 10,
        optional: true
    },

    createdAt: {
        type: Date,
        optional: false
    }
});
