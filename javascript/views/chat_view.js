define([
	'backbone',
	'text!templates/chat.html'
	], function(Backbone, chat_tpl) {
	var ChatView = Backbone.View.extend({

		events: {
			'click .medium'		:  "clickedMedium" 
		},

		initialize: function(options) {
			this.options = options;
			this.render();
		},

		render: function () {
			this.$el.append(_.template(chat_tpl)(this.model.toJSON()));
			this.animateChats();
		},

		clickedMedium: function () {
			this.trigger('open:modal');
		},

		animateChats: function () {
			var self = this,
				$elem, index = 0;

			self.$('.chat-item-container').each(function (i) {
				window.setTimeout (function () {
					self.$('.chat-item-container').eq(i).removeClass('hide-opacity');
				}, 200*(i+1));
			});
		},

		destroy: function () {
			this.stopListening();
			this.$el.html('');
		}
	});
	return ChatView;
});