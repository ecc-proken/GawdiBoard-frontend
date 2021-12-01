import '@testing-library/jest-dom';
import 'whatwg-fetch';
import { server } from './mocks/server';
import { setLogger } from 'react-query';

beforeAll(() => server.listen());

afterEach(() => server.resetHandlers());

afterAll(() => server.close());

setLogger({
  log: console.log,
  warn: console.warn,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  error: () => {},
});
