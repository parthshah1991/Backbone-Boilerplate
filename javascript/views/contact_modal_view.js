define([
	'backbone',
	'text!templates/contact_modal.html'
	], function(Backbone, contact_tpl) {
	var ConatctModal = Backbone.View.extend({

		events: {
			'click .back-container' 		: 'goBack',
			'click .user-contact-circle'	: 'callUser',
			'click .button-disconnect'		: 'endCall'
		},

		initialize: function(options) {
			this.options = options;
			this.render();
			this.cacheDOM()
		},

		cacheDOM: function () {
			this.$timerContainer = this.$('.calling-timer');
			this.seconds = 0;
			this.minutes = 0;
		},

		render: function () {
			this.$el.append(_.template(contact_tpl)(this.model.toJSON()));
		},

		openModal: function () {
			var self = this;
			this.$el.show();
			window.setTimeout(function () {
				self.animateButtons();
				self.animateRatingsBar();
				self.animateAdditionalDetails();
			}, 300);
		},

		animateButtons: function () {
			this.$('.animated').removeClass('animated');
		},

		animateRatingsBar: function () {
			this.$('.ratings-bar-inner-fixed-width').removeClass('ratings-bar-inner-fixed-width');
		},

		animateAdditionalDetails: function () {
			this.$('.additional-animation').removeClass('additional-animation');
		},

		closeModal: function () {
			this.$el.hide();
		},

		goBack: function () {
			this.closeModal();
			this.destroy();
		},

		callUser: function () {
			var self = this;
			this.$el.addClass('call-in-progress')
			this.callingTimeout = window.setTimeout(function (){
				self.pickUpPhone();
			}, 1500);
		},

		pickUpPhone: function () {
			this.$el.addClass('call-duration-on')
			this.startTimer();
			this.trigger('start:timer', this.model.get('name'));
		},

		startTimer: function () {
			this.seconds++;
			if (this.seconds >= 60) {
				this.seconds = 0;
				this.minutes++;
			}
			comp_secs = this.seconds > 9 ? this.seconds : "0" + this.seconds;
			comp_min = this.minutes ? (this.minutes > 9 ? this.minutes : "0" + this.minutes) : '00'
			time = comp_min +' : '+ comp_secs;
			this.$timerContainer.text(time);
			this.trigger('update:timer', time);
			this.timer();
		},

		timer: function () {
			var self = this;
			window.clearTimeout(this.timerTimeout);
			this.timerTimeout = window.setTimeout(function () {
				self.startTimer();
			}, 1000);
		},

		endCall: function () {
			window.clearTimeout(this.timerTimeout);
			window.clearTimeout(this.callingTimeout);
			this.seconds = 0;
			this.minutes = 0;
			this.$el.removeClass('call-in-progress call-duration-on');
			this.trigger('end:timer');
		},

		endTimer: function () {
			this.endCall();
		},

		destroy: function () {
			this.stopListening();
			this.$el.html('');
		}
	});
	return ConatctModal;
});