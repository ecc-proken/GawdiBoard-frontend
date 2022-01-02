import { rest } from 'msw';
import { server } from '../../mocks/server';
import { jsonClient } from '../httpClient';

describe('jsonClient', () => {
  it('APIを呼べる', async () => {
    const data = await jsonClient('/success');
    expect(data.message).toBe('hello world');
  });

  it('200番台じゃないとExceptionを投げる', async () => {
    await expect(jsonClient('/error')).rejects.toThrow('Error!');
  });

  it('クエリパラメタがつく。配列はa[]=1&a[]=2...の形になる', async () => {
    server.use(
      rest.get('/success', async (req, res, ctx) => {
        const queryParameter = req.url.searchParams.toString();
        return res(ctx.status(200), ctx.json({ queryParameter }));
      })
    );

    await expect(
      jsonClient('/success', { params: { a: 'hello', b: 'world' } })
    ).resolves.toHaveProperty('queryParameter', 'a=hello&b=world');

    await expect(
      jsonClient('/success', { params: { a: ['1', '2'], b: ['3', '4'] } })
    ).resolves.toHaveProperty(
      'queryParameter',
      encodeURI('a[]=1&a[]=2&b[]=3&b[]=4')
    );
  });

  it('リクエストボディがついてContent-Typeがapplication/jsonになる', async () => {
    server.use(
      rest.post('/success', async (req, res, ctx) => {
        const requestBody =
          typeof req.body === 'string' ? req.body : JSON.stringify(req.body);
        const contentType = req.headers.get('Content-Type');
        return res(ctx.status(200), ctx.json({ requestBody, contentType }));
      })
    );

    const body = { a: 'hello world', b: [2, 'b'], c: { d: 'nested' } };
    await expect(
      jsonClient('/success', { body, method: 'POST' })
    ).resolves.toHaveProperty('requestBody', JSON.stringify(body));

    await expect(
      jsonClient('/success', { body: { a: 1 }, method: 'POST' })
    ).resolves.toHaveProperty('contentType', 'application/json');
  });

  it('クエリパラメタはnumber型でも動く', async () => {
    server.use(
      rest.get('/success', async (req, res, ctx) => {
        const queryParameter = req.url.searchParams.toString();
        return res(ctx.status(200), ctx.json({ queryParameter }));
      })
    );

    await expect(
      jsonClient('/success', { params: { a: 1 } })
    ).resolves.toHaveProperty('queryParameter', 'a=1');

    await expect(
      jsonClient('/success', { params: { a: [1, 2, 3] } })
    ).resolves.toHaveProperty('queryParameter', encodeURI('a[]=1&a[]=2&a[]=3'));
  });
});
