define([
	'backbone',
	'views/chandan/btn',
	'views/chandan/chandanForm',
	'text!templates/chandan/chandan_page.html'
	], function(Backbone, Button, CForm, main_tpl) {
	var ChandanPage = Backbone.View.extend({

		// events: {
		// 	'click .btn-1': 'btnOneClicked',
		// 	'click .btn-2': 'btnTwoClicked'
		// },

		el: '#body',

		initialize: function () {
			this.render();
		},

		render: function () {
			this.$el.append(_.template(main_tpl)());


			this.btnLeft = new Button({
				el: this.$('.row-1'), // $('#body').find('.row')
				class: 'btn-1',
				textString: 'Button 1',
				onClick: $.proxy(this.btnOneClicked, this)
			})

			// this.listenTo(this.btnLeft, 'btn:click', this.btnOneClicked, this)

			this.btnRight = new Button({
				el: this.$('.row-2'), // $('#body').find('.row')
				class: 'btn-2',
				textString: 'Button 2',
				onClick: $.proxy(this.btnTwoClicked, this)
			})

			// this.listenTo(this.btnRight, 'btn:click', this.btnTwoClicked, this)

			this.CForm1 = new CForm({
				el: this.$('.form-1'),
				color: 'red',
				value: 'Box 1'

			})

			this.CForm2 = new CForm({
				el: this.$('.form-2'),
				color: 'blue',
				value: 'Box 2'
			})

			// this.$('.form-1').append(_.template(form_tpl)({
			// 	color: 'red',
			// 	value: 'box 1'
			// }));

			// this.$('.form-2').append(_.template(form_tpl)({
			// 	color: 'blue',
			// 	value: 'Box 2'
			// }));
		},

		btnOneClicked: function (e) {
			this.$('.main-container').addClass('btn-one-select').removeClass('btn-two-select');
		},

		btnTwoClicked: function (e) {
			this.$('.main-container').addClass('btn-two-select').removeClass('btn-one-select');
		},

		destroy: function () {
			this.stopListening();
			this.$el.empty()
		}
	});

	return ChandanPage;
});