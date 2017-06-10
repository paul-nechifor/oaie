const WebSocket = require('ws');
const _ = require('underscore');

module.exports = class Connection {
  constructor(host) {
    this.ws = new WebSocket(host);
    _.bindAll(this, 'handleOpen', 'handleMessage');
  }

  start() {
    this.ws.on('open', this.handleOpen);
    this.ws.on('message', this.handleMessage);
  }

  handleOpen() {
    this.send({hello: 'world'});
  }

  handleMessage(data) {
    const msg = JSON.parse(data);
    console.log('msg', msg);
  }

  send(msg) {
    this.ws.send(JSON.stringify(msg));
  }
};
