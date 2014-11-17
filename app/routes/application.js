import Ember from 'ember';

export default Ember.Route.extend({
  model: function () {
    return [];
  },
  activate: function () {
    this.controllerFor('application').subscribe();
  },
  deactivate: function () {
    this.controllerFor('application').unsubscribe();
  }
});
