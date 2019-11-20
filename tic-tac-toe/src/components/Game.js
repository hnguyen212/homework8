import React, {
  Component
} from 'react'
import Board from './Board';

class Game extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        history: [{
          squares: Array(9).fill(null)
        }],
        stepNumber: 0,
        xIsNext: true,
        isDescending: true
      };
    }
    handleClick(i) {
      const locations = [
        [1, 1],
        [2, 1],
        [3, 1],
        [1, 2],
        [2, 2],
        [3, 2],
        [1, 3],
        [2, 3],
        [3, 3]
      ];
      const history = this.state.history.slice(0, this.state.stepNumber + 1);
      const current = history[history.length - 1];
      const squares = current.squares.slice();
      if (calculateWinner(squares) || squares[i]) {
        return;
      }
      squares[i] = this.state.xIsNext ? "X" : "O";
      this.setState({
        history: history.concat([{
          squares: squares,
          location: locations[i]
        }]),
        stepNumber: history.length,
        xIsNext: !this.state.xIsNext
      });
    }
    sortHistory() {
      this.setState({
        isDescending: !this.state.isDescending
      });
    }
    render() {
      const history = this.state.history;
      const current = history[this.state.stepNumber];
      const winner = calculateWinner(current.squares);

      const moves = history.map((step, move) => {
          const desc = move ?
            "Go to move #" + move + " @ " + history[move].location :
            "Go to game start";
          return ( <
            li key = {
              move
            } >
            <
            button onClick = {
              () => this.jumpTo(move)
            } > {
              move == this.state.stepNumber ? < b > {
                desc
              } < /b> : desc} <
              /button> <
              /li>
            );
          });

        let status;
        if (winner) {
          status = "Winner: " + winner.player + " @ " + winner.line;
        } else if (!current.squares.includes(null)) {
          status = "draw";
        } else {
          status = "Next player: " + (this.state.xIsNext ? "X" : "O");
        }

        return ( <
          div className = "game" >
          <
          div className = "game-board" >
          <
          Board squares = {
            current.squares
          }
          onClick = {
            i => this.handleClick(i)
          }
          /> <
          /div> <
          div className = "game-info" >
          <
          div > {
            status
          } < /div>

          <
          ol > {
            this.state.isDescending ? moves : moves.reverse()
          } < /ol> <
          button onClick = {
            () => this.sortHistory()
          } >
          Sort by: {
            this.state.isDescending ? "Descending" : "Asending"
          } <
          /button>

          <
          /div> <
          /div>
        );
      }
    }