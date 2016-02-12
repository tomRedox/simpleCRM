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
        label: "Date created",
        defaultValue: new Date()
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


Schemas.ProductSchema = new SimpleSchema({

    name: {
        type: String,
        max: 100,
        optional: false
    },

    price: {
        type: Number,
        optional: false
    },

    createdAt: {
        type: Date,
        optional: false,
        label: "Date created"
    }
});

Schemas.OrderLineSchema = new SimpleSchema({

    productId: {
        type: String,
        optional: true,
        regEx: SimpleSchema.RegEx.Id,
        label: "Product"
    },

    description: {
        type: String,
        optional: false
    },

    quantity: {
        type: Number,
        optional: false
    },

    unitPrice: {
        type: Number,
        optional: false
    },

    lineValue: {
        type: Number,
        optional: true
    },

    createdAt: {
        type: Date,
        optional: false,
        label: "Date created"
    }
});

Schemas.OrderSchema = new SimpleSchema({

    customerId: {
        type: String,
        max: 100,
        optional: true,
        regEx: SimpleSchema.RegEx.Id,
        label: "Customer",
        optional: true

    },

    deliveryDate: {
        type: Date,
        optional: true
    },

    notes: {
        type: String,
        optional: true
    },

    deliveryAddress1: {
        type: String,
        optional: true
    },

    deliveryAddress2: {
        type: String,
        optional: true
    },

    deliveryAddress3: {
        type: String,
        optional: true
    },

    town: {
        type: String,
        optional: true
    },

    county: {
        type: String,
        optional: true
    },

    postcode: {
        type: String,
        optional: true
    },

    totalValue: {
        type: Number,
        optional: true
    },

    createdAt: {
        type: Date,
        optional: false,
        label: "Date created"
    },

    orderLines: {
        type: [Schemas.OrderLineSchema],
        optional: true
    }//,

    //"orderLines.$.productId": {
    //    type: String,
    //    optional: true,
    //    regEx: SimpleSchema.RegEx.Id,
    //    label: "Product"
    //},
    //
    //"orderLines.$.description": {
    //    type: String,
    //    optional: true
    //},
    //
    //"orderLines.$.quantity": {
    //    type: Number,
    //    optional: true
    //},
    //
    //"orderLines.$.unitPrice": {
    //    type: Number,
    //    optional: true
    //},
    //
    //"orderLines.$.lineValue": {
    //    type: Number,
    //    optional: true
    //},
    //
    //"orderLines.$.createdAt": {
    //    type: Date,
    //    optional: true,
    //    label: "Date created"
    //}
});
