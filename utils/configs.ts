// TODO .envからurlを読み込む
export const API_HOST =
  process.env.NODE_ENV === 'production' ? 'http://localhost/api' : '/api';
