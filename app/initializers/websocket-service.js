export function initialize(container, application) {
  application.inject('controller', 'websocketService', 'service:websocket');
}

export default {
  name: 'websocket-service',
  initialize: initialize
};
