const WebSocket = require('ws');
const _ = require('underscore');

module.exports = class AbstractBot {
  constructor(host, room, userAgent, nGames) {
    this.host = host;
    this.room = room;
    this.userAgent = userAgent;
    this.nGames = nGames;
    this.nGamesPlayed = 0;
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

  handleMsgYouAre(msg) {
    console.log('You are index:%d id:%s', msg.index, msg.id);
    this.index = msg.index;
    this.id = msg.id;
  }

  handleClose() {
    console.log('handleClose');
    this.nGamesPlayed++;
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
