Orders = new Meteor.Collection('orders');

if (Meteor.isClient) {
    Template.orders.items = function () {
        return Orders.find({ status: 'pending' });
    };

    Template.orders.selectedOrder = function () {
        // The session is a monitored source of reactions; whenever it changes, reactors like this template
        // will update accordingly.
        return Session.get('selectedOrder');
    };

    Template.order_listing.active = function () {
        console.log(Session.get('selectedOrder'), this);
        return Session.get('selectedOrder') != null
            && Session.get('selectedOrder')._id === this._id ? 'active' : '';
    };

    Template.orders.events = {
        'click .orders-list-entry': function (evt) {
            var self = this, $this = $(evt.currentTarget);
            if ($this.hasClass('active')) return;
            Session.set("selectedOrder", self);
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
}

if (Meteor.isServer) {
    Meteor.startup(function () {
        // code to run on server at startup

        function testOrders() {
            if (Orders.findOne({vendor: 'Επίλεκτον'}) != null)
                Orders.find().forEach(function (x) {
                    Orders.remove(x);
                });

            Orders.insert({
                owner: 'Γιαννης Καραδήμας',
                vendor: 'Επίλεκτον',
                status: 'pending',
                elapses: new Date(2013, 9, 14, 10, 30),
                entries: [{
                    quantity: 1,
                    name: 'freddo espresso μέτριο με λίγο εβαπορέ',
                    user: 'Yiannis Karadimas'
                }]
            });

            Orders.insert({
                owner: 'Ερρίκος Κοέν',
                vendor: 'Γρηγόρης',
                status: 'pending',
                elapses: new Date(2013, 9, 14, 11, 45),
                entries: [{
                    quantity: 1,
                    name: 'freddo cappuccino γλυκό',
                    user: 'Panayiotis Matsinopoulos'
                }]
            });
        }

        testOrders();
    });
}