define([
  'backbone',
  'text!templates/single_offer.html'
  ], function(Backbone, SingleOfferTmpl) {
  var HomePage = Backbone.View.extend({

    tagName: 'div',
    className: 'single-offer-container',

    initialize: function(options) {
      this.options = options;
      this.render();
    },

    render: function () {
      var data = this.model.toJSON();
      data = this.formatData(data);

      this.$el.append(_.template(SingleOfferTmpl)({
        data: data
      }));
      return this.$el;
    },

    formatData: function (data) {
      data.origin.pickup.startFormat = this.formatDate(data.origin.pickup.start);
      data.origin.pickup.endFormat = this.formatDate(data.origin.pickup.end);
      data.destination.dropoff.startFormat = this.formatDate(data.destination.dropoff.start);
      data.destination.dropoff.endFormat = this.formatDate(data.destination.dropoff.end);

      data.origin.pickup.mergedDate = this.mergeDates(data.origin.pickup.startFormat, data.origin.pickup.endFormat);
      data.destination.dropoff.mergedDate = this.mergeDates(data.destination.dropoff.startFormat, data.destination.dropoff.endFormat);

      return data;
    },

    formatDate: function (date) {
      var days = ['Sun', 'Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat'],
        dateStr = '',
        date = new Date(date);

       dateStr += days[date.getDay()] + ' ';
       dateStr += date.getDate() + '/' + (date.getMonth() + 1) + ' ';
       dateStr += date.getHours() + ':' + date.getMinutes();

       return dateStr;
    },

    mergeDates: function(date1, date2) {
      var array1 = date1.split(' '),
        array2 = date2.split(' '),
        mergedDate = '';

        if(array1[1] === array2[1]) { // Checking whether the Date is the same
          mergedDate = date1 + ' - ' + array2[2];
        } else {
          mergedDate = date1 + ' - ' + date2;
        }
        return mergedDate;
    },
    
    destroy: function () {
      this.stopListening();
      this.$el.html('');
    }

  });
  return HomePage;
});