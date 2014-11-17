import Ember from 'ember';
import Message from 'socketry/models/message';

export default Ember.ArrayController.extend({

  author: null,
  authorInput: null,
  message: null,

  messageCount: function () {
    return this.get('content').get('length');
  }.property('content.@each'),

  subscribe: function () {
    this.handleReceivedMessage = function (message) {
      this.get('content').pushObject(Message.create(message));
    }.bind(this);
    this.websocketService.subscribe('newMessage', this.handleReceivedMessage);
  },

  unsubscribe: function () {
    this.websocketService.unsubscribe('newMessage', this.handleReceivedMessage);
  },

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
      this.websocketService.sendMessage(JSON.stringify(message));
      this.set('message', null);
    }
  }
});