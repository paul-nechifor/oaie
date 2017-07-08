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
    this.board = null;
  }

  getGameType() {
    return 'Gomoku';
  }

  handleMsgStarted(msg) {
    // Reset the board.
    this.board = _.range(FULL_SIZE).map(() => MOVE_EMPTY);

    // The first player makes the move.
    if (this.index === 0) {
      this.sendMove();
    }
  }

  handleMsgPlayerMove(msg) {
    const {playerIndex, move, winner} = msg;
    this.board[move] = playerIndex;

    if (winner >= MOVE_BLACK) {
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
