define([
	'backbone',
	'text!templates/home_page.html'
	], function(Backbone, HomeTemplate) {
	var HomePage = Backbone.View.extend({

		el: '#body',

		initialize: function(options) {
			this.options = options;
			this.render();
		},

		render: function () {
			this.$el.append(_.template(HomeTemplate)());
		},
		
		destroy: function () {
			this.stopListening();
			this.$el.html('');
		}

	});
	return HomePage;
});