define([
	'backbone',
	'views/single_offer',
	'models/offer',
	'text!templates/home_page.html'
	], function(Backbone, SingleOffer, OfferCollection, HomeTemplate) {
	var HomePage = Backbone.View.extend({

		el: '#body',

		childrenViews: null,

		offerCollection: null,

		offset: 0,

		events: {
			'click .show-more-btn': 'showMore',
			'change .sort-options': 'sortOffers'
		},

		initialize: function(options) {
			this.options = options;
			this.childrenViews = [];
			this.populateViews();
			this.render();
		},

		render: function () {
			this.$el.append(_.template(HomeTemplate)());
		},

		populateViews: function() {
			this.offerCollection = new OfferCollection();
			this.offerCollection.fetchData();

			this.listenTo(this.offerCollection, 'sync', this.addChildViews);
		},

		addChildViews: function (collection, additions) {
			var view = null;
			for (var i=0; i<additions.length; i++) {
				view = new SingleOffer({
					model: collection.at(this.offset)
				});
				this.offset++;

				this.childrenViews.push(view);
				this.$('.list-container').append(view.$el);
			}
		},

		sortOffers: function (e) {
			this.offset = 0;
			this.$('.list-container').empty();
			this.offerCollection.fetchData({ 
				data: { 
					offset: this.offset,
					sort: e.currentTarget.value
				},
				processData: true,
				remove: true
			});
		},

		showMore: function () {
			this.offerCollection.fetchData({ 
				data: { 
					offset: this.offset
				},
				processData: true,
				remove: false
			});
		},
		
		destroy: function () {
			this.stopListening();
			this.$el.html('');
		}

	});
	return HomePage;
});