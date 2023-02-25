import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { Square } from './Square';
import { Board } from './Board';
import { Game } from './Game';

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(<Game />);