import { rest } from 'msw';
import { getPaginationInfo } from '../utils';

export const offersHandlers = [
  rest.get('/api/offer/list', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        offers,
        ...getPaginationInfo(req.url),
      })
    );
  }),
  rest.get('/api/user/offer-list', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        offers,
        ...getPaginationInfo(req.url),
      })
    );
  }),
  rest.get('/api/offer/single', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        offer: offers[0],
      })
    );
  }),
  rest.post('/api/offer/post', (req, res, ctx) => {
    return res(
      ctx.status(201),
      ctx.json({
        offer: offers[0],
      })
    );
  }),
  rest.post('/api/offer/delete', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json({}));
  }),
  rest.post('/api/offer/edit', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        offer: offers[0],
      })
    );
  }),
  rest.post('/api/offer/apply', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json({}));
  }),
];

const offers = [
  {
    id: 1,
    title: 'Gawdiboard開発メンバー募集',
    target: 'IE4A',
    job: 'フロントエンドエンジニア 2人',
    note: 'フロントエンドエンジニアが足りません。結構な激務になると思うので覚悟の準備をしておいてください。',
    picture: 'http://placekitten.com/300/200',
    link: 'https://google.com',
    post_date: '2021-12-1',
    end_date: '2021-12-20',
    student_number: 2180372,
    user_name: '山田太郎',
    user_class: 'IE4A',
    tags: [
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
    ],
  },
  {
    id: 2,
    title: 'WhatIsGrass改修メンバー募集',
    target: 'IE4A',
    job: 'バックエンドエンジニア 1名',
    note: '改修作業を24時間していただきます。',
    picture: 'http://placekitten.com/300/200',
    link: 'https://google.com',
    post_date: '2021-12-5',
    end_date: '2021-12-25',
    student_number: 2180373,
    user_name: '鈴木花子',
    user_class: 'IE4A',
    tags: [
      {
        id: 3,
        name: 'バックエンドエンジニア募集',
        genre_id: 1,
        genre_name: '募集',
        target_id: 1,
        target_name: 'IT',
      },
    ],
  },
  {
    id: 3,
    title: 'プロ研ブログ開発メンバー募集',
    target: '全ての人',
    job: 'バックエンドエンジニア 1名 フロントエンジニア 2名',
    note: 'プロ研専用のブログを作成していただきます。',
    picture: 'http://placekitten.com/300/200',
    link: 'https://google.com',
    post_date: '2021-12-10',
    end_date: '2021-12-30',
    student_number: 2180374,
    user_name: 'プロ研太郎',
    user_class: 'IE4A',
    tags: [
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
    ],
  },
];
