define([
	'backbone'
	], function(Backbone, Data, MessengerModel, TeamView, ChatView, ContactModal, main_tpl) {
	var HomePage = Backbone.View.extend({

		el: '#body',

		initialize: function(options) {
			this.options = options;
			debugger
		},

		render: function () {
			
		},
		
		destroy: function () {
			this.stopListening();
			this.$el.html('');
		}

	});
	return HomePage;
});