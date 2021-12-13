import { rest } from 'msw';
import { offersHandlers } from './offers';
import { promotionsHandlers } from './promotions';

export const handlers = [
  ...offersHandlers,
  ...promotionsHandlers,
  rest.get('/success', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        message: 'hello world',
      })
    );
  }),
  rest.get('/error', (req, res, ctx) => {
    return res(
      ctx.status(400),
      ctx.json({
        message: 'Error!',
      })
    );
  }),
];
