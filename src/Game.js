import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { Board } from './Board';

let xMove = 0;
let yMove = 0;

export class Game extends React.Component {
 constructor(props) {
   super(props);
   this.state = {
     history: [
       {
         squares: Array(9).fill(null)
       }
     ],
     stepNumber: 0,
     xIsNext: true,
     style : 'backgroundColor: red'
   };
 }

 handleClick(i) {
   const history = this.state.history.slice(0, this.state.stepNumber + 1);
   const current = history[history.length - 1];
   const squares = current.squares.slice(); //-> Made the array from the copy of the entire square

   //Exit early! If there is already a winner OR all of the buttons are clicked
   if (calculateWinner(squares) || squares[i]) {
     return;
   }

   squares[i] = this.state.xIsNext ? "X" : "O";

   this.setState({
     history: history.concat([
       {
         squares: squares
       }
     ]),
     stepNumber: history.length,
     xIsNext: !this.state.xIsNext
   });

  let xArray = [];
  for (let i = 0; i < squares.length; i++) {
     if (squares[i] == 'X') {
          xArray.push(i)
          xMove = xArray.length
       }
   };

   yMove = (this.state.stepNumber/2).toFixed(0);
 }

 jumpTo(step) {
   this.setState({
     stepNumber: step,
     xIsNext: (step % 2) === 0
   });
 }

 render() {

   const history = this.state.history;
   const current = history[this.state.stepNumber];
   const winner = calculateWinner(current.squares);

   const moves = history.map((step, move) => {
     const desc = move ?
       'Go to move #' + move :
       'Go to game start';
     return (
       <li key={move}>
         <button onClick={() => this.jumpTo(move)}>{desc}</button>
       </li>
     );
     
   });

   let status;
   if (winner) {
     status = "Winner: " + winner.winner;
   } else {
     status = "Next player: " + (this.state.xIsNext ? "X" : "O");
   }

   if(xMove == 5 &&  yMove == 4){
    status = "Game Result: Draw"
   }

   return (
     <div className="game">
       <div className="game-board">
         <Board
           squares={current.squares}
           onClick={i => this.handleClick(i)}
           winningLine={winner ? winner.winningLine : null}
         />
         <MoveCounter />
       </div>
       <div className="game-info">
         <div>{status}</div>
         <ol>{moves}</ol>
       </div>
     </div>
   );
 }
}
// This function below is not a component - Doesnt start with capital letter
const calculateWinner = (squares) => {
 const lines = [
   [0, 1, 2],
   [3, 4, 5],
   [6, 7, 8],
   [0, 3, 6],
   [1, 4, 7],
   [2, 5, 8],
   [0, 4, 8],
   [2, 4, 6]
 ];
 // console.log(lines)
 for (let i = 0; i < lines.length; i++) {
   const [a, b, c] = lines[i];
   if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
     return {
      winner: squares[a],
      winningLine: lines[i]
     }
   }
 }
 return null;
}

class MoveCounter extends React.Component {
   render(){
    return( 
     <div id="counter">
      <div>X Move Counter: {xMove}</div>
      <div>y Move Counter: {yMove}</div>
     </div>
   )
  }
}