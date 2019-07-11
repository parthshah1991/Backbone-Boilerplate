define (['backbone'
	], function (Backbone, ClassCollection) {
	var AppRouter =  Backbone.Router.extend({
		
		routes: {
			// '/(.*)/'	: 	'homePage'
		},
			
		initialize : function () {
			this.handleHREF();
			this.homePage();
		},

		homePage: function () {
			var path = 'views/home_page';
			this.startIndexView(path);
		},

		handleHREF: function () {
			var self = this;
			$(document).on('click', 'a[href^="/"]', function(e) {
				var href, url;
				href = $(e.currentTarget).attr('href');
				url = href.replace(/^\//, '').replace('\#\!\/', '');
				self.navigate(url, {
					trigger: true
				});
				return false;
			});
		},

		startIndexView: function(path, options, callback) {
			var self = this;
			if (options == null) {
			  options = {};
			}
			require([path], function(IndexView) {
				self.prevView = self.currentView;
				if (self.prevView) {
					self.prevView.destroy();

				}
				self.currentView = new IndexView(options);
			});
		}
	});
	return AppRouter
});