
// counter starts at 0
Session.setDefault('counter', 0);

Template.counter.helpers({
    counter: function () {
        return Session.get('counter');
    }
});

Template.counter.events({
    'click button': function () {
        // increment the counter when button is clicked
        Session.set('counter', Session.get('counter') + 1);

    },

    'click #resetCounter': function () {
        // increment the counter when button is clicked
        Session.set('counter', 0);
        sAlert.success("Counter reset")
    }
});
