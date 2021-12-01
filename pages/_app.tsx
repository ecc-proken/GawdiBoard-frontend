import type { AppProps } from 'next/app';
import { setUpWorker } from '../mocks/browser';
import { QueryClient, QueryClientProvider } from 'react-query';

if (process.env.NODE_ENV === 'development') {
  if (typeof window !== 'undefined') {
    // dynamic importをするとmockより先にリクエストが飛ぶのでしてない。
    // 本番では不要なsetUpWorkerがビルドに含まれてしまうけどいい方法が思い浮かばなかった。
    // 参考:https://mswjs.io/docs/recipes/deferred-mounting
    setUpWorker().start({ onUnhandledRequest: 'bypass' });
  }
}

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <Component {...pageProps} />
      <style global jsx>
        {`
          *,
          *::before,
          *::after {
            box-sizing: border-box;
          }

          html,
          body {
            height: 100%;
          }

          body,
          h1,
          h2,
          h3,
          h4,
          h5,
          h6,
          p,
          figure,
          blockquote,
          ul,
          ol,
          dl,
          dt,
          dd {
            margin: 0;
          }

          ul,
          ol {
            padding: 0;
          }

          body {
            line-height: 1.5;
            -webkit-font-smoothing: antialiased;
          }
        `}
      </style>
    </QueryClientProvider>
  );
}

export default MyApp;
