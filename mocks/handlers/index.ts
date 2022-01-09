import { rest } from 'msw';
import { authHandlers } from './auth';
import { constantsHandlers } from './constants';
import { offersHandlers } from './offers';
import { profileHandlers } from './profile';
import { promotionsHandlers } from './promotions';
import { worksHandlers } from './works';

export const handlers = [
  ...authHandlers,
  ...constantsHandlers,
  ...offersHandlers,
  ...profileHandlers,
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
