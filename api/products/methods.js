
import Products from './products.js';


Products.methods = {};


// Manual form specific update method that knows how to unpack the single
// object we get from autoform.
Products.methods.upsert = new ValidatedMethod({

    // register the name
    name: 'Products.methods.upsert',

    validate(args) {
        console.log("Products.methods.upsert.validate(args) ", args);

        Schemas.ProductSchema.clean(args.data);

        var schemaContext = Schemas.ProductSchema.namedContext("ProductForm");
        schemaContext.validate(args.data);

        console.log("validation succeeded");
    },


    // the actual database updating part
    // validate has already been run at this point
    run(args) {
        //console.log("run");
        //console.log("args", args);
        //console.log("lines", args.data.productLines);
        //console.log("lines[0]", args.data.productLines[0]);
        //console.log("product", JSON.stringify(args.data));

        return Products.upsert(args.productId, {$set: args.data});
    }
});


Meteor.methods({
    'Products.methods.remove'({ productId }) {
        console.log("Products.methods.remove", productId);
        Products.remove( { _id: productId } );
    }
});
