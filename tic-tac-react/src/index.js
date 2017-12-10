import React, { PureComponent} from 'react';
import ReactDOM from 'react-dom';
import './index.css';




class Game extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      history: [{
        squares: Array(9).fill(null),
      }],
      xIsNext: true,
      stepNumber: 0,
    };
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[ history.length - 1 ];

    //Make a copy of the squares array
    const squares = current.squares.slice();

    //If there is a winner, or the square is not empty
    if (calculateWinner(squares) || squares[i]) {
      return;
    }

    squares[i] = this.state.xIsNext ? "X" : "O";
    //Render the squares with the X
    this.setState({
      history: history.concat([{
        squares,
      }]),
      xIsNext: !this.state.xIsNext,
      stepNumber: history.length,
    });
  }

  jumpTo (step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0,
    });
  }


  render() {
    const history = this.state.history;
    const current = history[ this.state.stepNumber ];
    const winner = calculateWinner(current.squares);

    const moves = history.map((step, move) => {
      const desc = move ?
        'Go to move #' + move :
        'Go to game start';
      return (
        <li key = {move}>
          <button onClick = {() => this.jumpTo(move)}> {desc} </button>
        </li>
      );
    });

    let status;
    if (winner) {
      status = "Winner" + winner;
    } else {
      status = "Next player: " + (this.state.xIsNext ? "X" : "O");
    };



    return (
      <div className = "game">
        <div className = "game-board">
          <Board
            squares = { current.squares }
            onClick = { (i) => this.handleClick(i) }
          />
        </div>

        <div className = "game-info">
          <div>{ status }</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}

class Board extends PureComponent {
  // constructor (props) {
  //   super(props);
  //   this.state = {
  //     squares: Array(9).fill(null),
  //     xIsNext: true,
  //   };
  //   // this._resetBoard = this._resetBoard.bind(this);
  // }

  // _resetBoard () {
  //   this.setState({
  //     squares: Array(9).fill(null),
  //   });
  // }

  renderSquare(i) {
    return (
      <Square
        value = { this.props.squares[i] }
        onClick = { () => this.props.onClick(i) }
      />
    );
  }

  render() {
    return (
      <div>
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

        <button className = "reset-button" onClick = {() => this.setState({squares: Array(9).fill(null)})}> Reset </button>

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

function calculateWinner (squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < lines.length; i++) {
    //Deconstructed -> for each of the lines[row/column/diagonal], compare the indicies within
    const [a, b, c] = lines[i];
    //check if first index in line/row/column is not empty, then check corresponding
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      //return X or O
      return squares[a];
    };
  };
  return null;
}

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);
