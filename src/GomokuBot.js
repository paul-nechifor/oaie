const AbstractBot = require('./AbstractBot');

module.exports = class GomokuBot extends AbstractBot {
  getGameType() {
    return 'Gomoku';
  }

  handleMsgStarted(msg) {
    console.log('startedddddd');
  }

  handleMsgNumberOfPlayers(msg) {
    console.log('Number of players: %d', msg.number);
  }

  handleMsgYouAre(msg) {
    console.log('You are index:%d id:%s', msg.index, msg.id);
    this.index = msg.index;
  }
};
