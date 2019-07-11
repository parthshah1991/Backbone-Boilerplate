define([
  'backbone'
  ], function(Backbone) {
  
  var Offer = Backbone.Model.extend({
    initialize: function() {
      
    }
  });

  var OfferCollection = Backbone.Collection.extend({

    model: Offer,

    url: 'https://convoy-frontend-homework-api.herokuapp.com/offers',

    initialize: function() {
    },

    fetchData: function(data) {
      data = data || {};
      this.fetch(data);
    }
  });

  return OfferCollection;
});