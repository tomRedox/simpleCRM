Schemas = {};

Schemas.CustomerCompaniesSchema = new SimpleSchema({

    name: {
        type: String,
        max: 100,
        optional: false,
        label: "Customer name"
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

    salesRegionId: {
        type: String,
        max: 100,
        optional: true,
        regEx: SimpleSchema.RegEx.Id,
        label: "Sales region"
    },

    nextContactDate: {
        type: Date,
        optional: true
    },

    createdAt: {
        type: Date,
        optional: false,
        label: "Date created"
    }
});


Schemas.SalesRegionSchema = new SimpleSchema({

    name: {
        type: String,
        max: 100,
        optional: false
    },

    createdAt: {
        type: Date,
        optional: false,
        label: "Date created"
    }
});


Schemas.OrderHeaderSchema = new SimpleSchema({

    orderDate: {
        type: Date,
        optional: false,
        label: "Date created"
    },

    notes: {
        type: String
    },

    totalValue: {
        type: Number
    }

});