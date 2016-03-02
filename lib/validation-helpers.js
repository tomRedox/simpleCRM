
export function validateItemAgainstSchema(item, schema) {
    const errors = {};
    console.log("validateItemAgainstSchema(): item ", item);

    // Perform the validation on a clone of the item as we need to call clean first
    // and clean will actually update the original item.  That's bad if we are typing
    // a sentence with spaces in as it will become impossible to type a space as the
    // on change validation will remove the space.  Also, we probably don't want the
    // data the user typed being changed without them expecting it.
    let clonedItem = _.clone(item);

    schema.clean(clonedItem);

    const schemaContext = schema.namedContext("validateItem");
    schemaContext.validate(clonedItem);

    schemaContext.invalidKeys().forEach(invalidKey => {
        const errMessage = schemaContext.keyErrorMessage(invalidKey.name);
        if (invalidKey.name !== "_id") {
            errors[invalidKey.name] = errMessage;
            console.log("errMessage", errMessage);
        }
    });

    return errors;
}

export function validateItemAndAddValidationResults(item, schema) {
    // validate and set (or bolt on) error messages
    item.errors = validateItemAgainstSchema(item, schema);
    item.isValid = (Object.keys(item.errors).length === 0);
}
