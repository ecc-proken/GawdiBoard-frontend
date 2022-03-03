export const API_HOST =
  process.env.NODE_ENV === 'production'
    ? process.env.NEXT_PUBLIC_API_HOST
    : '/api';
