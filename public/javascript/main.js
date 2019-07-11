requirejs.config({
	paths: {
		'underscore': 'vendor/underscore',
		'jquery': 'vendor/jquery',
		'backbone': 'vendor/backbone',
	},
	shims: {
		'backbone': {
		  deps: ['underscore', 'jquery']
		}
	}
});

requirejs(['index'], function(Index) {
	return Index.initialize();
});
