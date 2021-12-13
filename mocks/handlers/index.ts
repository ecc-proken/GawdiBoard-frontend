import { rest } from 'msw';
import { offersHandlers } from './offers';
import { promotionsHandlers } from './promotions';
import { worksHandlers } from './works';

export const handlers = [
  ...offersHandlers,
  ...promotionsHandlers,
  ...worksHandlers,
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
