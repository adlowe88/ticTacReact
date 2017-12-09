import React, { PureComponent} from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Board extends PureComponent {
  constructor (props) {
    super(props);
    this.state = {
      squares: Array(9).fill(null),
      xIsNext: true,
    }
  }

  handleClick(i) {
    //Make a copy of the squares array
    const squares = this.state.squares.slice();
    squares[i] = this.state.xIsNext ? "X" : "O";
    //Render the squares with the X
    this.setState({
      squares
      xIsNext: !this.state.xIsNext,
    });
  }

  renderSquare( i ) {
    return (
      <Square
        value = { this.state.squares[i] }
        onClick = { () => this.handleClick(i) }
      />
    );
  }

  render() {
    const status = "Next player: " + (this.state.xIsNext ? "X" : "O");

    return (
      <div>
        <div className = "status"> { status } </div>

        <div className = "board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>

        <div className = "board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>

        <div className = "board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>

      </div>
    );
  }
}


function Square (props) {
  return (
    <button className = "square" onClick = { props.onClick }>
      {props.value}
    </button>
  );
}

class Game extends PureComponent {
  render() {
    return (
      <div className = "game">
        <div className = "game-board">
        <Board />
        </div>

        <div className = "game-info">
          <div>{}</div>
          <ol>{}</ol>
        </div>
      </div>
    );
  }
}

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);
