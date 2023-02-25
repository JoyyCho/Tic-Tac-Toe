import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

// This is "Stateless Function" -> needs <props> as an argument in order to change from class to function
//<this> refers to class or object. So if it is not class, remove it
export const Square = (props) => {
 return (
   <button className="square" onClick={props.onClick} style={ props.highlight ? {background: 'yellow'}: null}>
     {props.value}
   </button>
 );
}