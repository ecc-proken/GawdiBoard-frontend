import React from 'react';
import { render, screen } from '@testing-library/react';
import Home from '../index';

describe('Home', () => {
  it('ようこそが表示される', () => {
    render(<Home />);
    const welcome = screen.getByText('Gawdi Boardへようこそ');
    expect(welcome).toBeInTheDocument();
  });
  it('1 = 1', () => {
    const a: Record<string, number> = { i: 1 };
    expect(a.i).toBe(1);
  });
});
