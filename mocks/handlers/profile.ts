import { rest } from 'msw';
import { user } from './auth';

export const profileHandlers = [
  rest.get('/user/regist', (req, res, ctx) => {
    return res(
      ctx.status(201),
      ctx.json({
        user,
      })
    );
  }),
  rest.post('/mock/user/edit', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        user,
      })
    );
  }),
  rest.get('/user/regist-email', (req, res, ctx) => {
    return res(
      ctx.status(201),
      ctx.json({
        user,
      })
    );
  }),
  rest.post('/mock/user/edit-email', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        user,
      })
    );
  }),
];
