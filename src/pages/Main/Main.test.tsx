import React from 'react';
import {render, screen} from '@testing-library/react';
import {Main} from '.';

describe('Stub tests for Main module', () => {
	test('Is hello world exists', () => {
		render(<Main />);
		const linkElement = screen.getByText(/HelloWorld!/i);
		expect(linkElement).toBeInTheDocument();
	});
});
