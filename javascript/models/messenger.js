define([
	'backbone'
	], function(Backbone) {
	
	var Messenger = Backbone.Model.extend({
		initialize: function() {
			
		}
	});

	var MessengerCollection = Backbone.Collection.extend({

		model: Messenger,

		initialize: function() {
			
		}
	});

	return MessengerCollection;
});