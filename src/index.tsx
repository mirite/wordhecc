import App from './components/App';
import ReactDOM from 'react-dom';
import React from 'react';
import Quotes from './components/Quotes/Quotes';

const root = document.getElementById('root');
ReactDOM.render(<App />, root);

const quotes = document.getElementById('quotes');
ReactDOM.render(<Quotes />, quotes);
