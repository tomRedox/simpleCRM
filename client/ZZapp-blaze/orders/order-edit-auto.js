

//noinspection JSUnusedGlobalSymbols
Template.orderEditAuto.helpers({

    someDoc() {
        const id = () => FlowRouter.getParam('_id');
        const instance = Template.instance();

        instance.subscribe('Order.get', id);

        return Orders.findOne({_id: id()});
    }
});


//noinspection JSUnusedLocalSymbols,JSUnusedGlobalSymbols
AutoForm.hooks({
    orderEditAuto: {
        onSuccess: function(formType, result) {
            sAlert.success("Save successful");
        },

        onError: function(formType, error) {
            sAlert.error("Error saving");
        }

    }
});
