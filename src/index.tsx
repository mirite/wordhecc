import App from './components/App';
import ReactDOM from 'react-dom';
import React from 'react';
import Quotes from './components/Quotes/Quotes';
import Honeybadger from '@honeybadger-io/js';
const ErrorBoundary = require('@honeybadger-io/react').HoneybadgerErrorBoundary;
require('./styles/custom.scss');

Honeybadger.configure({
	apiKey: 'hbp_ENX1M79SimYcIlUO4QtdeuxTx3xSIm4xeeVI',
	environment: 'production',
});

const root = document.getElementById('root');
ReactDOM.render(
	<ErrorBoundary honeybadger={Honeybadger}>
		<App />
	</ErrorBoundary>,
	root
);

const quotes = document.getElementById('quotes');
ReactDOM.render(<Quotes />, quotes);
