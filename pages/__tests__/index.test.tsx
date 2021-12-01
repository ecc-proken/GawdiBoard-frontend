import React from 'react';
import { render, screen } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import Home from '../index';

// TODO: Providerでラップする機能は後で外だしする
const fakeQueryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

// TODO: 後でちゃんと描き直す
describe('Home', () => {
  it('ようこそが表示される', () => {
    render(
      <QueryClientProvider client={fakeQueryClient}>
        <Home />
      </QueryClientProvider>
    );
    const welcome = screen.getByText('Gawdi Boardへようこそ');
    expect(welcome).toBeInTheDocument();
  });

  it('APIを呼べる', async () => {
    render(
      <QueryClientProvider client={fakeQueryClient}>
        <Home />
      </QueryClientProvider>
    );

    const apiData = await screen.findByText('hello world');
    expect(apiData).toBeInTheDocument();
  });
});
