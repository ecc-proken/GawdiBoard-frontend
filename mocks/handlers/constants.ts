import { rest } from 'msw';

export const constantsHandlers = [
  rest.get('/api/tag-list', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        tags,
      })
    );
  }),
];

const tags = [
  {
    id: 1,
    name: 'フロントエンジニア募集',
    genre_id: 1,
    genre_name: '募集',
    target_id: 1,
    target_name: 'IT',
  },
  {
    id: 2,
    name: 'デザイナー募集',
    genre_id: 1,
    genre_name: '募集',
    target_id: 1,
    target_name: 'Web',
  },
  {
    id: 3,
    name: 'バックエンドエンジニア募集',
    genre_id: 1,
    genre_name: '募集',
    target_id: 1,
    target_name: 'IT',
  },
  {
    id: 4,
    name: 'インフラエンジニア募集',
    genre_id: 1,
    genre_name: '募集',
    target_id: 1,
    target_name: 'IT',
  },
];
