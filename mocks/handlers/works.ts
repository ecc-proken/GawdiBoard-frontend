import { rest } from 'msw';

export const worksHandlers = [
  rest.get('/work/list', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        works,
      })
    );
  }),
  rest.get('/user/work-list', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        works,
      })
    );
  }),
  rest.get('/work/single', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        work: works[0],
      })
    );
  }),
  rest.post('work/post', (req, res, ctx) => {
    return res(
      ctx.status(201),
      ctx.json({
        work: works[0],
      })
    );
  }),
  rest.post('work/delete', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json({}));
  }),
  rest.post('work/edit', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        work: works[0],
      })
    );
  }),
];

const works = [
  {
    id: 1,
    title: 'Gawdiboard',
    short_description: '学内専用掲示板サイト',
    note: 'Gawdiboardを使えば友達100人できるかもしれません。',
    picture: 'http://placekitten.com/300/200',
    link: 'https://google.com',
    post_date: '2021-12-1',
    student_number: 2180372,
    user_name: '山田太郎',
    tags: [
      {
        id: 1,
        name: 'Webサイト',
        genre_id: 3,
        genre_name: '作品',
        target_id: null,
        target_name: null,
      },
    ],
  },
  {
    id: 2,
    title: 'WhatIsGrass',
    short_description: '言葉のWikipeida',
    note: 'Whatは草というアプリを作りました。',
    picture: 'http://placekitten.com/300/200',
    link: 'https://google.com',
    post_date: '2021-12-5',
    student_number: 2180373,
    user_name: '鈴木花子',
    user_class: 'IE4A',
    tags: [
      {
        id: 2,
        name: 'モバイルアプリ',
        genre_id: 3,
        genre_name: '作品',
        target_id: null,
        target_name: null,
      },
    ],
  },
  {
    id: 3,
    title: 'プロ研ブログ',
    short_description: 'プロ研専用のブログ',
    note: 'プログラム研究部の部員なら誰でも好きにかけるブログです。',
    picture: 'http://placekitten.com/300/200',
    link: 'https://google.com',
    post_date: '2021-12-10',
    student_number: 2180374,
    user_name: 'プロ研太郎',
    user_class: 'IE4A',
    tags: [
      {
        id: 1,
        name: 'Webサイト',
        genre_id: 3,
        genre_name: '作品',
        target_id: null,
        target_name: null,
      },
      {
        id: 2,
        name: 'モバイルアプリ',
        genre_id: 3,
        genre_name: '作品',
        target_id: null,
        target_name: null,
      },
      {
        id: 3,
        name: 'ツール',
        genre_id: 3,
        genre_name: '作品',
        target_id: null,
        target_name: null,
      },
    ],
  },
];
