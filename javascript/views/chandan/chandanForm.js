define([
	'backbone',
	'views/chandan/btn',
	'text!templates/chandan/chandan-form.html'
	], function(Backbone, Button, main_tpl) {
	var ChandanForm = Backbone.View.extend({

		initialize: function (options) {
			this.options = options
			this.render()
		},

		render: function () {
			this.$el.append(_.template(main_tpl)({
				color: this.options.color,
				value: this.options.value
			}));

			var btnBox = new Button({
				el: this.$('.box-row'),
				class: 'apdd',
				textString: 'Bg Change',
				onClick: $.proxy(this.btnClicked, this)
			})
		},

		btnClicked: function (e) {
			this.$('.box').removeClass(this.options.color).addClass('black')
		},

		
		destroy: function () {
			this.remove()
		}
	});

	return ChandanForm;
});