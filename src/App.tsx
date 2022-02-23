import React from 'react';
import {Provider} from 'react-redux';
import {BrowserRouter} from 'react-router-dom';
import {store} from './store';
import {AppRouter} from './router/AppRouter';

function App(): JSX.Element {
	return (
		<React.StrictMode>
			<Provider store={store}>
				<BrowserRouter>
					<AppRouter />
				</BrowserRouter>
			</Provider>
		</React.StrictMode>
	);
}

export default App;
