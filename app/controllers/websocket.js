import Ember from 'ember';

export default Ember.Controller.extend({
  _setup: function () {

    // You'll want to store your configuration in config/environment.js
    var websocket = this.websocket = new WebSocket('ws://localhost:8080');

    // Let's log something to the console when we make a connection to our
    // WebSocket.
    websocket.onopen = function () {
      console.log('Connected via WebSocket');
    };

    // Set up an empty hash to store channel subscribers.
    this._subscribers = {};

    // When we receive a message over the WebSocket
    websocket.onmessage = function (e) {
      console.log('Received via WebSocket:', e.data);

      var message = JSON.parse(e.data);

      var callbacks = this._subscribers[message.type];
      if (!callbacks) { return; }

      callbacks.forEach(function (callback) {
        callback(message);
      });
    }.bind(this);

  }.on('init'),

  sendMessage: function (message) {
    this.websocket.send(message);
  },

  subscribe: function (channel, callback) {
    // Get or create an array of callbacks for a given channel and append
    // our new callback.
    var callbacks = this._subscribers[channel] = this._subscribers[channel] || [];
    callbacks.push(callback);
  },

  unsubscribe: function (channel, callback) {
    var callbacks = this._subscribers[channel] = this._subscribers[channel] || [];
    callbacks.removeObject(callback);
  }
});
