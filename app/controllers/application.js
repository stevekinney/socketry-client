import Ember from 'ember';
import Message from 'socketry/models/message';

export default Ember.ArrayController.extend({
  needs: ['websocket'],

  author: null,
  authorInput: null,
  message: null,

  messageCount: function () {
    return this.get('content').get('length');
  }.property('content.@each'),

  actions: {
    setAuthor: function () {
      this.set('author', this.get('authorInput'));
    },
    sendMessage: function () {
      var message = {
        type: 'newMessage',
        author: this.get('author'),
        message: this.get('message')
      };
      this.get('controllers.websocket').sendMessage(JSON.stringify(message));
      this.set('message', null);
    }
  }
});
