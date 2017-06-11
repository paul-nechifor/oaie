const WebSocket = require('ws');
const _ = require('underscore');

module.exports = class AbstractBot {
  constructor(host, room, userAgent) {
    this.host = host;
    this.room = room;
    this.userAgent = userAgent;
    this.ws = new WebSocket(host);
    _.bindAll(this, 'handleOpen', 'handleMessage', 'handleClose');
  }

  start() {
    this.ws.on('open', this.handleOpen);
    this.ws.on('message', this.handleMessage);
    this.ws.on('close', this.handleClose);
  }

  handleOpen() {
    console.log('handleOpen');
    this.sendStartGame();
  }

  handleMessage(data) {
    const msg = JSON.parse(data);
    console.log('handleMessage', msg);
    this['handleMsg' + msg.type](msg);
  }

  handleClose() {
    console.log('handleClose');
  }

  send(msg) {
    this.ws.send(JSON.stringify(msg));
  }

  sendStartGame() {
    this.send({
      type: 'StartGame',
      room: this.room,
      userAgent: this.userAgent,
      gameType: this.getGameType(),
    });
  }

  getGameType() {
    throw new Error('Not implemented.');
  }
};
