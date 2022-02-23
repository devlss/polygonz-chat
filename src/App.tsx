import React from 'react';
import {Provider} from 'react-redux';
import {store} from './store';
import {Main} from './pages/Main';

function App(): JSX.Element {
	return (
		<React.StrictMode>
			<Provider store={store}>
				<Main />
			</Provider>
		</React.StrictMode>
	);
}

export default App;
