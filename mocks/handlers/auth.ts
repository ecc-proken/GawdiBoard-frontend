import { rest } from 'msw';

export const authHandlers = [
  rest.get('/api/login', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        user,
      })
    );
  }),
  rest.get('/api/logout', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        user,
      })
    );
  }),
  rest.get('/api/user/whoami', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        user,
      })
    );
  }),
];

export const user = {
  student_number: 2180372,
  user_name: '山田太郎',
  email: 'yamada123@gmail.com',
  link: 'https://gmail.com',
  self_introduction:
    'ブンブンハローガウディーボード。どんどん募集かけていきますよ。',
};
