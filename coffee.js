Orders = new Meteor.Collection('orders');
Users = new Meteor.Collection('users');

if (Meteor.isClient) {
    Template.orders.items = function () {
        return Orders.find({ status: 'pending' });
    };

    Template.orders.events = {
        'click .orders-list-entry': function (evt) {
            var $this = $(evt.currentTarget);
            if ($this.hasClass('active')) return;
            $this.addClass('active');
            evt.preventDefault();
        }
    };

    Template.orders.rendered = function () {
        $('.cnt').each(function () {
            var $this = $(this);
            var d = new Date($this.text());
            $this.countdown({until: d, compact: true});
        });
    };

    Meteor.startup(function () {
    });
}

if (Meteor.isServer) {
    Meteor.startup(function () {
        // code to run on server at startup

        function testOrders() {
            if (Orders.findOne({vendor: 'Επίλεκτον'}) != null)
                Orders.remove({vendor: 'Επίλεκτον'});

            Orders.insert({
                owner: 'Γιαννης Καραδήμας',
                vendor: 'Επίλεκτον',
                status: 'pending',
                elapses: new Date(2013, 9, 14, 10, 30),
                entries: [{
                    quantity: 1,
                    name: 'freddo espresso μέτριο με λίγο εβαπορέ',
                    user: 'John'
                }]
            });
        }

        testOrders();
    });
}