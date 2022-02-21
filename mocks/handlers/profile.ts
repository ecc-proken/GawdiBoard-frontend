import { rest } from 'msw';
import { user } from './auth';

export const profileHandlers = [
  rest.get('/api/user/single', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        user,
      })
    );
  }),
  rest.get('api/user/regist', (req, res, ctx) => {
    return res(
      ctx.status(201),
      ctx.json({
        user,
      })
    );
  }),
  rest.post('/api/user/edit', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        user,
      })
    );
  }),
  rest.get('/api/user/regist-email', (req, res, ctx) => {
    return res(
      ctx.status(201),
      ctx.json({
        user,
      })
    );
  }),
  rest.post('/api/user/edit-email', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        user,
      })
    );
  }),
];
