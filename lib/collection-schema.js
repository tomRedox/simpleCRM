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

    ordersCount: {
        type: Number,
        optional: true,
        decimal: false,
        defaultValue: 0
    },

    ordersTotalValue: {
        type: Number,
        optional: true,
        decimal: true,
        defaultValue: 0
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
        optional: false,
        decimal: true
    },

    createdAt: {
        type: Date,
        optional: false,
        label: "Date created"
    }
});

Schemas.OrderLineSchema = new SimpleSchema({

    _id: {
        type: String,
        max: 100,
        optional: false
    },

    productId: {
        type: String,
        optional: true,
        regEx: SimpleSchema.RegEx.Id,
        label: "Product"
    },

    description: {
        type: String,
        optional: false,
        min: 1
    },

    quantity: {
        type: Number,
        optional: false
    },

    unitPrice: {
        type: Number,
        optional: false,
        decimal: true
    },

    lineValue: {
        type: Number,
        optional: true,
        decimal: true
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
        regEx: SimpleSchema.RegEx.Id,
        label: "Customer",
        optional: true
    },

    customerName: {
        type: String,
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
        optional: false,
        min: 1
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
        optional: true,
        max: 10
    },

    totalValue: {
        type: Number,
        optional: true,
        decimal: true
    },

    createdAt: {
        type: Date,
        optional: false,
        label: "Date created"
    },

    orderLines: {
        type: [ Schemas.OrderLineSchema ],
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
