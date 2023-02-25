import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { Square } from './Square';

export class Board extends React.Component {
 renderSquare(i) { 

  let highlight = false;

  if(this.props.winningLine){
    if(this.props.winningLine.includes(i)){
      highlight = true
    }
  }

   return (
     <Square
       value={this.props.squares[i]}
       onClick={() => this.props.onClick(i)}//grabs state from the board's state array
       highlight={ highlight }
     />
   );
 }

 render() {
   return (
     <div>
       <div className="board-row">
         {this.renderSquare(0)}
         {this.renderSquare(1)}
         {this.renderSquare(2)}
       </div>
       <div className="board-row">
         {this.renderSquare(3)}
         {this.renderSquare(4)}
         {this.renderSquare(5)}
       </div>
       <div className="board-row">
         {this.renderSquare(6)}
         {this.renderSquare(7)}
         {this.renderSquare(8)}
       </div>
     </div>
   );
 }
}