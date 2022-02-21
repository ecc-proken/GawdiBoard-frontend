import { rest } from 'msw';

export const supportHandlers = [
  rest.post('/api/contact', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json({}));
  }),
];
