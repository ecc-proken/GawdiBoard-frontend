import { render, screen } from '@testing-library/react';
import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import AllOffersPage from '../board/offers';

const fakeQueryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

jest.mock('next/router', () => ({
  useRouter: () => ({
    isReady: true,
    query: {},
  }),
}));

describe('AllOffersPage', () => {
  it('募集一覧が表示される', async () => {
    render(
      <QueryClientProvider client={fakeQueryClient}>
        <AllOffersPage />
      </QueryClientProvider>
    );

    const offerTitle1 = await screen.findByText('Gawdiboard開発メンバー募集');
    const offerTitle2 = screen.getByText('WhatIsGrass改修メンバー募集');

    expect(offerTitle1).toBeInTheDocument();
    expect(offerTitle2).toBeInTheDocument();
  });
});
