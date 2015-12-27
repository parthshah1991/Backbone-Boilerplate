define([
	'backbone',
	'text!templates/team_members.html'
	], function(Backbone, mem_tpl) {
	var TeamView = Backbone.View.extend({

		events: {
			'click .team-button-disconnect'		: 	"disconnectCall",
			'click .list-item-member-container'	: 	"teamMemberClick"
		},

		initialize: function(options) {
			this.options = options;
			this.render();
			this.cacheDOM();
		},

		render: function () {
			this.$el.append(_.template(mem_tpl)({collection : this.collection.toJSON()}));
		},

		cacheDOM: function () {
			this.$timerContainer = this.$('.team-timer');
		},

		getActiveId: function () {
			return this.$('.active').data('id');
		},

		startTimer: function (name) {
			this.$('.team-member-name').text(name);
			this.$el.addClass('team-call-ongoing');
		},

		updateTimer: function (time) {
			this.$timerContainer.text(time);
		},

		endTimer: function () {
			this.$el.removeClass('team-call-ongoing');
		},

		disconnectCall: function () {
			this.trigger('end:timer');
			this.endTimer();
		},

		teamMemberClick: function (e) {
			this.$('.active').removeClass('active');
			$(e.currentTarget).addClass('active');
		},

		destroy: function () {
			this.remove();
		}
	});
	return TeamView;
});