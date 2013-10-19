Orders = new Meteor.Collection('orders');

if (Meteor.isClient) {
    Template.orders.items = function () {
        return Orders.find({ status: 'pending' });
    };

    Template.orders.selectedOrder = function () {
        // The session is a monitored source of reactions; whenever it changes,
        // reactors like this template will update accordingly.
        return Session.get('selectedOrder');
    };

    Template.order_listing.active = function () {
        return Session.get('selectedOrder') != null
            && Session.get('selectedOrder')._id === this._id ? 'active' : '';
    };

    Template.orders.events = {
        'click .orders-list-entry': function (evt) {
            var model = this, $this = $(evt.currentTarget);
            if ($this.hasClass('active')) return;
            Session.set("selectedOrder", model);
            evt.preventDefault();
        },
        'submit .order-item-form':  function (evt) {
            evt.preventDefault();

            var $this = $(evt.currentTarget);

            if (!$this.valid()) return false;

            var currentOrder = Session.get('selectedOrder');

            if (currentOrder) {
                currentOrder.entries.push({
                    quantity: $this.find('#quantity').val(),
                    name: $this.find('#name').val(),
                    user: Meteor.user().profile.name,
                    userId: Meteor.userId()
                });

                Orders.update({_id: currentOrder._id}, currentOrder);

                // trigger an update so the new data can be loaded.
                Session.set('selectedOrder', currentOrder);
            }

            return false;
        }
    };

    Template.orders.rendered = function () {
        $('.cnt').each(function () {
            var $this = $(this);
            var d = new Date($this.text());
            $this.countdown({until: d, compact: true});
        });
    };

    Template.order_item_form.rendered = function () {
        $('.order-item-form').validate({
            showErrors: function (evt) {
                return false;
            },

            rules: {
                quantity: {
                    required: true,
                    min: 1,
                    max: 100
                }
            }
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
                    user: 'Yiannis Karadimas',
                    userId: 1
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
                    user: 'Panayiotis Matsinopoulos',
                    userId: 2
                }]
            });
        }

        testOrders();
    });
}
