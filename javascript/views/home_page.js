define([
	'backbone',
	'models/data',
	'models/messenger',
	'views/team_view',
	'views/chat_view',
	'views/contact_modal_view',
	'text!templates/home_page.html'
	], function(Backbone, Data, MessengerModel, TeamView, ChatView, ContactModal, main_tpl) {
	var HomePage = Backbone.View.extend({

		el: '#body',

		initialize: function(options) {
			this.options = options;
			this.collection = new MessengerModel(Data)
			this.render();
		},

		render: function () {
			this.$el.append(_.template(main_tpl)());
			this.initTeamView();
			this.initChatView();
		},
		
		initChatView: function () {
			this.chatView = new ChatView({
				el: this.$('.left-section'),
				model: this.collection.findWhere({id : this.teamView.getActiveId()})
			})
			this.listenTo(this.chatView, 'open:modal', this.openContactModal)
		},

		initTeamView: function () {
			this.teamView = new TeamView({
				el: this.$('.right-section'), 
				collection: this.collection
			});
			this.listenTo(this.teamView, 'end:timer', this.endContactViewTimer);
		},

		initContactModal: function () {
			this.contactModal = new ContactModal ({
				el: this.$('.left-modal-section'),
				model: this.collection.findWhere({id : this.teamView.getActiveId()})
			});
			this.listenTo(this.contactModal, 'start:timer', this.startTeamViewTimer);
			this.listenTo(this.contactModal, 'update:timer', this.updateTeamViewTimer);
			this.listenTo(this.contactModal, 'end:timer', this.endTeamViewTimer);
		},

		startTeamViewTimer: function (name) {
			this.teamView.startTimer(name);
		},

		updateTeamViewTimer: function (time) {
			this.teamView.updateTimer(time);
		},

		endTeamViewTimer: function () {
			this.teamView.endTimer();
		},

		endContactViewTimer: function () {
			this.contactModal.endTimer();
		},

		openContactModal: function () {
			this.initContactModal()
			this.contactModal.openModal()
		},

		destroy: function () {
			this.stopListening();
			this.contactModal && this.contactModal.destroy();
			this.teamView && this.teamView.destroy();
			this.chatView && this.chatView.destroy();
			this.$el.html('');
		}

	});
	return HomePage;
});