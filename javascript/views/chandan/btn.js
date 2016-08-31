define([
	'backbone',
	'text!templates/chandan/btn.html'
	], function(Backbone, main_tpl) {
	var Button = Backbone.View.extend({

		events:{
			'click .btn' : 'onButtonClick'
		},


		initialize: function (options) {
			this.options = options;
			this.render();
		},

		render: function () {
			this.$el.append(_.template(main_tpl)({
				className: this.options.class,
				text: this.options.textString
			}));
		},

		onButtonClick: function (e) {
			// this.trigger('btn:click', e)
			console.log(this.options.textString)
			this.options.onClick()
		},

		
		destroy: function () {
			this.remove()
		}
	});

	return Button;
});