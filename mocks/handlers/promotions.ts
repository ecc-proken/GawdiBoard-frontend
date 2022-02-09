import { rest } from 'msw';

export const promotionsHandlers = [
  rest.get('/api/promotion/list', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        promotions,
      })
    );
  }),
  rest.get('/api/user/promotion-list', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        promotions,
      })
    );
  }),
  rest.get('/api/promotion/single', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        promotion: promotions[0],
      })
    );
  }),
  rest.post('/api/promotion/post', (req, res, ctx) => {
    return res(
      ctx.status(201),
      ctx.json({
        promotion: promotions[0],
      })
    );
  }),
  rest.post('/api/offer/delete', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json({}));
  }),
  rest.post('/api/promotion/edit', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        promotion: promotions[0],
      })
    );
  }),
];

const promotions = [
  {
    id: 1,
    title: 'Gawdiboard発表会',
    note: 'Gawdiboardを正式発表します。覚悟の準備をしておいてください。',
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
        name: '学内イベント',
        genre_id: 2,
        genre_name: '宣伝',
        target_id: null,
        target_name: null,
      },
    ],
  },
  {
    id: 2,
    title: 'WhatIsGrass改修大会',
    note: '24時間でどこまで改修できるかを競う大会です。',
    picture: 'http://placekitten.com/300/200',
    link: 'https://google.com',
    post_date: '2021-12-5',
    end_date: '2021-12-25',
    student_number: 2180373,
    user_name: '鈴木花子',
    user_class: 'IE4A',
    tags: [
      {
        id: 2,
        name: '学外イベント',
        genre_id: 2,
        genre_name: '宣伝',
        target_id: null,
        target_name: null,
      },
    ],
  },
  {
    id: 3,
    title: 'プロ研クソコードグランプリ',
    note: 'クソコードを書いて景品をもらう、涙なしには見られない哀れな戦い。',
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
        name: '学内イベント',
        genre_id: 2,
        genre_name: '宣伝',
        target_id: null,
        target_name: null,
      },
      {
        id: 3,
        name: '地球際',
        genre_id: 2,
        genre_name: '宣伝',
        target_id: null,
        target_name: null,
      },
      {
        id: 4,
        name: '部活動・サークル',
        genre_id: 2,
        genre_name: '宣伝',
        target_id: null,
        target_name: null,
      },
    ],
  },
];
