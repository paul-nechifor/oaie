const _ = require('underscore');
const AbstractBot = require('./AbstractBot');

const MOVE_EMPTY = -1;
const MOVE_BLACK = 0;
const MOVE_WHITE = 1;
const SIZE = 15;
const FULL_SIZE = SIZE * SIZE;

module.exports = class GomokuBot extends AbstractBot {
  constructor(...args) {
    super(...args);
    this.board = _.range(FULL_SIZE).map(() => MOVE_EMPTY);
  }

  getGameType() {
    return 'Gomoku';
  }

  handleMsgStarted(msg) {
    if (this.index === 0) {
      this.sendMove();
    }
  }

  handleMsgNumberOfPlayers(msg) {
    console.log('Number of players: %d', msg.number);
  }

  handleMsgYouAre(msg) {
    console.log('You are index:%d id:%s', msg.index, msg.id);
    this.index = msg.index;
  }

  handleMsgPlayerMove(msg) {
    const {playerIndex, move, winner} = msg;
    this.board[move] = playerIndex;

    if (winner !== MOVE_EMPTY) {
      console.log(`I ${winner === this.index ? 'won' : 'lost'} the game.`);
      return;
    }

    if (playerIndex !== this.index) {
      this.sendMove();
    }
  }

  sendMove() {
    this.send({type: 'Move', move: this.getNextMove()})
  }

  getNextMove() {
    var i = (Math.random() * FULL_SIZE) | 0;
    for (;; i = (i + 1) % FULL_SIZE)  {
      if (this.board[i] === MOVE_EMPTY) {
        return i;
      }
    }
  }
};
