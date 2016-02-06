/* off-canvas sidebar toggle */

$('[data-toggle=offcanvas]').click(function() {
    $(this).toggleClass('visible-xs text-center');
    $(this).find('i').toggleClass('fa-chevron-right fa-chevron-left');
    $('.row-offcanvas').toggleClass('active');
    $('#lg-menu').toggleClass('hidden-xs').toggleClass('visible-xs');
    $('#xs-menu').toggleClass('visible-xs').toggleClass('hidden-xs');
    $('#btnShow').toggle();
});

// counter starts at 0
Session.setDefault('sidebarVisible', 0);

Template.sidebar.helpers({
    sidebarVisible: function () {
        return Session.get('sidebarVisible');
    }
});

Template.sidebar.events({
    'click button': function () {

    }
});
