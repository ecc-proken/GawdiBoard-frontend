import { screen } from '@testing-library/react';
import React from 'react';
import { renderWithClient } from '../../contexts/testUtils';
import Home from '../index';

// TODO: 後でちゃんと描き直す
describe('Home', () => {
  it('ようこそが表示される', () => {
    renderWithClient(<Home />);
    const welcome = screen.getByText('Gawdi Boardへようこそ');
    expect(welcome).toBeInTheDocument();
  });

  it('APIを呼べる', async () => {
    renderWithClient(<Home />);

    const apiData = await screen.findByText('hello world');
    expect(apiData).toBeInTheDocument();
  });
});
