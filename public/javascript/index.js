define(['router', 'backbone'], function(Router, Backbone) {
	var getRouter, initialize;
	initialize = function() {
		this.appRouter = new Router();
		return Backbone.history.start({
			pushState: true
		});
	};

	getRouter = function() {
		return this.appRouter;
	};
	
	return {
		initialize: initialize,
		getRouter: getRouter
	};
});