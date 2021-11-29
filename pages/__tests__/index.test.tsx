import React from 'react';
import { render, screen } from '@testing-library/react';
import Home from '../index';

describe('Home', () => {
  it('ようこそが表示される', () => {
    render(<Home />);
    const welcome = screen.getByText('Gawdi Boardへようこそ');
    expect(welcome).toBeInTheDocument();
  });

  // 後で消してください
  it('APIを呼べる', async () => {
    const res = await fetch('/mock-test');
    const data = await res.json();

    expect(data.msg).toBe('hello world');
  });
});
