import type { NextPage } from 'next';
import type { AppProps } from 'next/app';
import type { ReactElement, ReactNode } from 'react';
import Modal from 'react-modal';
import { AppProvider } from '../contexts/AppProvider';
import { setUpWorker } from '../mocks/browser';

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

if (process.env.NODE_ENV === 'development') {
  if (typeof window !== 'undefined') {
    // dynamic importをするとmockより先にリクエストが飛ぶのでしてない。
    // 本番では不要なsetUpWorkerがビルドに含まれてしまうけどいい方法が思い浮かばなかった。
    // 参考:https://mswjs.io/docs/recipes/deferred-mounting
    setUpWorker().start({ onUnhandledRequest: 'bypass' });
  }
}

Modal.setAppElement('#__next');

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <AppProvider>
      {getLayout(<Component {...pageProps} />)}
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
    </AppProvider>
  );
}

export default MyApp;
