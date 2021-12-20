import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { renderWithClient } from '../../contexts/testUtils';
import Home from '../index';

// TODO: 後で消す
describe('Home', () => {
  it('ようこそが表示される', () => {
    renderWithClient(<Home />);
    const welcome = screen.getByText('Gawdi Boardへようこそ');
    expect(welcome).toBeInTheDocument();
  });

  it('APIを呼べる', async () => {
    renderWithClient(<Home />);

    userEvent.type(screen.getByLabelText('何か打ってね'), 'aaa');
    userEvent.click(screen.getByText('押す'));
    const apiData = await screen.findByText('hello world');
    expect(apiData).toBeInTheDocument();
  });
});
